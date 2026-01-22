// entry point (init + wiring)

// js/main.js

const addRectBtn = document.getElementById("add-rect");
const addTextBtn = document.getElementById("add-text");

addRectBtn.addEventListener("click", createRectangle);
addTextBtn.addEventListener("click", createTextBox);

loadFromStorage();

const exportJsonBtn = document.getElementById("export-json");

exportJsonBtn.addEventListener("click", exportAsJSON);

const exportHtmlBtn = document.getElementById("export-html");

exportHtmlBtn.addEventListener("click", exportAsHTML);
