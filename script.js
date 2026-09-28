// ========================================
// SELECT HTML ELEMENTS
// ========================================

// Calculator display
const currentDisplay =
    document.getElementById("current-display");

const previousDisplay =
    document.getElementById("previous-display");


// Number buttons
const numberButtons =
    document.querySelectorAll(".number");


// Operator buttons
const operatorButtons =
    document.querySelectorAll(".operator");


// Other buttons
const clearButton =
    document.getElementById("clear");

const deleteButton =
    document.getElementById("delete");

const decimalButton =
    document.getElementById("decimal");

const equalsButton =
    document.getElementById("equals");



// ========================================
// CALCULATOR STATE
// ========================================

let currentOperand = "";

let previousOperand = "";

let operation = null;



// ========================================
// APPEND NUMBER
// ========================================

function appendNumber(number) {

    currentOperand =
        currentOperand + number;

    updateDisplay();
}



// ========================================
// NUMBER BUTTON EVENTS
// ========================================

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        appendNumber(button.dataset.number);

    });

});



// ========================================
// UPDATE DISPLAY
// ========================================

function updateDisplay() {

    // Current display

    if (currentOperand === "") {

        currentDisplay.textContent = "0";

    } else {

        currentDisplay.textContent =
            currentOperand;

    }


    // Previous display

    if (operation !== null) {

        previousDisplay.textContent =
            previousOperand +
            " " +
            getOperatorSymbol(operation);

    } else {

        previousDisplay.textContent = "";

    }

}



// ========================================
// CHOOSE OPERATOR
// ========================================

function chooseOperation(selectedOperation) {

    // Do nothing if no number exists
    if (currentOperand === "") {

        return;

    }


    // If another calculation already exists,
    // calculate it first

    if (previousOperand !== "") {

        calculate();

    }


    previousOperand =
        currentOperand;

    currentOperand = "";

    operation =
        selectedOperation;

    updateDisplay();
}



// ========================================
// OPERATOR BUTTON EVENTS
// ========================================

operatorButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        chooseOperation(
            button.dataset.operator
        );

    });

});



// ========================================
// CALCULATE
// ========================================

function calculate() {

    let result;


    // Convert strings into real numbers

    const previous =
        parseFloat(previousOperand);

    const current =
        parseFloat(currentOperand);


    // Make sure both numbers exist

    if (
        isNaN(previous) ||
        isNaN(current)
    ) {

        return;

    }



    // Addition

    if (operation === "+") {

        result =
            previous + current;

    }


    // Subtraction

    else if (operation === "-") {

        result =
            previous - current;

    }


    // Multiplication

    else if (operation === "*") {

        result =
            previous * current;

    }


    // Division

    else if (operation === "/") {


        // Prevent division by zero

        if (current === 0) {

            currentDisplay.textContent =
                "Error";

            currentOperand = "";

            previousOperand = "";

            operation = null;

            return;

        }


        result =
            previous / current;

    }


    // Modulus

    else if (operation === "%") {

        result =
            previous % current;

    }


    // Store result

    currentOperand =
        result.toString();


    previousOperand = "";

    operation = null;


    updateDisplay();
}



// ========================================
// EQUAL BUTTON
// ========================================

equalsButton.addEventListener(
    "click",
    function() {

        calculate();

    }
);



// ========================================
// CLEAR CALCULATOR
// ========================================

function clearCalculator() {

    currentOperand = "";

    previousOperand = "";

    operation = null;

    updateDisplay();
}



clearButton.addEventListener(
    "click",
    function() {

        clearCalculator();

    }
);



// ========================================
// DELETE LAST DIGIT
// ========================================

function deleteNumber() {

    currentOperand =
        currentOperand.slice(0, -1);

    updateDisplay();
}



deleteButton.addEventListener(
    "click",
    function() {

        deleteNumber();

    }
);



// ========================================
// DECIMAL
// ========================================

function addDecimal() {

    // Don't allow two decimal points

    if (
        currentOperand.includes(".")
    ) {

        return;

    }


    // If user presses decimal first,
    // create 0.

    if (currentOperand === "") {

        currentOperand = "0.";

    } else {

        currentOperand =
            currentOperand + ".";

    }


    updateDisplay();
}



decimalButton.addEventListener(
    "click",
    function() {

        addDecimal();

    }
);



// ========================================
// DISPLAY OPERATOR SYMBOLS
// ========================================

function getOperatorSymbol(operator) {

    if (operator === "*") {

        return "×";

    }


    if (operator === "/") {

        return "÷";

    }


    return operator;
}



// ========================================
// KEYBOARD SUPPORT
// ========================================

document.addEventListener(
    "keydown",
    function(event) {

        const key = event.key;


        // Numbers

        if (
            key >= "0" &&
            key <= "9"
        ) {

            appendNumber(key);

        }


        // Decimal

        if (key === ".") {

            addDecimal();

        }


        // Operators

        if (
            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "%"
        ) {

            chooseOperation(key);

        }


        // Calculate

        if (
            key === "Enter" ||
            key === "="
        ) {

            calculate();

        }


        // Delete

        if (key === "Backspace") {

            deleteNumber();

        }


        // Clear

        if (key === "Escape") {

            clearCalculator();

        }

    }
);