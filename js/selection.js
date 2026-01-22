// select / deselect logic

// js/selection.js

function handleElementClick(e) {
  e.stopPropagation(); // canvas click se bachane ke liye

  const id = e.currentTarget.dataset.id;
  selectElement(id);
  updateSelectionUI();
}

function updateSelectionUI() {
  // sabse pehle sab deselect
  document.querySelectorAll(".editor-element").forEach((el) => {
    el.classList.remove("selected");
  });

  // phir selected element pe class lagao
  const selected = getSelectedElement();
  if (!selected) return;

  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );

  if (domEl) {
    domEl.classList.add("selected");
  }
}

// Canvas click → deselect
canvas.addEventListener("click", () => {
  clearSelection();
  updateSelectionUI();
});
