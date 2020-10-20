import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

function Display(props) {
  return (
    <div className="display">
      <p className="anterior">{props.anterior}</p>
      <p className="atual">{props.atual}</p>
    </div>
  )
}

const bType = val => {
  return !isNaN(val) || val === "." || val === "=";
}

function ClearButton(props) {
  return (
    <button className={"clear"} onClick={props.aoClicar}>{props.text}</button>
  )
}

function Button(props) {
  return (
    <button className={`meio ${bType(props.text) ? null : "border"}`} onClick={props.aoClicar}>{props.text}</button>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operadorAtual: '',
      operadorAnterior: '',
      operacao: '',
    };
    this.addNumber = this.addNumber.bind(this);
  }

  addNumber(number) {
    this.setState(
      (state, props) => {
        if (number === '.') {
          if (state.operadorAtual.includes('.')  || state.operadorAtual === '') {
            return {}
          }
          else {
            return {
              operadorAtual: state.operadorAtual + number
            }
          }
        }
        else {
          return {
            operadorAtual: state.operadorAtual + number
          }
        }
      }
    )
  }

  operation(operation) {
    this.setState(
      (state, props) => {
        if (state.operadorAtual !== '') {
          if (state.operadorAnterior === '') {
            return {
              operadorAnterior: state.operadorAtual + ' ' + operation,
              operadorAtual: ''
            }
          }
        }
      }
    )
  }

  realizarOperacao() {
    this.setState(
      (state, props) => {
        if (state.operadorAtual !== '') {
        let op_str = state.operadorAnterior + state.operadorAtual
        let valor_final = eval(op_str)
        let valor_final_str = valor_final.toString()
        return {
          operadorAtual: valor_final_str,
          operadorAnterior: ''
        }
      }
   }
 )
}

  limpaTela() {
    this.setState(
      (state, props) => {
        return {
          operadorAtual: ''
        }
      }
    )
  }

  render() {
    return (
      <div className="App">
        <div className="calculadora">
          <div className="row">
            <Display anterior={this.state.operadorAnterior}  atual={this.state.operadorAtual}/>
          </div>
          <div className="row">
            <Button text="7" aoClicar={() => this.addNumber("7")}/>
            <Button text="8" aoClicar={() => this.addNumber("8")}/>
            <Button text="9" aoClicar={() => this.addNumber("9")}/>
            <Button text="+" aoClicar={() => this.operation("+")}/>
          </div>
          <div className="row">
            <Button text="4" aoClicar={() => this.addNumber("4")}/>
            <Button text="5" aoClicar={() => this.addNumber("5")}/>
            <Button text="6" aoClicar={() => this.addNumber("6")}/>
            <Button text="-" aoClicar={() => this.operation("-")}/>
          </div>
          <div className="row">
            <Button text="1" aoClicar={() => this.addNumber("1")}/>
            <Button text="2" aoClicar={() => this.addNumber("2")}/>
            <Button text="3" aoClicar={() => this.addNumber("3")}/>
            <Button text="*" aoClicar={() => this.operation("*")}/>
          </div>
          <div className="row">
            <Button text="0" aoClicar={() => this.addNumber("0")}/>
            <Button text="." aoClicar={() => this.addNumber(".")}/>
            <Button text="=" aoClicar={() => this.realizarOperacao()}/>
            <Button text="/" aoClicar={() => this.operation("/")}/>
          </div>
          <div className="row">
            <ClearButton text="Clear" aoClicar={() => this.limpaTela()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
