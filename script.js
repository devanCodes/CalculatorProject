class Calculator {
    // creating a constructor function with 2 variables that takes in all of the inputs and functions for the calculator
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // clear function will clear out all variables
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        // setting the operation to undefined to ensure no operation is selected after clearing everything
        this.operation = undefined;
    }

    // delete function will remove a single number
    delete() {
        // converting value to a string and cutting off the last number that was inputted; it will "slice" (aka keep) the rest of the numbers, from the first value until the second-to-last value
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // appendNumber function will display the clicked number to the screen in the output box
    appendNumber(number) {
        // adding 'if' statement here to ensure that the '.' button does not displayed more than once, even if clicked more than once
        if (number === '.' && this.currentOperand.includes('.')) return;
        // converting these to strings to append the next number at the end of the previous number so that JS doesn't actually try to perform mathematical addition here
        //  ie. we want 1 and 1 to equal 11, not 2
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // chooseOperation function will take whatever operation was chosen by the user
    chooseOperation(operation) {
        // ensures that no operation is performed if there was no selected number prior to the operation
        if (this.currentOperand === '') return;
        // this will compute the options selected, and place computed result plus the additional operation in the previous operand secetion of the output box, assuming more than one operation is desired
        if (this.previousOperand !== '') {
            this.compute();
        }
        // once operand is selected after a number, the number and operand will be displayed in smaller font in the top right corner of output box which is designated for the previous operand
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // compute function will take the number(s) and operations chosen by the user, compute them, and display the result in the output box
    compute() {
        // assigning variables and using parseFloat to convert any string into a number to then be calculated
        let computation
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // we will stop the code from running if a user hits equal but does not click on any numbers to compute
        if (isNaN(prev) || isNaN(current)) return;
        // using a switch statement since we have several "cases" aka operations that can be performed depending on the selection
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            // default will execute if none of the above values are executed which implies an invalid operation
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        // splitting number into integer part (part before decimal place) and decimal part (part after decimal place)
        // converting to a string so that we can split that string at the decimal character
        const stringNumber = number.toString();
        // turning string into an array; first part of the array will be the integer before the period and second part is after the period
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            // setting maximumFractionDigits to 0 which means there can never be any decimal places after the value when it gets converted to a string
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        // in case user did input a period and has numbers after it
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // updateDisplay function will update the displayed results depending on the actions performed by the user
    updateDisplay() {
        // code below relates to appendNumber function
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        // code below relates to chooseOperation function; will display previous operation and operation chosen after as a concatenation
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

// assigning variables to our buttons and text-elements
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// we want the calculator to look over each button
numberButtons.forEach(button => {
    // using addEventListener function because we want specific functions to be called whenever a specific button is clicked by the user
    button.addEventListener('click', () => {
        // this will add the inner text value of the button chosen to the output box display
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

// applying same concept to operation buttoms just as we did for number buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// applying same concept to equals button
equalsButton.addEventListener('click', button => {
        calculator.compute();
        calculator.updateDisplay();
    })

// applying same concept to all clear button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

// applying same concept to delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})