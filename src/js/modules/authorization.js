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
		await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
			method: 'POST',
			body: JSON.stringify({ email, password, returnSecureToken: true }),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => {
			if (!res.ok) {
				errorText.classList.add('visible-element');
			}
		});
		const currentTime = Math.floor(Date.now() / 1000);
		await updateAuthorized({
			authorizedDataURL: authorizedDataURL,
			currentTime: currentTime,
			isExpired: 60,
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
}) => {
	const checkData = {
		isExpired: currentTime + isExpired,
	};
	await fetch(authorizedDataURL, {
		method: 'PATCH',
		body: JSON.stringify(checkData),
		headers: {
			'Content-Type': 'application/json',
		},
	}).catch((error) => {
		console.error('Error: 4444444444', error);
	});
};
