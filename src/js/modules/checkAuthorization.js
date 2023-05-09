const checkAuthorization = () => {
	const currentURL = window.location.href;
	const checkURL = 'http://localhost:3000/index.html';
	if (currentURL != checkURL) return;

	const clearLocal = () => {
		const currentTime = Math.floor(Date.now() / 1000);
		const isExpired = localStorage.getItem('isExpired');
		if (isExpired && isExpired <= currentTime) {
			localStorage.removeItem('login');
			localStorage.removeItem('password');
			localStorage.removeItem('isExpired');
			localStorage.removeItem('authorized');
		}
	};
	clearLocal();

	if (!localStorage.getItem('authorized')) {
		window.location.href = 'login.html';
	} else {
		const login = localStorage.getItem('login');
		document.querySelector('.userLogin').innerHTML = `${login}`;
	}
};

export default checkAuthorization;
