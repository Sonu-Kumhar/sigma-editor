//  resizing logic

// js/resize.js

let isResizing = false;
let resizeDirection = null;
let startMouseX = 0;
let startMouseY = 0;
let startWidth = 0;
let startHeight = 0;
let startX = 0;
let startY = 0;

const MIN_SIZE = 20;

// ===== ADD HANDLES =====
function addResizeHandles(element) {
  ["nw", "ne", "sw", "se"].forEach((dir) => {
    const handle = document.createElement("div");
    handle.classList.add("resize-handle", dir);

    handle.addEventListener("mousedown", (e) =>
      startResize(e, dir)
    );

    element.appendChild(handle);
  });
}

// ===== REMOVE HANDLES =====
function removeResizeHandles(element) {
  element.querySelectorAll(".resize-handle").forEach((h) => h.remove());
}

// ===== START RESIZE =====
function startResize(e, direction) {
  e.stopPropagation();

  const selected = getSelectedElement();
  if (!selected) return;

  isResizing = true;
  resizeDirection = direction;

  startMouseX = e.clientX;
  startMouseY = e.clientY;

  startWidth = selected.width;
  startHeight = selected.height;
  startX = selected.x;
  startY = selected.y;

  document.addEventListener("mousemove", onResizeMove);
  document.addEventListener("mouseup", stopResize);
}

// ===== RESIZE MOVE =====
function onResizeMove(e) {
  if (!isResizing) return;

  const selected = getSelectedElement();
  if (!selected) return;

  const dx = e.clientX - startMouseX;
  const dy = e.clientY - startMouseY;

  let newWidth = startWidth;
  let newHeight = startHeight;
  let newX = startX;
  let newY = startY;

  if (resizeDirection.includes("e")) {
    newWidth = startWidth + dx;
  }
  if (resizeDirection.includes("s")) {
    newHeight = startHeight + dy;
  }
  if (resizeDirection.includes("w")) {
    newWidth = startWidth - dx;
    newX = startX + dx;
  }
  if (resizeDirection.includes("n")) {
    newHeight = startHeight - dy;
    newY = startY + dy;
  }

  // ===== MIN SIZE =====
  newWidth = Math.max(MIN_SIZE, newWidth);
  newHeight = Math.max(MIN_SIZE, newHeight);

  // ===== CANVAS BOUNDARY =====
  const canvasRect = canvas.getBoundingClientRect();

  newX = Math.max(0, newX);
  newY = Math.max(0, newY);

  newWidth = Math.min(newWidth, canvasRect.width - newX);
  newHeight = Math.min(newHeight, canvasRect.height - newY);

  // Update state
  selected.x = newX;
  selected.y = newY;
  selected.width = newWidth;
  selected.height = newHeight;

  // Update DOM
  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );

  if (domEl) {
    domEl.style.left = newX + "px";
    domEl.style.top = newY + "px";
    domEl.style.width = newWidth + "px";
    domEl.style.height = newHeight + "px";
  }
}

// ===== STOP RESIZE =====
function stopResize() {
  isResizing = false;
  resizeDirection = null;

  document.removeEventListener("mousemove", onResizeMove);
  document.removeEventListener("mouseup", stopResize);
}
