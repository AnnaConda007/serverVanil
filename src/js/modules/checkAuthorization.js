const checkAuthorization = () => {
	const currentURL = window.location.href;
	const thisPageURL = 'http://localhost:3000/';
	const authorizationPage = '/login.html';
	if (currentURL != thisPageURL) return;
	setTimeout(() => {
		document.querySelector('.loading').classList.add('hidden-element');
	}, 0);
	const clearLocal = () => {
		localStorage.removeItem('login');
		localStorage.removeItem('password');
		localStorage.removeItem('isExpired');
		localStorage.removeItem('authorized');
		window.location.href = authorizationPage;
	};
	const checkLocal = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		const isExpired = localStorage.getItem('isExpired');
		if (isExpired && isExpired <= currentTime) {
			clearLocal();
		}
	};
	checkLocal();

	if (!localStorage.getItem('authorized')) {
		window.location.href = authorizationPage;
	}

	const login = localStorage.getItem('login');
	document.querySelector('.user-login').innerHTML = `${login}`;
	document.querySelector('.go-out').addEventListener('click', () => {
		clearLocal();
	});
};

export default checkAuthorization;
