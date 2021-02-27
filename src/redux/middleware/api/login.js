api = 'http://118.69.123.51:5000/fis/api/';

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
