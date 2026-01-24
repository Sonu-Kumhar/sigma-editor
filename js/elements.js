//  create rectangle / text

// js/elements.js

const canvas = document.getElementById("canvas");

// Create Rectangle
function createRectangle() {
  const id = generateId();

  const elementData = {
    id,
    type: "rectangle",
    x: 50 + editorState.elements.length * 20,
    y: 50 + editorState.elements.length * 20,

    width: 150,
    height: 100,
    rotation: 0,
    backgroundColor: "#4a90e2",
    text: "",
    zIndex: editorState.elements.length + 1,
  };

  editorState.elements.push(elementData);
  renderElement(elementData);
  saveToStorage();

}

// Create Text Box
function createTextBox() {
  const id = generateId();

  const elementData = {
    id,
    type: "text",
    x: 70,
    y: 70,
    width: 180,
    height: 40,
    rotation: 0,
    backgroundColor: "transparent",
    text: "Edit text",
    zIndex: editorState.elements.length + 1,
  };

  editorState.elements.push(elementData);
  renderElement(elementData);
  saveToStorage();

}

function renderElement(data) {
  const el = document.createElement("div");

  el.classList.add("editor-element");

  if (data.type === "rectangle") {
    el.classList.add("rectangle");
    el.style.backgroundColor = data.backgroundColor;
  }

  if (data.type === "text") {
    el.classList.add("text-box");
    el.textContent = data.text;
  }

  el.style.left = data.x + "px";
  el.style.top = data.y + "px";
  el.style.width = data.width + "px";
  el.style.height = data.height + "px";
  el.style.zIndex = data.zIndex;
  el.dataset.id = data.id;

  el.addEventListener("click", handleElementClick);
  el.addEventListener("mousedown", onMouseDownDrag);
  canvas.appendChild(el);
  renderLayers();

}
