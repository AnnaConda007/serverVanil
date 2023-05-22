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
		render();
	};

	const resetEdit = () => {
		const AlltaskContent = taskList.querySelectorAll('.list-item__value');
		AlltaskContent.forEach((content) => {
			content.classList.remove('edited');
		});
	};

	const editTask = (taskContent) => {
		resetEdit();
		taskContent.setAttribute('contenteditable', 'true');
		taskContent.classList.add('edited');
		taskContent.focus();
	};

	const finishEditing = (taskContent, index) => {
		taskContent.setAttribute('contenteditable', 'false');
		taskContent.classList.remove('edited');
		tasks[index] = taskContent.textContent;
		console.log(tasks);
	};
	const handlEdit = (e) => {
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

	const deleteTask = (index) => {
		tasks.splice(index, 1);
		render();
	};

	const handlDelit = (e) => {
		const target = e.target;
		const deleteButton = target.closest('.delete-btn');
		if (deleteButton) {
			const index = parseInt(deleteButton.dataset.index);
			deleteTask(index);
		}
	};

	taskList.addEventListener('click', (e) => {
		handlEdit(e);
		handlDelit(e);
	});

	taskList.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			const activeElement = document.activeElement;
			const taskContent = document.activeElement.closest('.list-item__value');
			const index = parseInt(activeElement.dataset.index);
			console.log('index', index);
			finishEditing(taskContent, index);
		}
	});

	const render = () => {
		taskList.innerHTML = '';
		tasks.forEach((task, index) => {
			taskList.innerHTML += `
			<li class="list-group-item mt-2 list-item">
				<div>
					<span class="list-item__value" data-index="${index}">${task}</span>
					<button class="bg-transparent border-0 edit-btn" data-index="${index}">
						<img src="img/pencil.svg" alt="редактировать" />
					</button>
					<button class="bg-transparent border-0 delete-btn" data-index="${index}">
						<img src="img/trash.svg" alt="удалить" />
					</button>
				</div>
			</li>
		`;
		});
	};

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
			resetEdit();
		}
	});
};
