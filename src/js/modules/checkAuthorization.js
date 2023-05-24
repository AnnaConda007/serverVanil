import { updateAuthorized } from './authorization.js';
const checkAuthorization = async () => { 

if(!document.querySelector(".tasks-wrap"))return

	const authorizationPage = '/login.html';
	const authorizedDataURL = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization/.json';
	let isExpired;
	let userName;
	const currentTime = Math.floor(Date.now() / 1000);
 
	setTimeout(() => {
		document.querySelector('.loading').classList.add('hidden-element');
	}, 500);

	try {
		const response = await fetch(authorizedDataURL);
		const data = await response.json();
		isExpired = data.isExpired;
		userName = data.userName;
	} catch (error) {
		console.error('Произошла ошибка при выполнении запроса к authorizedDataURL :', error);
	}

	const checkData = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		if (isExpired && isExpired <= currentTime) {
			window.location.href = authorizationPage;
			console.log('время вышло');
		}
	};
	checkData();

	const login = localStorage.getItem('login');
	document.querySelector('.user-login').innerHTML = `${userName}`;
	document.querySelector('.go-out').addEventListener('click', () => {
		window.location.href = authorizationPage;
		updateAuthorized({
			authorizedDataURL: authorizedDataURL,
			currentTime: currentTime,
			isExpired: 0,
			userName: '',
		});
	});
};

export default checkAuthorization;
