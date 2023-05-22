import { render } from './render.js';  

export const deleteTask = (index, tasks, taskList) => {
	tasks.splice(index, 1);
	render(taskList, tasks);  
};

export const handlDelit = (e, tasks, taskList) => {
	const target = e.target;
	const deleteButton = target.closest('.delete-btn');
	if (deleteButton) {
		const index = parseInt(deleteButton.dataset.index);
		deleteTask(index, tasks, taskList);
	}
};
