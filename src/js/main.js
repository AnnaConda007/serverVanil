import {authorization} from './modules/authorization.js';
import checkAuthorization from './modules/checkAuthorization.js';
import { crud } from './modules/crud.js';
window.addEventListener('DOMContentLoaded', () => {
	checkAuthorization();
	authorization();
	crud()
});
