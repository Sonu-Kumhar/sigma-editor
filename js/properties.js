// properties panel binding

// js/properties.js

const widthInput = document.getElementById("prop-width");
const heightInput = document.getElementById("prop-height");
const bgInput = document.getElementById("prop-bg");
const textInput = document.getElementById("prop-text");

// ===== SYNC UI FROM STATE =====
function syncPropertiesUI() {
  const selected = getSelectedElement();

  if (!selected) {
    disableProperties();
    return;
  }

  enableProperties();

  widthInput.value = selected.width;
  heightInput.value = selected.height;
  bgInput.value = selected.backgroundColor || "#000000";

  if (selected.type === "text") {
    textInput.disabled = false;
    textInput.value = selected.text;
  } else {
    textInput.disabled = true;
    textInput.value = "";
  }
}

// ===== ENABLE / DISABLE =====
function disableProperties() {
  widthInput.disabled = true;
  heightInput.disabled = true;
  bgInput.disabled = true;
  textInput.disabled = true;
}

function enableProperties() {
  widthInput.disabled = false;
  heightInput.disabled = false;
  bgInput.disabled = false;
}

// ===== WIDTH =====
widthInput.addEventListener("input", () => {
  const selected = getSelectedElement();
  if (!selected) return;

  const value = Math.max(20, Number(widthInput.value));
  selected.width = value;

  updateDom(selected);
  saveToStorage();

});

// ===== HEIGHT =====
heightInput.addEventListener("input", () => {
  const selected = getSelectedElement();
  if (!selected) return;

  const value = Math.max(20, Number(heightInput.value));
  selected.height = value;

  updateDom(selected);
  saveToStorage();

});

// ===== BACKGROUND =====
bgInput.addEventListener("input", () => {
  const selected = getSelectedElement();
  if (!selected) return;

  selected.backgroundColor = bgInput.value;

  const domEl = getDom(selected);
  if (domEl) {
    domEl.style.backgroundColor = bgInput.value;
  }
  saveToStorage();

});

// ===== TEXT =====
textInput.addEventListener("input", () => {
  const selected = getSelectedElement();
  if (!selected || selected.type !== "text") return;

  selected.text = textInput.value;

  const domEl = getDom(selected);
  if (domEl) {
    domEl.textContent = textInput.value;
  }
  saveToStorage();

});

// ===== HELPERS =====
function getDom(selected) {
  return document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );
}

function updateDom(selected) {
  const domEl = getDom(selected);
  if (!domEl) return;

  domEl.style.width = selected.width + "px";
  domEl.style.height = selected.height + "px";
  
}
