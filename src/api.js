const fetch = require('node-fetch');

const API_URL = 'https://a.wunderlist.com/api/v1';
const AUTH_URL = 'https://www.wunderlist.com/oauth/access_token';

export function getAccessToken(jsonData) {
  return new Promise((resolve, reject) => {
    /* TODO: Change this when deploying the app */
    fetch(`https://cors-anywhere.herokuapp.com/${AUTH_URL}`, {
      method: 'post',
      body: JSON.stringify({
        client_id: jsonData.clientId,
        client_secret: jsonData.clientSecret, 
        code: jsonData.code
      }), 
      headers: { 
        'Content-Type': 'application/json'
      }
    
    }).then((response) => {
      if (response.status !== 200) {
        reject(Error(`There seems be some problem. Response code: ${response.status}`));
      }
      response.json().then((data) => {
        resolve(data);
      });
    }).catch((error) => {
      reject(error);
    })
  });
}

export function getLists(auth) {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/lists`, {
      headers: {
        'X-Access-Token': auth.accessToken,
        'X-Client-ID': auth.clientId,
      },
    }).then((response) => {
      if (response.status !== 200) {
        reject(Error(`There seems be some problem. Response code: ${response.status}`));
      }

      response.json().then((data) => {
        resolve(data);
      });
    }).catch((error) => {
      reject(error);
    });
  });
}

export function getTasks(auth, listId, completed) {
  let isCompleted = completed || true;
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/tasks?list_id=${listId}&completed=${isCompleted}`, {
      headers: {
        'X-Access-Token': auth.accessToken,
        'X-Client-ID': auth.clientId,
      },
    }).then((response) => {
      if (response.status !== 200) {
        reject(Error(`There seems be some problem. Response code: ${response.status}`));
      }

      response.json().then((data) => {
        resolve(data);
      });
    }).catch((error) => {
      reject(error);
    });
  });
}
