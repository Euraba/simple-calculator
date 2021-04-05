console.log("Here") ;
class calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() ;
  }

  clear() {
    this.previousOperand = '' ;
    this.currentOperand = '' ;
    this.operation = undefined ;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1) ;
  }

  append(number) {
    this.currentOperand = this.currentOperand + number.toString();
  }

  addOperation(operator) {
    if (this.currentOperand === '') {
      return;
    }
    this.operation = operator;
    this.previousOperand = this.currentOperand ;
    this.currentOperand = '' ;
  }

  solve() {
    const number1 = parseInt(this.previousOperand, 2) ;
    const number2 = parseInt(this.currentOperand, 2) ;
    let result ;
    switch(this.operation) {
      case '+':
        result = number1 + number2 ;
        break;
      case '-':
        result = number1 - number2 ;
        break;
      case '*':
        result = number1 * number2 ;
        break;
      case '/':
        result = number1 / number2 ;
        break;
      default:
        result = number1;
    }
    this.clear();
    this.currentOperand = result.toString(2) ;
  }

  updateScreen() {
    this.previousOperandTextElement.innerHTML = this.previousOperand + ((this.operation == null) ? '' : " " + this.operation)  ;
    this.currentOperandTextElement.innerHTML = this.currentOperand ;
  }

  clearCurrent() {
    this.currentOperand = '' ;
  }
}

const buttons = document.querySelectorAll('[data-number]');
const buttonClear = document.getElementById('btnClr');
const buttonEqual = document.getElementById('btnEql');
const buttonDelete = document.getElementById('btnDel');
const buttonsOperands = document.querySelectorAll('[data-operand]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]') ;
const currentOperandTextElement = document.querySelector('[data-current-operand]') ;

const myCalculator = new calculator(previousOperandTextElement, currentOperandTextElement);

console.log(buttons) ;

buttons.forEach(button => {
  console.log(button) ;
  button.addEventListener('click', () => {
    console.log(`Pressed ${button.innerText}`) ;
    myCalculator.append(button.innerText);
    myCalculator.updateScreen();
  })
})

buttonsOperands.forEach(button => {
  button.addEventListener('click', () => {
    myCalculator.addOperation(button.innerText);
    myCalculator.updateScreen();
  })
})

buttonClear.addEventListener('click', () => {
  myCalculator.clear() ;
  myCalculator.updateScreen() ;
})

buttonDelete.addEventListener('click', () => {
  myCalculator.delete() ;
  myCalculator.updateScreen() ;
})

buttonEqual.addEventListener('click', () => {
  myCalculator.solve() ;
  myCalculator.updateScreen() ;
})

const changeButton = document.getElementsByClassName("change")[0] ;

changeButton.addEventListener('click', () => {
  window.close() ;
  window.open(changeButton.value) ;
})