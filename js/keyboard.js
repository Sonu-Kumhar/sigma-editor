// keyboard interactions

// js/keyboard.js

document.addEventListener("keydown", (e) => {
  const selected = getSelectedElement();
  if (!selected) return;

  // Agar user input field me type kar raha hai → ignore
  const activeTag = document.activeElement.tagName;
  if (activeTag === "INPUT" || activeTag === "TEXTAREA") return;

  const step = 5;
  let moved = false;

  switch (e.key) {
    case "Delete":
    case "Backspace":
      deleteSelectedElement();
      e.preventDefault();
      return;

    case "ArrowLeft":
      selected.x = Math.max(0, selected.x - step);
      moved = true;
      break;

    case "ArrowRight":
      selected.x = Math.min(
        canvas.clientWidth - selected.width,
        selected.x + step
      );
      moved = true;
      break;

    case "ArrowUp":
      selected.y = Math.max(0, selected.y - step);
      moved = true;
      break;

    case "ArrowDown":
      selected.y = Math.min(
        canvas.clientHeight - selected.height,
        selected.y + step
      );
      moved = true;
      break;
  }

  if (moved) {
    updateDomPosition(selected);
    e.preventDefault();
  }
});

// ===== DELETE =====
function deleteSelectedElement() {
  const selected = getSelectedElement();
  if (!selected) return;

  // Remove from state
  editorState.elements = editorState.elements.filter(
    (el) => el.id !== selected.id
  );

  // Remove from DOM
  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );
  if (domEl) domEl.remove();

  clearSelection();
  updateSelectionUI();
  saveToStorage();

}

// ===== UPDATE POSITION =====
function updateDomPosition(selected) {
  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );

  if (!domEl) return;

  domEl.style.left = selected.x + "px";
  domEl.style.top = selected.y + "px";
  saveToStorage();

}
