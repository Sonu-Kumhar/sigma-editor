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

// ===== EXPORT JSON =====
function exportAsJSON() {
  const dataStr = JSON.stringify(editorState.elements, null, 2);

  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sigma-editor-layout.json";
  a.click();

  URL.revokeObjectURL(url);
}

// ===== EXPORT HTML =====
function exportAsHTML() {
  let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sigma Editor Export</title>
</head>
<body>

<div style="
  position: relative;
  width: ${canvas.clientWidth}px;
  height: ${canvas.clientHeight}px;
  background: #ffffff;
">
`;

  editorState.elements.forEach((el) => {
    html += `
  <div style="
    position: absolute;
    left: ${el.x}px;
    top: ${el.y}px;
    width: ${el.width}px;
    height: ${el.height}px;
    background: ${el.backgroundColor};
    transform: rotate(${el.rotation}deg);
    z-index: ${el.zIndex};
  ">
    ${el.type === "text" ? el.text : ""}
  </div>
`;
  });

  html += `
</div>

</body>
</html>
`;

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "sigma-editor-export.html";
  a.click();

  URL.revokeObjectURL(url);
}
    