export const crud = async () => {
	const pathURl = window.location.pathname;
	const thisPageURL = '/';
	if (pathURl != thisPageURL) return;
	const taskInput = document.querySelector('.task-input');
	const addBtn = document.querySelector('.add-btn');
	const taskList = document.querySelector('.task-list');
	let tasks = [];

	const pullTask = async () => {
		const res = await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/tasks.json');
		const resJson = await res.json();
		console.log('resJson', resJson);
		tasks = resJson ? resJson : tasks;
		console.log('tasks', tasks);
		render();
	};
	pullTask();

	const pushTasks = async () => {
		await fetch('https://bsh-app-3e342-default-rtdb.firebaseio.com/tasks.json', {
			method: 'PUT',
			body: JSON.stringify(tasks),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		await pullTask();
		render();
	};

	const addTask = () => {
		let task = taskInput.value.trim();
		if (task === '') return;
		tasks.push(task);
		taskInput.value = '';
		pushTasks();
	};

	const editTask = (taskContent) => {
		resetEdit();
		taskContent.setAttribute('contenteditable', 'true');
		taskContent.classList.add('edited');
		taskContent.focus();
	};

	const resetEdit = () => {
		const AlltaskContent = taskList.querySelectorAll('.list-item__value');
		AlltaskContent.forEach((content) => {
			content.classList.remove('edited');
		});
	};

	const finishEditing = (taskContent, index) => {
		taskContent.setAttribute('contenteditable', 'false');
		taskContent.classList.remove('edited');
		tasks[index] = taskContent.textContent;
		pushTasks();
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
			editTask(taskContent);
		} else {
			finishEditing(taskContent, index);
		}
	};

	const deleteTask = (index) => {
		tasks.splice(index, 1);
		pushTasks();
	};

	const handlDelit = (e) => {
		const target = e.target;
		const deleteButton = target.closest('.delete-btn');
		if (deleteButton) {
			const index = parseInt(deleteButton.dataset.index);
			deleteTask(index);
		}
	};

	const render = () => {
		taskList.innerHTML = '';
		tasks.forEach((task, index) => {
			taskList.innerHTML += `
   <li class="list-group-item mt-2 list-item">
	<div class="d-flex justify-content-between">
		<span class="list-item__value" data-index="${index}">${task}</span>
		<div class="k">
			<button class="bg-transparent border-0 edit-btn" data-index="${index}">
				<img src="img/pencil.svg" alt="редактировать" />
			</button>
			<button class="bg-transparent border-0 delete-btn" data-index="${index}">
				<img src="img/trash.svg" alt="удалить" />
			</button>
		</div>
	</div>
</li>
    `;
		});
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
			finishEditing(taskContent, index);
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
			resetEdit();
		}
	});
};
