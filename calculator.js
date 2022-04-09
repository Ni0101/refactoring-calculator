const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = document.querySelector('.calculator__display');

const calculate = (n1, operator, n2) => {
    //We can simplify it by creating two variables to contain float values
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}

const createResultString = (key, displayedNum, state) => {
    const keyContent = key.textContent;
    const { action } = key.dataset;
    const {
        firstValue,
        modValue,
        operator,
        previousKeyType
    } = state;

    /* 
            Variables required are:
            1. keyContent
            2. displayedNum
            3. previousKeyType
            4. action
            5. calculator.dataset.firstValue
            6. calculator.dataset.operator
            7. calculator.dataset.modValue
            */
    if (!action) {
        return displayedNum === '0' ||
            previousKeyType === 'operator' ||
            previousKeyType === 'calculate'
            ? keyContent
            : displayedNum + keyContent;
    }

    if (keyType === 'number') { /* ... */ }

    if (keyType === 'decimal') {
        if (!displayedNum.includes('.')) return displayedNum + '.'
        if (previousKeyType === 'operator' ||
            previousKeyType === 'calculate') return '0.';
        return displayedNum;
    }

    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) {
        const firstValue = calculator.dataset.firstValue;
        const operator = calculator.dataset.operator;

        return firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ? calculate(firstValue, operator, displayedNum)
            : displayedNum;
    }

    if (keyType === 'operator') {
        key.classList.add('is-depressed')
        calculator.dataset.operator = key.dataset.action;
        calculator.dataset.firstValue = firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ? calculatedValue
            : displayedNum
    }

    if (keyType === 'clear') return 0;

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayedNum
        return firstValue
            ? previousKeyType === 'calculate'
                ? calculate(displayedNum, operator, modValue)
                : calculate(firstValue, operator, displayedNum)
            : displayedNum;
    }

}

const updateCalculatorState = (key, calculator, calculatedValue, displayedNum) => {
    /*Variables and properties needed
    1. key
    2. calculator
    3. calculatedValue
    4. displayedNum 
    5. modValue */
    const keyType = getKeyType(key);
    calculator.dataset.previousKeyType = keyType;

    Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

    if (keyType === 'operator') {
        key.classList.add('is-depressed')
        calculator.dataset.operator = key.dataset.action
        calculator.dataset.firstValue = firstValue &&
            operator &&
            previousKeyType !== 'operator' &&
            previousKeyType !== 'calculate'
            ? calculatedValue
            : displayedNum
    }

    if (keyType === 'calculate') {
        calculator.dataset.modValue = firstValue && previousKeyType === 'calculate'
            ? modValue
            : displayedNum
    }

    if (action === 'clear') {
        if (key.textContent === 'AC') {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
        } else {
            key.textContent = 'AC'
        }
    }

    if (action !== 'clear') {
        const clearButton = calculator.querySelector('[data-action=clear]')
        clearButton.textContent = 'CE'
    }
}

const getKeyType = (key) => {
    const { action } = key.dataset;
    if (!action) return 'number';
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator';
    // For everything else, return the action
    return action;
}

const updateVisualState = (key, calculator) => {
        const keyType = getKeyType(key);
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('is-depressed'));

        if (keyType === 'operator') key.classList.add('is-depressed');

        if (keyType === 'clear' && key.textContent !== 'AC') {
            key.textContent = 'AC';
        }

        if (keyType !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
        }
    }

keys.addEventListener('click', e => {
    if (e.target.matches('button')) return;
    const key = e.target;
    const displayedNum = display.textContent;
    const resultString = createResultString(key, displayedNum, calculator.dataset);

    display.textContent = resultString;

    // Pass in necessary values
    updateCalculatorState(key, calculator, calculatedValue, displayedNum);
    updateVisualState(key, calculator);

    
})


