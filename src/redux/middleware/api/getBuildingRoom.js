import {user_profile, URLPublic} from '../../../config/config';

export async function getBuildingRoomApi() {
  let api = URLPublic + 'get_building';
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
