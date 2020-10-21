import React, {Component} from 'react';
import './App.css';

function Display(props) {
  return (
    <div className="display">
      <p className="anterior">{props.anterior}</p>
      <p className="atual">{props.atual}</p>
    </div>
  )
}

function DisplayMemoria(props) {
  return (
    <div className="dispmemo">
      <p className="guardado">{props.guardado}</p>
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
      guardado1: '',
      guardado2: '',
      guardado3: '',
      guardado4: '',
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

  memoria(MX) {
    this.setState(
      (state, props) => {
        if (MX === 'MC') {
          return {
            guardado1: '',
            guardado2: '',
            guardado3: '',
            guardado4: '',
          }
        }
        if (MX === 'MR') {
          return {
            operadorAtual: this.state.guardado1,
          }
        }
        if (MX === 'M+') {
          if (this.state.operadorAtual !== '') {
            return {
              operadorAtual: eval(this.state.guardado1 + '+' + this.state.operadorAtual)
            }
          }
          else {
            return {
              operadorAtual: eval(this.state.guardado1)
          }
        }
      }
        if (MX === 'MS') {
          return {
            guardado4: this.state.guardado3,
            guardado3: this.state.guardado2,
            guardado2: this.state.guardado1,
            guardado1: this.state.operadorAtual
          }
        }
      }
    )
  }

  memoIndividual(MX,number) {
    this.setState(
      (state,props) => {
        if (MX === 'MC') {
          if (number === 1) {
            return {
              guardado1: this.state.guardado2,
              guardado2: this.state.guardado3,
              guardado3: this.state.guardado4,
              guardado4: ''
            }
          }
          if (number === 2) {
            return {
              guardado2: this.state.guardado3,
              guardado3: this.state.guardado4,
              guardado4: ''
            }
          }
          if (number === 3) {
            return {
              guardado3: this.state.guardado4,
              guardado4: ''
            }
          }
          if (number === 4) {
            return {
              guardado4: ''
            }
          }
        }
        else {
          if (number === 1) {
            return {
              operadorAtual: this.state.guardado1
            }
          }
          if (number === 2) {
            return {
              operadorAtual: this.state.guardado2
            }
          }
          if (number === 3) {
            return {
              operadorAtual: this.state.guardado3
            }
          }
          if (number === 4) {
            return {
              operadorAtual: this.state.guardado4
            }
          }
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
            <Button text="MC" aoClicar={() => this.memoria("MC")}/>
            <Button text="MR" aoClicar={() => this.memoria("MR")}/>
            <Button text="M+" aoClicar={() => this.memoria("M+")}/>
            <Button text="MS" aoClicar={() => this.memoria("MS")}/>
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
        <div className="memoria">
          <div className="rowMemo">
            <h2 className="titulo">Memória</h2>
          </div>
          <div className="rowMemo">
            <DisplayMemoria guardado={this.state.guardado1}/>
            <Button text="MC" aoClicar={() => this.memoIndividual("MC",1)}/>
            <Button text="MR" aoClicar={() => this.memoIndividual("MR",1)}/>
          </div>
          <div className="rowMemo">
            <DisplayMemoria guardado={this.state.guardado2}/>
            <Button text="MC" aoClicar={() => this.memoIndividual("MC",2)}/>
            <Button text="MR" aoClicar={() => this.memoIndividual("MR",2)}/>
          </div>
          <div className="rowMemo">
            <DisplayMemoria guardado={this.state.guardado3}/>
            <Button text="MC" aoClicar={() => this.memoIndividual("MC",3)}/>
            <Button text="MR" aoClicar={() => this.memoIndividual("MR",3)}/>
          </div>
          <div className="rowMemo">
            <DisplayMemoria guardado={this.state.guardado4}/>
            <Button text="MC" aoClicar={() => this.memoIndividual("MC",4)}/>
            <Button text="MR" aoClicar={() => this.memoIndividual("MR",4)}/>
          </div>
          <div className="row"><div className="space"></div></div>
          <div className="row"><div className="footer"></div></div>
        </div>
      </div>
    );
  }
}

export default App;