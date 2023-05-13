const checkAuthorization = async () => {
	const pathURl = window.location.pathname;
	const thisPageURL = '/';
	const authorizationPage = '/login.html';
	const authorizedDataURL = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/authorization/.json';
	let isExpired;
	const currentTime = Math.floor(Date.now() / 1000);

	if (pathURl != thisPageURL) return;
	setTimeout(() => {
		document.querySelector('.loading').classList.add('hidden-element');
	}, 500);

	try {
		const response = await fetch(authorizedDataURL);
		const data = await response.json();
		isExpired = data.isExpired;
	} catch (error) {
		console.error('Произошла ошибка при выполнении запроса к authorizedDataURL :', error);
	}

	const checkLocal = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		if (isExpired && isExpired <= currentTime) {
			//window.location.href = authorizationPage;
			console.log('время вышло');
		}
	};
	checkLocal();

	const login = localStorage.getItem('login');
	document.querySelector('.user-login').innerHTML = `${login}`;
	document.querySelector('.go-out').addEventListener('click', () => {
		console.log('выйти');
		updateAuthorized({
			authorizedDataURL: authorizedDataURL,
			currentTime: currentTime,
			isExpired: 0,
		});
	});
};

export default checkAuthorization;
