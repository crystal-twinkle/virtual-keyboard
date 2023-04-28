import keyboard from './keyboard.js';
import createElement from './create.js';

const { body } = document;

const createHeader = () => {
  const header = createElement('div', '', 'header');
  header.append(createElement('h1', 'Virtual Keyboard', 'header__title'));
  header.append(createElement('p', 'Change Language: Ctrl + Alt', 'subhead__text'));
  header.append(createElement('p', 'Made for: Windows', 'subhead__text'));
  body.append(header);
};

createHeader();

const textField = createElement('textarea', '', 'text-field');
body.append(textField);
body.append(keyboard.generateKeyboard());

document.addEventListener('keydown', (event) => {
  textField.focus();
  if (event.code === 'CapsLock') keyboard.capsLock(event);
  if (event.altKey && event.ctrlKey) keyboard.changeLang(event);
  if (event.shiftKey) keyboard.upper(event);
  if (event.code === 'ArrowRight') {
    event.preventDefault();
    textField.value += '►';
  }
  if (event.code === 'ArrowLeft') {
    event.preventDefault();
    textField.value += '◄';
  }
  if (event.code === 'ArrowUp') {
    event.preventDefault();
    textField.value += '▲';
  }
  if (event.code === 'ArrowDown') {
    event.preventDefault();
    textField.value += '▼';
  }
  if (event.code === 'Tab') {
    event.preventDefault();
    textField.value += '    ';
  }

  const pressKey = document.querySelector(`[data-code=${event.code}]`);
  if (pressKey) {
    pressKey.classList.add('active');
  }
});

document.addEventListener('keyup', (event) => {
  if (keyboard.wasShift) {
    keyboard.shiftDrop(event);
  }
  const pressKey = document.querySelector(`[data-code=${event.code}]`);
  if (pressKey) {
    pressKey.classList.remove('active');
  }
});

function virtualKeyClick() {
  const keys = document.querySelectorAll('.key');
  for (const e of keys) {
    e.addEventListener('click', () => {
      if (e.dataset.ru || e.dataset.code === 'ArrowUp' || e.dataset.code === 'ArrowDown' || e.dataset.code === 'ArrowLeft' || e.dataset.code === 'ArrowRight') {
        textField.value += e.textContent;
      }
      if (e.dataset.code === 'Backspace' || e.dataset.code === 'Delete') textField.value = textField.value.slice(0, -1);
      if (e.dataset.code === 'Tab') textField.value += '    ';
      if (e.dataset.code === 'Enter') textField.value += '\n';
      if (e.dataset.code === 'CapsLock') keyboard.capsLock();
      if (e.dataset.code === 'ShiftLeft' || e.dataset.code === 'ShiftRight') {
        keyboard.upper();
      } else keyboard.shiftDrop();
    });
  }
}

setTimeout(virtualKeyClick, 200);