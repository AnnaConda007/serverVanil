const authorization = async () => {
	const usersURL = 'http://localhost:3002/users';
	const request = await fetch(usersURL);
	const usersData = await request.json();
	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');

	const matchAuthorization = () => {
		let match;
		const login = loginInput.value;
		const password = passwordInput.value;
		const error = document.querySelector('.alert-danger');
		for (const user of usersData) {
			match = user.name !== login || user.password !== password ? false : true;
			if (match) {
				window.location.href = 'success.html';
				error.classList.remove('visible-element');
				break;
			} else {
				error.classList.add('visible-element');
			}
		}
	};

	btn.addEventListener('click', matchAuthorization);
	window.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			matchAuthorization();
		}
	});
};
export default authorization;
