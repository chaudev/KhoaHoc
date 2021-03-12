import {user_profile, URLPublic} from '../../../config/config';

export async function getCourseApi() {
  let api = URLPublic + 'get_all_course';

  var myHeader = new Headers();
  myHeader.append('Authorization', `Bearer ${user_profile.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeader,
    body: '',
    redirect: 'follow',
  };

  return (await fetch(api, requestOptions)).json();
}
