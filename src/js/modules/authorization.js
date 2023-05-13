export const authorization = () => {
	const authorizedDataURL = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization/.json';
	const pathURl = window.location.pathname;
	const thisPageURL = '/login.html';
	const startPageUrl = '/';
	if (thisPageURL != pathURl) return;

	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');

	/*1@mail.ru */
	const authorizationResponse = async (email, password) => {
		const errorText = document.querySelector('.alert-danger');
		const apiKey = 'AIzaSyB4c4RDOCAaTXro1HTbNH857drwGWX-K20';
		try {
			const response = await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
				{
					method: 'POST',
					body: JSON.stringify({ email, password, returnSecureToken: true }),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (!response.ok) {
				errorText.classList.add('visible-element');
				throw new Error('Authorization failed');
			}
		} catch (error) {
			console.log(error, 'Ошибка при авторизации');
			throw error;
		}
		const currentTime = Math.floor(Date.now() / 1000);
		await updateAuthorized({
			authorizedDataURL: authorizedDataURL,
			currentTime: currentTime,
			isExpired: 60,
			userName: loginInput.value,
		});
	};

	const matchAuthorization = async () => {
		const email = loginInput.value;
		const password = passwordInput.value;
		await authorizationResponse(email, password);
		window.location.href = startPageUrl;
	};

	btn.addEventListener('click', matchAuthorization);
	window.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			matchAuthorization();
		}
	});
};

export const updateAuthorized = async ({
	authorizedDataURL: authorizedDataURL,
	currentTime: currentTime,
	isExpired: isExpired,
	userName: userName,
}) => {
	const checkData = {
		isExpired: currentTime + isExpired,
		userName: userName,
	};
	try {
		await fetch(authorizedDataURL, {
			method: 'PATCH',
			body: JSON.stringify(checkData),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.log(error, 'Ошибка при запросе о времени авторизации');
		throw error;
	}
};
