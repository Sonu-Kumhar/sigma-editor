// dragging logic

// js/drag.js

let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;
let elementStartX = 0;
let elementStartY = 0;

function onMouseDownDrag(e) {
  const selected = getSelectedElement();
  if (!selected) return;

  // Sirf selected element pe drag allow
  const id = e.currentTarget.dataset.id;
  if (id !== selected.id) return;

  isDragging = true;

  dragStartX = e.clientX;
  dragStartY = e.clientY;

  elementStartX = selected.x;
  elementStartY = selected.y;

  document.addEventListener("mousemove", onMouseMoveDrag);
  document.addEventListener("mouseup", onMouseUpDrag);
}

function onMouseMoveDrag(e) {
  if (!isDragging) return;

  const selected = getSelectedElement();
  if (!selected) return;

  const dx = e.clientX - dragStartX;
  const dy = e.clientY - dragStartY;

  let newX = elementStartX + dx;
  let newY = elementStartY + dy;

  // ===== CANVAS BOUNDARY CONSTRAINT =====
  const canvasRect = canvas.getBoundingClientRect();

  newX = Math.max(0, Math.min(newX, canvasRect.width - selected.width));
  newY = Math.max(0, Math.min(newY, canvasRect.height - selected.height));

  // Update state
  selected.x = newX;
  selected.y = newY;

  // Update DOM
  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );

  if (domEl) {
    domEl.style.left = newX + "px";
    domEl.style.top = newY + "px";
  }
}

function onMouseUpDrag() {
  isDragging = false;

  document.removeEventListener("mousemove", onMouseMoveDrag);
  document.removeEventListener("mouseup", onMouseUpDrag);
}
