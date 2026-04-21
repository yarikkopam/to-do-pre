let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem('todoTasks');
	if (savedTasks) {
		return JSON.parse(savedTasks);
	}
	return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener('click', function() {
		clone.remove();
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);
		listElement.prepend(newItem);
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	editButton.addEventListener('click', function() {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('blur', function() {
		textElement.setAttribute('contenteditable', 'false');
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	const tasks = [];
	itemsNamesElements.forEach(function(element) {
		tasks.push(element.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function renderTasks() {
	const tasks = loadTasks();
	tasks.forEach(function(task) {
		const taskElement = createItem(task);
		listElement.append(taskElement);
	});
}

formElement.addEventListener('submit', function(evt) {
	evt.preventDefault();
	
	const taskText = inputElement.value.trim();
	if (taskText === '') {
		return;
	}
	
	const taskElement = createItem(taskText);
	listElement.prepend(taskElement);
	
	const currentTasks = getTasksFromDOM();
	saveTasks(currentTasks);
	
	inputElement.value = '';
});

renderTasks();
