export const render = (taskList, tasks) => {
	taskList.innerHTML = '';
	tasks.forEach((task, index) => {
		taskList.innerHTML += `
   <li class="list-group-item mt-2 list-item">
	<div class="d-flex justify-content-between ">
		<span class="list-item__value" data-index="${index}">${task}</span>
		<div>
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
