const authorization = async () => {
	const currentURL = window.location.href;
	const thisPageURL = 'http://localhost:3000/login.html';
	const usersURL = 'http://localhost:3002/users';
	const startPageUrl = 'http://localhost:3000/';
	if (currentURL != thisPageURL) return;
	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');

	let AllUsers = [];

	try {
		const request = await fetch(usersURL);
		AllUsers = await request.json();
	} catch (error) {
		console.error('Произошла ошибка при выполнении запроса:', error);
	}

	const matchAuthorization = () => {
		const login = loginInput.value;
		const password = passwordInput.value;
		const error = document.querySelector('.alert-danger');
		const user = AllUsers.find((user) => user.name === login && user.password === password);
		if (user) {
			const currentTime = Math.floor(Date.now() / 1000);
			window.location.href = startPageUrl;
			error.classList.remove('visible-element');
			localStorage.setItem('login', login);
			localStorage.setItem('password', password);
			localStorage.setItem('isExpired', currentTime + 60);
			localStorage.setItem('authorized', true);
		} else {
			error.classList.add('visible-element');
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
