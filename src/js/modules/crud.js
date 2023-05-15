export const crud = () => {
	const tasks = [];
	const taskInput = document.querySelector('.task-input');
	const addBtn = document.querySelector('.add-btn');
	const taskList = document.querySelector('.task-list');

	const addTask = () => {
		let task = taskInput.value.trim();
		if (task === '') return;
		tasks.push(task);
		taskInput.value = '';
		console.log(tasks);
		render();
	};

	const resetEdit = () => {
		const AlltaskContent = document.querySelectorAll('.list-item__value');
		AlltaskContent.forEach((content) => {
			content.classList.remove('edited');
		});
	};

	const editTask = (e, index) => {
		const taskWrap = e.target.closest('.list-item');
		const taskContent = taskWrap.querySelector('.list-item__value');
		if (!taskContent.classList.contains('edited')) {
			resetEdit();
			taskContent.setAttribute('contenteditable', 'true');
			taskContent.classList.add('edited');
			taskContent.focus();
		} else {
			taskContent.setAttribute('contenteditable', 'false');
			taskContent.classList.remove('edited');
			tasks[index] = taskContent.textContent;
			console.log(tasks);
		}
	};

	const handleClick = (elem, triger, eventType) => {
		elem.querySelectorAll(triger).forEach((btn, index) => {
			btn.addEventListener(eventType, (e) => {
				editTask(e, index);
			});
		});
	};
	const handleKeydown = (elem, triger, eventType, eCode) => {
		elem.querySelectorAll(triger).forEach((btn, index) => {
			btn.addEventListener(eventType, (e) => {
				if (e.code === eCode) {
					editTask(e, index);
				}
			});
		});
	};

	const render = () => {
		taskList.innerHTML = '';
		tasks.forEach((task) => {
			taskList.innerHTML += `
				<li class="list-group-item mt-2 list-item">
					<div>
						<span class="list-item__value">${task}</span>
						<button class="bg-transparent border-0 edit-btn">
							<img src="img/pencil.svg" alt="" />
						</button>
						<button class="bg-transparent border-0 delete-btn">
							<img src="img/trash.svg" alt="" />
						</button>
					</div>
				</li>
			`;
		});
		handleClick(taskList, '.edit-btn', 'click', false);
		handleKeydown(document, '.list-item__value', 'keydown', 'Enter');
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
