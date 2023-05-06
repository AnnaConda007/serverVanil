const authorization = async () => {
	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');
	const currentTime = Math.floor(Date.now() / 1000);
	let loginFromStorage = false;

	const usersURL = 'http://localhost:3002/users';
	const request = await fetch(usersURL);
	const usersData = await request.json();

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
				localStorage.setItem('login', login);
				localStorage.setItem('password', password);

				localStorage.setItem('isExpired', currentTime + 40);
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

	const clearLocal = () => {
		const isExpired = localStorage.getItem('isExpired');
		if (isExpired && isExpired <= currentTime) {
			localStorage.removeItem('login');
			localStorage.removeItem('password');
			localStorage.removeItem('isExpired');
		}
	};

	const autocomplete = () => {
		if (!loginFromStorage) {
			clearLocal();
			const usedLogin = localStorage.getItem('login');
			const usedPassword = localStorage.getItem('password');
			loginInput.value = usedLogin;
			passwordInput.value = usedPassword;
		}
	};
	loginInput.addEventListener('click', autocomplete);
	loginInput.addEventListener('input', () => {
		if (loginInput.value === '' && !loginFromStorage) {
			passwordInput.value = '';
			loginFromStorage = true;
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
