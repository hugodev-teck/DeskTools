//--------------------------------------------------color--------------------------------------------------------
const colorButtons = document.querySelectorAll('.class1-color-button');
const anotherColorButton = document.getElementById('another');
const customColorPicker = document.getElementById('custom-color-picker');

colorButtons.forEach(button => {
  button.addEventListener('click', () => {
    const color = button.dataset.color;
    applyColorToSelection(color);
  });
});

anotherColorButton.addEventListener('click', () => {
  customColorPicker.click();
});

customColorPicker.addEventListener('input', () => {
  const color = customColorPicker.value;
  applyColorToSelection(color);
});

function applyColorToSelection(color) {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.style.color = color;
    range.surroundContents(span);
  }
}
