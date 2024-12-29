let display = document.querySelector("#input");

// Append values to the display
let displayValue = (num) => {
    const lastChar = display.value.slice(-1);

    // Prevent consecutive operators
    if (["+", "-", "*", "/", "%"].includes(lastChar) && ["+", "-", "*", "/", "%"].includes(num)) {
        return;
    }

    display.value += num;
};

// Clear the display
let clearValue = () => {
    display.value = "";
};

// Evaluate the expression
let Calculate = () => {
    try {
        let expression = display.value;

        // Replace percentage symbol with division by 100
        expression = expression.replace(/(\d+)%/, (match, number) => `${number}/100`);

        display.value = eval(expression);
    } catch (error) {
        display.value = "Error"; 
    }
};

// Handle keyboard input
document.addEventListener("keydown", (event) => {
    console.log(event);
    const key = event.key;

    if (!isNaN(key)) {
        displayValue(key);
    } else if (["+", "-", "*", "/", "%"].includes(key)) {
        displayValue(key);
    } else if (key === "Enter") {
        Calculate();
    } else if (key === "Backspace") {
        display.value = display.value.slice(0, -1);
    } else if (key === "Escape") {
        clearValue();
    } else if (key === ".") {
        displayValue(key);
    } else if (key === "c") {
        clearValue();
    }
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    console.log(key);
    const button = document.querySelector(`input[value="${key}"]`);
    console.log("match : ", button);

    if (button) {
        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 100);
    }
});