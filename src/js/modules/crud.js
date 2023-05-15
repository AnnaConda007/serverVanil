export const crud = () => {
	const tasks = [];
	const taskInput = document.querySelector('.task-input');
	const addBtn = document.querySelector('.add-btn');
	const taskList = document.querySelector('.task-list');
	const listItem = document.querySelector('.list-item');

	const addTask = () => {
		let task = taskInput.value.trim();
		if (task === '') return;
		tasks.push(task);
		taskInput.value = '';
		console.log(tasks);
		render();
	};

	const render = () => {
		taskList.innerHTML = '';
		tasks.forEach((task, index) => {
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
			taskList.querySelector('.edit-btn').addEventListener('click', () => {
				const taskValue = taskList.querySelector('.list-item__value');
				if (!taskValue.classList.contains('edited')) {
					taskValue.setAttribute('contenteditable', 'true');
					taskValue.classList.add('edited');
				} else {
					taskValue.setAttribute('contenteditable', 'false');
					tasks[index] = taskValue.textContent;
					console.log(tasks);
				}
			});
		});
	};

	addBtn.addEventListener('click', (e) => {
		e.preventDefault();
		addTask();
	});
};
