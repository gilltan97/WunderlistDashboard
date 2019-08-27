
const fetch = require('node-fetch');

const URL = "https://a.wunderlist.com/api/v1";

const ACCESS_TOKEN = "40530efd0e2ac124f657e9ce13fee7d5d50d34a7bc7af36b9ffd8d498178";
const CLIENT_ID = "25ce62c7cb51183a13ce";


export function getLists() {
	return new Promise((resolve, reject) => {
		fetch(`${URL}/lists`, {
			headers: {
				"X-Access-Token": ACCESS_TOKEN, 
				"X-Client-ID": CLIENT_ID
			}
		}).then((response) => {
			if (response.status !== 200) {
				reject(Error(`There seems be some problem. Response code: ${response.status}`));
			}

			response.json().then((data) => {
				resolve(data);
			})
		}).catch((error) => {
			reject(error);
		})
	});
}

export function getTasks(listId, completed) {
	completed = completed || true;
	return new Promise((resolve, reject) => {
		fetch(`${URL}/tasks?list_id=${listId}&completed=${completed}`, {
			headers: {
				"X-Access-Token": ACCESS_TOKEN, 
				"X-Client-ID": CLIENT_ID
			}
		}).then((response) => {
			if (response.status !== 200) {
				reject(Error(`There seems be some problem. Response code: ${response.status}`));
			}

			response.json().then((data) => {
				resolve(data);
			})
		}).catch((error) => {
			reject(error);
		})
	});
}
