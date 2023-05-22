
export const resetEdit = () => {
	const AlltaskContent = taskList.querySelectorAll('.list-item__value');
	AlltaskContent.forEach((content) => {
		content.classList.remove('edited');
	});
};

export const editTask = (taskContent) => {
	resetEdit();
	taskContent.setAttribute('contenteditable', 'true');
	taskContent.classList.add('edited');
	taskContent.focus();
};

export const finishEditing = (taskContent, index) => {
	taskContent.setAttribute('contenteditable', 'false');
	taskContent.classList.remove('edited');
	tasks[index] = taskContent.textContent;
	console.log(tasks);
};
export const handlEdit = (e) => {
	const target = e.target;
	const editButton = target.closest('.edit-btn');
	if (!editButton) return;
	const index = parseInt(editButton.dataset.index);
	const taskWrap = editButton.closest('.list-item');
	const taskContent = taskWrap.querySelector('.list-item__value');
	if (!taskContent.classList.contains('edited')) {
		editTask(taskContent, index);
	} else {
		finishEditing(taskContent, index);
	}
};
