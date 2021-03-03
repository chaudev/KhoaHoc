api = 'http://10.86.224.37:5001/api/';

export function postLogin(user, pass) {
  return fetch(api + 'login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: 'username=' + user + '&password=' + pass,
  }).then((response) => {
    return response.json();
  });
}
