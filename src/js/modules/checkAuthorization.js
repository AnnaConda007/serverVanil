const checkAuthorization = () => {
	const pathURl = window.location.pathname;
	const thisPageURL = '/';
	const authorizationPage = '/login.html';
	if (pathURl != thisPageURL) return;

	setTimeout(() => {
		document.querySelector('.loading').classList.add('hidden-element');
	}, 500);
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
