import {authorization} from './modules/authorization.js';
import checkAuthorization from './modules/checkAuthorization.js';
window.addEventListener('DOMContentLoaded', () => {
	checkAuthorization();
	authorization();
});
