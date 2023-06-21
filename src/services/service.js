export const base_url =
  'https://templatebackend-3599bc73313e.herokuapp.com/api/';

//GET Function

export function GetFunction(endPoint) {
  let token = localStorage.getItem('user_token');
  return new Promise((resolve, reject) => {
    fetch(base_url + endPoint, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//POST Function

export function PostFunction(endPoint, values) {
  let token = localStorage.getItem('user_token');
  return new Promise((resolve, reject) => {
    fetch(base_url + endPoint, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => {
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
  });
}
