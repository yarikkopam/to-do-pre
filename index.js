// Исходный массив задач (используется, если в localStorage ничего нет)
const initialTasks = [
  'Сделать проектную работу',
  'Полить цветы',
  'Пройти туториал по Реакту',
  'Сделать фронт для своего проекта',
  'Прогуляться по улице в солнечный день',
  'Помыть посуду',
];

// DOM-элементы
const listElement = document.querySelector('.to-do__list');
const formElement = document.querySelector('.to-do__form');
const inputElement = document.querySelector('.to-do__input');

// Ключ для localStorage
const STORAGE_KEY = 'todoTasks';

/**
 * Загружает список задач: сначала пытается взять из localStorage,
 * если там пусто — возвращает исходный массив initialTasks.
 * @returns {string[]} Массив строк с текстами задач.
 */
function loadTasks() {
  const storedTasks = localStorage.getItem(STORAGE_KEY);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return initialTasks;
}

/**
 * Создаёт DOM-элемент задачи на основе шаблона.
 * @param {string} itemText - Текст задачи.
 * @returns {HTMLLIElement} Готовый элемент списка задач.
 */
function createItem(itemText) {
  const template = document.getElementById('to-do__item-template');
  const clone = template.content.querySelector('.to-do__item').cloneNode(true);

  const textElement = clone.querySelector('.to-do__item-text');
  const deleteButton = clone.querySelector('.to-do__item-button_type_delete');
  const duplicateButton = clone.querySelector('.to-do__item-button_type_duplicate');
  const editButton = clone.querySelector('.to-do__item-button_type_edit');

  // Устанавливаем текст задачи
  textElement.textContent = itemText;

  // --- Обработчик удаления задачи ---
  deleteButton.addEventListener('click', () => {
    clone.remove();
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  // --- Обработчик копирования задачи ---
  duplicateButton.addEventListener('click', () => {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  // --- Обработчик редактирования задачи (доп. задание) ---
  editButton.addEventListener('click', () => {
    textElement.contentEditable = 'true';
    textElement.focus();
  });

  textElement.addEventListener('blur', () => {
    textElement.contentEditable = 'false';
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });

  return clone;
}

/**
 * Собирает текущие тексты задач из DOM.
 * @returns {string[]} Массив строк задач.
 */
function getTasksFromDOM() {
  const textElements = document.querySelectorAll('.to-do__item-text');
  const tasks = [];
  textElements.forEach((element) => {
    tasks.push(element.textContent);
  });
  return tasks;
}

/**
 * Сохраняет массив задач в localStorage.
 * @param {string[]} tasks - Массив задач для сохранения.
 */
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Отображает начальный список задач при загрузке страницы.
 */
function renderInitialTasks() {
  const tasks = loadTasks();
  tasks.forEach((taskText) => {
    const taskElement = createItem(taskText);
    listElement.append(taskElement);
  });
}

// --- Обработчик отправки формы (добавление новой задачи) ---
formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTaskText = inputElement.value.trim();
  if (!newTaskText) return; // Игнорируем пустой ввод

  const newTaskElement = createItem(newTaskText);
  listElement.prepend(newTaskElement);

  const currentTasks = getTasksFromDOM();
  saveTasks(currentTasks);

  inputElement.value = ''; // Очищаем поле ввода
});

// Инициализация приложения: рендерим сохранённые задачи
renderInitialTasks();
