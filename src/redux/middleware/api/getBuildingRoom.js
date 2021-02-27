// api = "http://10.86.224.37:5001/api/edu/get_building";

import {user_profile} from '../../../Components/config';

export async function get_BuildingRoom() {

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);
  var raw = '';

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  const response = (
    await fetch(
      'http://118.69.123.51:5000/fis/api/edu/get_building',
      requestOptions,
    )
  ).json();

  // return response;
  return (
    await fetch(
      'http://118.69.123.51:5000/fis/api/edu/get_building',
      requestOptions,
    )
  ).json();
}
