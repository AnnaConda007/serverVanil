const authorization = async () => {
	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');
	const currentTime = Math.floor(Date.now() / 1000);
	let needAutocomplete = true;
	let AllUsers = [];

	try {
		const usersURL = 'http://localhost:3002/users';
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
			window.location.href = 'success.html';
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

	const clearLocal = () => {
		const isExpired = localStorage.getItem('isExpired');
		if (isExpired && isExpired <= currentTime) {
			localStorage.removeItem('login');
			localStorage.removeItem('password');
			localStorage.removeItem('isExpired');
			localStorage.removeItem('authorized');
		}
	};
	clearLocal();

	const autocomplete = () => {
		if (needAutocomplete && localStorage.getItem('authorized')) {
			const usedLogin = localStorage.getItem('login');
			const usedPassword = localStorage.getItem('password');
			loginInput.value = usedLogin;
			passwordInput.value = usedPassword;
		}
	};
	loginInput.addEventListener('click', autocomplete);
	loginInput.addEventListener('input', () => {
		if (needAutocomplete && loginInput.value !== localStorage.getItem('login')) {
			passwordInput.value = '';
			needAutocomplete = false;
		}
	});

	passwordInput.addEventListener('focus', () => {
		passwordInput.setAttribute('type', 'text');
	});
	passwordInput.addEventListener('blur', () => {
		passwordInput.setAttribute('type', 'password');
	});
};

export default authorization;
