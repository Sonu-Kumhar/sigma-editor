// layers panel logic

// js/layers.js

const layersList = document.getElementById("layers-list");
const layerUpBtn = document.getElementById("layer-up");
const layerDownBtn = document.getElementById("layer-down");

// Render layers list
function renderLayers() {
  layersList.innerHTML = "";

  // Sort by zIndex (top layer last in list)
  const sorted = [...editorState.elements].sort(
    (a, b) => a.zIndex - b.zIndex
  );

  sorted.forEach((el) => {
    const li = document.createElement("li");
    li.textContent = `${el.type} (${el.id})`;
    li.dataset.id = el.id;

    if (el.id === editorState.selectedElementId) {
      li.classList.add("active");
    }

    li.addEventListener("click", () => {
      selectElement(el.id);
      updateSelectionUI();
      renderLayers();
    });

    layersList.appendChild(li);
  });
}

// Move layer up
layerUpBtn.addEventListener("click", () => {
  const selected = getSelectedElement();
  if (!selected) return;

  const maxZ = Math.max(...editorState.elements.map((e) => e.zIndex));
  if (selected.zIndex === maxZ) return;

  const above = editorState.elements.find(
    (e) => e.zIndex === selected.zIndex + 1
  );

  if (!above) return;

  above.zIndex--;
  selected.zIndex++;

  updateZIndices();
});

// Move layer down
layerDownBtn.addEventListener("click", () => {
  const selected = getSelectedElement();
  if (!selected) return;

  if (selected.zIndex === 1) return;

  const below = editorState.elements.find(
    (e) => e.zIndex === selected.zIndex - 1
  );

  if (!below) return;

  below.zIndex++;
  selected.zIndex--;

  updateZIndices();
});

// Apply zIndex changes to DOM
function updateZIndices() {
  editorState.elements.forEach((el) => {
    const domEl = document.querySelector(
      `.editor-element[data-id="${el.id}"]`
    );
    if (domEl) domEl.style.zIndex = el.zIndex;
  });

  renderLayers();
}
