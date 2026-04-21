let items = [
 «Сделать проектную работу»,
 «Полить цветы»,
 «Пройти туториал по Реакту»,
 «Сделать фронт для своего проекта»,
 «Прогуляться по улице в солнечный день»,
 «Помыть посуду»,
];
Const listElement = document.querySelector(«.to-do__list»);
Const formElement = document.querySelector(«.to-do__form»);
Const inputElement = document.querySelector(«.to-do__input»);
Function loadTasks() {
  Const saved = localStorage.getItem('tasks');
  Return saved ? JSON.parse(saved) : items;
}
Function createItem(item) {
 Const template = document.getElementById(«to-do__item-template»);
 Const clone = template.content.querySelector(«.to-do__item»).cloneNode(true);
  Const textElement = clone.querySelector(«.to-do__item-text»);
  Const deleteButton = clone.querySelector(«.to-do__item-button_type_delete»);
  Const duplicateButton = clone.querySelector(«.to-do__item-button_type_duplicate»);
  Const editButton = clone.querySelector(«.to-do__item-button_type_edit»);
 textElement.textContent = item; 
 deleteButton.addEventListener('click', function () {
  clone.remove();
  let items = getTasksFromDOM();
  saveTasks(items);
 });
 duplicateButton.addEventListener('click', function() {
  const itemName = textElement.textContent;
  const newItem = createItem(itemName);
  listElement.prepend(newItem);
  let items = getTasksFromDOM();
  saveTasks(items);
 }); 
 editButton.addEventListener('click', function () {
  textElement.setAttribute('contenteditable', 'true');
  textElement.focus();
 });
 textElement.addEventListener('blur', function() {
  if (textElement.getAttribute('contenteditable') === 'true') {
   textElement.setAttribute('contenteditable', 'false')
   const items = getTasksFromDOM();
   saveTasks(items);
  }
 });
 Return clone;
}
Function getTasksFromDOM() {
 Let itemsNamesElements = document.querySelectorAll('.to-do__item-text');
 Const tasks = [];
 itemsNamesElements.forEach( function (item) {
  tasks.push(item.textContent);
 });
 Return tasks;
}
Function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
Items = loadTasks();
Items.forEach((item) => {
 Const itemElement = createItem(item);
 listElement.append(itemElement);
});
formElement.addEventListener('submit', function (evt) {
 evt.preventDefault(); 
 const outputText = inputElement.value; 
 const itemElements = createItem(outputText);
 listElement.prepend(itemElements);
 items = getTasksFromDOM();
 saveTasks(items);
 inputElement.value = ''; 
});
The text wrapping in Edge and IE.
 * 2. Correct the color inheritance from fieldset elements in IE.
 * 3. Remove the padding so developers are not caught out when they zero out
 *    fieldset elements in all browsers.
 */
Legend {
  Box-sizing: border-box; /* 1 */
  Color: inherit; /* 2 */
  Display: table; /* 1 */
  Max-width: 100%; /* 1 */
  Padding: 0; /* 3 */
  White-space: normal; /* 1 */
}
/**
 * Add the correct vertical alignment in Chrome, Firefox, and Opera.
 */
Progress {
  Vertical-align: baseline;
}
/**
 * Remove the default vertical scrollbar in IE 10+.
 */
Textarea {
  Overflow: auto;
}
/**
 * 1. Add the correct box sizing in IE 10.
 * 2. Remove the padding in IE 10.
 */
[type=»checkbox»],
[type=»radio»] {
  Box-sizing: border-box; /* 1 */
  Padding: 0; /* 2 */
}
/**
 * Correct the cursor style of increment and decrement buttons in Chrome.
 */
[type=»number»]::-webkit-inner-spin-button,
[type=»number»]::-webkit-outer-spin-button {
  Height: auto;
}
/**
 * 1. Correct the odd appearance in Chrome and Safari.
 * 2. Correct the outline style in Safari.
 */
[type=»search»] {
  -webkit-appearance: textfield; /* 1 */
  Outline-offset: -2px; /* 2 */
}
/**
 * Remove the inner padding in Chrome and Safari on macOS.
 */
[type=»search»]::-webkit-search-decoration {
  -webkit-appearance: none;
}
/**
 * 1. Correct the inability to style clickable types in iOS and Safari.
 * 2. Change font properties to inherit in Safari.
 */
::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  Font: inherit; /* 2 */
}
/* Interactive
   ========================================================================== */
/*
 * Add the correct display in Edge, IE 10+, and Firefox.
 */
Details {
  Display: block;
}
/*
 * Add the correct display in all browsers.
 */
Summary {
  Display: list-item;
}
/* Misc
   ========================================================================== */
/**
 * Add the correct display in IE 10+.
 */
Template {
  Display: none;
}
/**
 * Add the correct display in IE 10.
 */
[hidden] {
  Display: none;
}

