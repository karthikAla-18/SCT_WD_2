document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".btn");
  const historyDiv = document.getElementById("history");
  let currentInput = "";

  function updateDisplay(value) {
    display.value = value;
  }

  function addToHistory(expr, result) {
    const entry = document.createElement("div");
    entry.textContent = `${expr} = ${result}`;
    historyDiv.appendChild(entry);
    historyDiv.scrollTop = historyDiv.scrollHeight;
  }

  function evaluateExpression() {
    try {
      const result = eval(currentInput);
      addToHistory(currentInput, result);
      updateDisplay(result);
      currentInput = result.toString();
    } catch {
      updateDisplay("Error");
      currentInput = "";
    }
  }

  buttons.forEach(button => {
    const value = button.dataset.value;
    button.addEventListener("click", () => {
      if (value !== undefined) {
        currentInput += value;
        updateDisplay(currentInput);
      }
    });
  });

  document.getElementById("equals").addEventListener("click", evaluateExpression);

  document.getElementById("clear").addEventListener("click", () => {
    currentInput = "";
    updateDisplay("");
  });

  document.getElementById("backspace").addEventListener("click", () => {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput);
  });

  document.getElementById("sqrt").addEventListener("click", () => {
    try {
      const result = Math.sqrt(eval(currentInput));
      addToHistory(`√(${currentInput})`, result);
      updateDisplay(result);
      currentInput = result.toString();
    } catch {
      updateDisplay("Error");
      currentInput = "";
    }
  });

  document.getElementById("square").addEventListener("click", () => {
    try {
      const result = Math.pow(eval(currentInput), 2);
      addToHistory(`(${currentInput})²`, result);
      updateDisplay(result);
      currentInput = result.toString();
    } catch {
      updateDisplay("Error");
      currentInput = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (!isNaN(key) || "+-*/.%()".includes(key)) {
      currentInput += key;
      updateDisplay(currentInput);
    } else if (key === "Enter") {
      evaluateExpression();
    } else if (key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
    } else if (key.toLowerCase() === "c") {
      currentInput = "";
      updateDisplay("");
    }
  });
});
