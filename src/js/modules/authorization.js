const authorization = async () => {
	const usersURL = 'https://bsh-app-3e342-default-rtdb.firebaseio.com/.json';
	const pathURl = window.location.pathname;
	const thisPageURL = '/login.html';
	const startPageUrl = '/';
	if (thisPageURL != pathURl) return;

	const btn = document.querySelector('.btn-authorization');
	const loginInput = document.querySelector('#login');
	const passwordInput = document.querySelector('#password');
	let AllUsers = [];

	try {
		const response = await fetch(usersURL);
		AllUsers = await response.json();
	} catch (error) {
		console.error('Произошла ошибка при выполнении запроса:', error);
	}
	const authorizationfunc = (email, password) => {
		const apiKey = 'AIzaSyB4c4RDOCAaTXro1HTbNH857drwGWX-K20';
		fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
			method: 'POST',
			body: JSON.stringify({ email, password, returnSecureToken: true }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => console.log(res))
			.catch((error) => console.error('Error:', error));
	};
	const matchAuthorization = () => {
		const login = loginInput.value;
		const password = passwordInput.value;
		const error = document.querySelector('.alert-danger');

		authorizationfunc(login, password);
		window.location.href = startPageUrl;
	};

	btn.addEventListener('click', matchAuthorization);
	window.addEventListener('keydown', (e) => {
		if (e.code === 'Enter') {
			matchAuthorization();
		}
	});
};
export default authorization;
