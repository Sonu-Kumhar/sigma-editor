// rotation logic

// js/rotate.js

const rotationInput = document.getElementById("prop-rotation");

// Update rotation from slider
rotationInput.addEventListener("input", () => {
  const selected = getSelectedElement();
  if (!selected) return;

  const angle = Number(rotationInput.value);
  selected.rotation = angle;

  const domEl = document.querySelector(
    `.editor-element[data-id="${selected.id}"]`
  );

  if (domEl) {
    domEl.style.transform = `rotate(${angle}deg)`;
  }
});

// Sync rotation slider on selection change
function syncRotationUI() {
  const selected = getSelectedElement();
  if (!selected) {
    rotationInput.value = 0;
    return;
  }
  rotationInput.value = selected.rotation;
}
