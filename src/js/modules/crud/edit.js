
export const resetEdit = (taskList) => {
	const AlltaskContent = taskList.querySelectorAll('.list-item__value');
	AlltaskContent.forEach((content) => {
		content.classList.remove('edited');
	});
};

export const editTask = (taskContent, taskList) => {
	resetEdit(taskList);
	taskContent.setAttribute('contenteditable', 'true');
	taskContent.classList.add('edited');
	taskContent.focus();
};

export const finishEditing = (taskContent, index, tasks) => {
	taskContent.setAttribute('contenteditable', 'false');
	taskContent.classList.remove('edited');
	tasks[index] = taskContent.textContent;
};
export const handlEdit = (e, taskList, tasks) => {
	const target = e.target;
	const editButton = target.closest('.edit-btn');
	if (!editButton) return;
	const index = parseInt(editButton.dataset.index);
	const taskWrap = editButton.closest('.list-item');
	const taskContent = taskWrap.querySelector('.list-item__value');
	if (!taskContent.classList.contains('edited')) {
		editTask(taskContent, taskList);
	} else {
		finishEditing(taskContent, index, tasks);
	}
};
