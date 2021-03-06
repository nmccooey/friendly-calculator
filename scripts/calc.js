let runningTotal = 0;
let currentDisplay = "0";
let previousOperator = null;
const display = document.querySelector(".display-result");

const buttons = document.querySelectorAll(".grid-container .calc-button")
for (const button of buttons) {
    button.addEventListener("click", function(event) {
        buttonClick(event.target.innerText);
    })
}

function buttonClick(value) {
    if (isNaN(value - 1)) {
        handleOperation(value);
    } else {
        handleNumber(value);
        rerender();
    }
}

function handleNumber(value) {
    if (currentDisplay === "0") {
        currentDisplay = value;
    } else {
        currentDisplay += value;
    }
}

function handleOperation(value) {
    switch (value) {
        case "C":
            currentDisplay = "0";
            rerender();
            break;
        case "DEL":
            currentDisplay = currentDisplay.substring(0, currentDisplay.length - 1);
            if (currentDisplay.length < 1) {
                currentDisplay = "0";
            }
            rerender();
            break;
        case "±":
            if (Number(currentDisplay) > 0) {
                currentDisplay = pos_to_neg(Number(currentDisplay));
            } else if (Number(currentDisplay) < 0) {
                currentDisplay = neg_to_pos(Number(currentDisplay));
            } else {
                currentDisplay = "0";
            }
            
            rerender();
            break;
        case ".":
            if (!currentDisplay.includes(".")) {
                currentDisplay += ".";
            }
            
            rerender();
            break;
        case "=":
            if (previousOperator === null) {
                    return;
            }
            
            operate(Number(currentDisplay));
            previousOperator = null;
            currentDisplay = "" + runningTotal;
            runningTotal = 0;
            rerender();
            break;

        default:
            handleMath(value);
            break;
    }
}

function handleMath(operator) {
    const intCurrentDisplay = Number(currentDisplay);

    if (runningTotal === 0) {
        runningTotal = intCurrentDisplay;
    } else {
        operate(intCurrentDisplay);
    }
    previousOperator = operator;
    currentDisplay = "0";
}

function operate(intCurrentDisplay) {
    if (previousOperator === "+") {
        runningTotal += intCurrentDisplay;
    } else if (previousOperator === "-") {
        runningTotal -= intCurrentDisplay;
    } else if (previousOperator === "×") {
        runningTotal *= intCurrentDisplay;
    } else if (previousOperator === "÷") {
        runningTotal /= intCurrentDisplay; 
    }
}

function pos_to_neg(number) {
    return -Math.abs(number);
}

function neg_to_pos(number) {
    return Math.abs(number);
}

function rerender() {
    display.innerText = currentDisplay;
}