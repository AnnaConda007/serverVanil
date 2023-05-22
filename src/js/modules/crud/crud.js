import { resetEdit, finishEditing, handlEdit } from './edit.js';
import { handlDelit } from './delete.js';
import { render } from './render.js';

export const crud = () => {
	const pathURl = window.location.pathname;
	const thisPageURL = '/';
	if (pathURl != thisPageURL) return;
	const tasks = [];
	const taskInput = document.querySelector('.task-input');
	const addBtn = document.querySelector('.add-btn');
	const taskList = document.querySelector('.task-list');

	const addTask = () => {
		let task = taskInput.value.trim();
		if (task === '') return;
		tasks.push(task);
		taskInput.value = '';
		render(taskList, tasks);
	};

	taskList.addEventListener('click', (e) => {
		handlEdit(e, taskList, tasks);
		handlDelit(e, tasks, taskList, render);
	});

	taskList.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			const activeElement = document.activeElement;
			const taskContent = document.activeElement.closest('.list-item__value');
			const index = parseInt(activeElement.dataset.index);
			console.log('index', index);
			finishEditing(taskContent, index, tasks);
		}
	});

	addBtn.addEventListener('click', (e) => {
		e.preventDefault();
		addTask();
	});

	taskInput.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			addTask();
		}
	});

	window.addEventListener('click', (e) => {
		if (!e.target.closest('.list-item')) {
			resetEdit(taskList);
		}
	});
};
