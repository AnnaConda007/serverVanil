import { resetEdit, finishEditing, handlEdit } from './edit.js';
import { handlDelit } from './delete.js';
import { render } from './render.js';

export const crud = async () => {
	const pathURl = window.location.pathname;
	const thisPageURL = '/';
	if (pathURl != thisPageURL) return;
	const taskInput = document.querySelector('.task-input');
	const addBtn = document.querySelector('.add-btn');
	const taskList = document.querySelector('.task-list');
	let tasks = [];

	const res = await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/tasks.json');
	const resJson = await res.json();
	console.log(resJson);
	tasks = resJson ? resJson : tasks;
	render(taskList, tasks);

	const pushTasks = async () => {
		await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/tasks.json', {
			method: 'PUT',
			body: JSON.stringify(tasks),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const res = await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/tasks.json');
		const resJson = await res.json();
		console.log(resJson);
		tasks = resJson ? resJson : tasks;
		render(taskList, tasks);
	};

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
