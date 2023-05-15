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
		} else {
			taskContent.setAttribute('contenteditable', 'false');
			taskContent.classList.remove('edited');
			tasks[index] = taskContent.textContent;
			console.log(tasks);
		}
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
		taskList.querySelectorAll('.edit-btn').forEach((btn, index) => {
			btn.addEventListener('click', (e) => {
				editTask(e, index);
			});
		});
	};

	addBtn.addEventListener('click', (e) => {
		e.preventDefault();
		addTask();
	});

	window.addEventListener('keydown', (e) => {
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
