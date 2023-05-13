import { updateAuthorized } from './authorization.js';

const checkAuthorization = async () => {
	const pathURl = window.location.pathname;
	const thisPageURL = '/';
	const authorizationPage = '/login.html';
	const authorizedData = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization/.json';
	let authorized;
	let isExpired;
	const currentTime = Math.floor(Date.now() / 1000);

	if (pathURl != thisPageURL) return;
	setTimeout(() => {
		document.querySelector('.loading').classList.add('hidden-element');
	}, 500);

	try {
		const response = await fetch(authorizedData);
		const data = await response.json();
		authorized = data.authorized;
		isExpired = data.isExpired;
		console.log(authorized, isExpired);
	} catch (error) {
		console.error('Произошла ошибка при выполнении запроса к authorizedData :', error);
	}

	const checkLocal = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		if (isExpired && isExpired <= currentTime) {
			//	window.location.href = authorizationPage;
			console.log('время вышло');
			updateAuthorized(authorizedData, currentTime, 0, 'false');
		}
	};
	checkLocal();

	const login = localStorage.getItem('login');
	document.querySelector('.user-login').innerHTML = `${login}`;
	document.querySelector('.go-out').addEventListener('click', () => {
		updateAuthorized(authorizedData, currentTime, 0, 'false');
	});
};

export default checkAuthorization;
