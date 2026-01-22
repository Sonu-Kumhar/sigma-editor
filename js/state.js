// central state (elements, selection)

// All elements data

const editorState = {
  elements: [],          // array of element objects
  selectedElementId: null,
};

// Generate unique IDs
let idCounter = 1;
function generateId() {
  return "el_" + idCounter++;
}

// Get selected element object
function getSelectedElement() {
  return editorState.elements.find(
    (el) => el.id === editorState.selectedElementId
  );
}

// Select an element
function selectElement(id) {
  editorState.selectedElementId = id;
}

// Deselect everything
function clearSelection() {
  editorState.selectedElementId = null;
}
