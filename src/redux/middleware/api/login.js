import {LoginURL} from '../../../config/config';

export async function postLogin(user, pass) {
  let api = LoginURL + 'login';
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  let raw = 'username=' + user + '&password=' + pass;

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return (await fetch(api, requestOptions)).json();
}
