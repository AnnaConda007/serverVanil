export const authorization = async () => {
	const authorizedData = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization.json';
	const pathURl = window.location.pathname;
	const thisPageURL = '/login.html';
	const startPageUrl = '/';
	const currentTime = Math.floor(Date.now() / 1000);
	if (thisPageURL != pathURl) return;

	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');
	let AllUsers = [];

	try {
		const response = await fetch(authorizedData);
		AllUsers = await response.json();
	} catch (error) {
		console.error('Произошла ошибка при выполнении запроса:', error);
	}
	/*1@mail.ru */
	const authorizationResponse = (email, password) => {
		const errorText = document.querySelector('.alert-danger');
		const apiKey = 'AIzaSyB4c4RDOCAaTXro1HTbNH857drwGWX-K20';
		fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
			method: 'POST',
			body: JSON.stringify({ email, password, returnSecureToken: true }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(() => {
				//window.location.href = startPageUrl;
				updateAuthorized(authorizedData, currentTime, 160, 'true');
			})
			.catch((error) => {
				console.error('Error:', error);
				errorText.classList.add('visible-element');
			});
	};
	const matchAuthorization = () => {
		const login = loginInput.value;
		const password = passwordInput.value;
		authorizationResponse(login, password);
	};

	btn.addEventListener('click', matchAuthorization);
	window.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			matchAuthorization();
		}
	});
};

export const updateAuthorized = (authorizedData, currentTime, isExpired, authorized) => {
	const checkData = {
		isExpired: currentTime + isExpired,
		authorized: authorized,
	};
	fetch(authorizedData, {
		method: 'PATCH',
		body: JSON.stringify(checkData),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => response.json())
		.then((response) => {
			if (response.error) {
				throw new Error(response.error.message);
			}
			console.log(response);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
};
