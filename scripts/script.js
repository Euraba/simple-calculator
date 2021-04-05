class Calculator {
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

  appendNumber(number) {
    if (number === ',' && this.currentOperand.includes(',')) {
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString() ;
  }

  chooseOperation(operation) {
    if (this.currentOperand === '' || this.currentOperand === '.') {
      return;
    }
    if (this.previousOperand !== '') {
      this.compute() ;
    }
    this.operation = operation ;
    this.previousOperand = this.currentOperand.toString() ;
    this.currentOperand = '' ;
  }

  compute() {
    let ret ;
    const prev = parseFloat(this.previousOperand.toString()) ;
    const current = parseFloat(this.currentOperand.toString()) ;
    if (isNaN(current) || isNaN(prev)) {
      return
    }
    switch (this.operation) {
      case '+':
        ret = prev + current;
        break;
      case '-':
        ret = prev - current;
        break;
      case '/':
        ret = prev / current;
        break;
      case '*':
        ret = prev * current;
        break;
    }
    this.currentOperand = ret.toString() ;
    this.previousOperand = '' ;
    this.operation = undefined;
  }

  getValue(number) {
    const stringNumber = number.toString() ;
    const integerPart = parseFloat(stringNumber.split('.')[0]) ;
    const decimalPart = stringNumber.split('.')[1] ;
    let integerDisplay ;
    if (isNaN(integerPart)) {
      integerDisplay = '' ;
    } else {
      integerDisplay = integerPart.toLocaleString('en-US', {maximumFractionDigits: 0}) ;
    }
    if (decimalPart == undefined) {
      return integerDisplay ;
    }
    let decimalDisplay = parseInt(decimalPart) ;
    decimalDisplay = Math.round(decimalDisplay * 100) / 100 ;
    return `${integerDisplay}.${decimalDisplay}` ;
  }

  updateScreen() {
    this.currentOperandTextElement.innerText = this.getValue(this.currentOperand) ;
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getValue(this.previousOperand)} ${this.operation}` ;
    } else {
      this.previousOperandTextElement.innerText = '' ;
    }
  }

  clearCurrent() {
    this.currentOperand = '' ;
  }
}

const numberButtons = document.querySelectorAll('[data-number]') ;
const operationButtons = document.querySelectorAll('[data-operation]') ;
const equalsButton = document.querySelector('[data-equals]') ;
const deleteButton = document.querySelector('[data-delete]') ;
const allClearButton = document.querySelector('[data-all-clear]') ;
const clearButton = document.querySelector('[data-clear]') ;
const previousOperandTextElement = document.querySelector('[data-previous-operand]') ;
const currentOperandTextElement = document.querySelector('[data-current-operand]') ;

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) ;

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    console.log(`You press  ${button.innerText}`) ;
    calculator.appendNumber(button.innerText) ;
    calculator.updateScreen();
  })
})

operationButtons.forEach(operation => {
  operation.addEventListener('click', () => {
    console.log(`You press  ${operation.innerText}`) ;
    calculator.chooseOperation(operation.innerText) ;
    calculator.updateScreen();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute() ;
  calculator.updateScreen() ;
})

allClearButton.addEventListener('click', button => {
  calculator.clear() ;
  calculator.updateScreen() ;
})

clearButton.addEventListener('click', button => {
  calculator.clearCurrent() ;
  calculator.updateScreen() ;
})

deleteButton.addEventListener('click', button => {
  calculator.delete() ;
  calculator.updateScreen() ;
})

const changeButton = document.getElementsByClassName("change")[0] ;

changeButton.addEventListener('click', () => {
  window.close() ;
  window.open(changeButton.value) ;
})