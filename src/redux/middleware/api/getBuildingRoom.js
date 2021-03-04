import {user_profile, URL} from '../../../config/config';

export async function getBuildingRoomApi() {
  let api = URL + 'get_building';
  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: '',
    redirect: 'follow',
  };

  return (await fetch(api, requestOptions)).json();
}
