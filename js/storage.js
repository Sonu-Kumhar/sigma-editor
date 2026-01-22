// save / load (localStorage)

// js/storage.js

const STORAGE_KEY = "sigma-editor-layout";

// ===== SAVE =====
function saveToStorage() {
  const data = JSON.stringify(editorState.elements);
  localStorage.setItem(STORAGE_KEY, data);
}

// ===== LOAD =====
function loadFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;

  const elements = JSON.parse(data);

  editorState.elements = elements;

  // Clear canvas
  canvas.innerHTML = "";

  // Re-render elements
  elements.forEach((el) => {
    renderElement(el);
  });

  clearSelection();
  updateSelectionUI();
}
