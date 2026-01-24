// select / deselect logic

// js/selection.js

function handleElementClick(e) {
  e.stopPropagation(); // canvas click se bachane ke liye

  const id = e.currentTarget.dataset.id;
  selectElement(id);
  updateSelectionUI();
}

function updateSelectionUI() {
  // sab deselect + handles hatao
  document.querySelectorAll(".editor-element").forEach((el) => {
    el.classList.remove("selected");
    removeResizeHandles(el);
  });

  const selected = getSelectedElement();
  if (!selected) return;

  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );

  if (domEl) {
    domEl.classList.add("selected");
    addResizeHandles(domEl);
  }

  syncRotationUI();
  renderLayers();
syncPropertiesUI(); 

}


canvas.addEventListener("click", (e) => {
  if (e.target !== canvas) return; // 🔥 ONLY empty canvas click
  clearSelection();
  updateSelectionUI();
});
