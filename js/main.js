// entry point (init + wiring)

// js/main.js

const addRectBtn = document.getElementById("add-rect");
const addTextBtn = document.getElementById("add-text");

addRectBtn.addEventListener("click", createRectangle);
addTextBtn.addEventListener("click", createTextBox);

loadFromStorage();