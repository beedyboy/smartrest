import React, { Component } from 'react'
import CalculatorScreen from '../components/calculator/CalculatorScreen'
import CalculatorKey from '../components/calculator/CalculatorKey'
import '../calculator.css';

class Calculator extends Component {
state = {
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false
};

clearScreen =()=> {
  this.setState({
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false
  })

}
    inputDigit=(digit)=> {
    const { displayValue, waitingForOperand } = this.state
    
    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit
      })
    }
  }

  render() {
    return (
      <div className = "calculator">
          <div className = "calculator-screen">
          <CalculatorKey className="key-2"
            onPress={
              () => this.clearScreen
            } > C </CalculatorKey>    
            <CalculatorScreen>{this.state.displayValue}</CalculatorScreen>
              </div>
        <div className="calculator-body">
<div className = "calculator-keypads" >
  <React.Fragment >
  <CalculatorKey className = "key-1"
onPress = {
    () => this.inputDigit(7)
  } > 7 </CalculatorKey>

  <CalculatorKey className = "key-2"
onPress = {
    () => this.inputDigit(8)
  } > 8 </CalculatorKey> 

  <CalculatorKey className = "key-2"
onPress = {
    () => this.inputDigit(9)
  } > 9 </CalculatorKey> 

  <CalculatorKey className = "operator-key"
onPress = {
    () => this.inputDigit('+')
  } > + </CalculatorKey>  
  </React.Fragment> 
  </div>

          <div className="calculator-keypads" >
            <React.Fragment >
              <CalculatorKey className="key-1"
                onPress={
                  () => this.inputDigit(4)
                } > 4 </CalculatorKey>

              <CalculatorKey className="key-2"
                onPress={
                  () => this.inputDigit(5)
                } > 5 </CalculatorKey>

              <CalculatorKey className="key-2"
                onPress={
                  () => this.inputDigit(6)
                } > 6</CalculatorKey>

              <CalculatorKey className="operator-key"
                onPress={
                  () => this.inputDigit('-')
                } > - </CalculatorKey>
            </React.Fragment>
          </div>

              <div className = "calculator-keypads"> 
             <React.Fragment>
                <CalculatorKey className = "key-1" onPress = {() => this.inputDigit(1)} > 1 </CalculatorKey>
                    
                  <CalculatorKey className = "key-2" onPress = {() => this.inputDigit(2) } > 2 </CalculatorKey> 
                  
                   <CalculatorKey className = "key-2"
                   onPress = {
                     () => this.inputDigit(3)
                   } > 3 </CalculatorKey> 
                   
                   < CalculatorKey className = "operator-key"
                   onPress = {
                     () => this.inputDigit('*')
                   } > X </CalculatorKey> 
                   </React.Fragment>
                </div>

              <div className = "calculator-keypads"> 
             <React.Fragment>
                <CalculatorKey className = "key-1" onPress = {() => this.inputDigit(0)} > 0 </CalculatorKey>
                    
                  <CalculatorKey className = "key-2" onPress = {() => this.inputDigit(".") } > . </CalculatorKey> 
                  
                   <CalculatorKey className = "key-2"
                   onPress = {
                     () => this.inputDigit("=")
                   } > = </CalculatorKey> 
                   
                   < CalculatorKey className = "operator-key"
                   onPress = {
                     () => this.inputDigit('/')
                   } > / </CalculatorKey> 
                   </React.Fragment>
                </div>

        </div>


      </div>
    )
  }
}
export default Calculator;