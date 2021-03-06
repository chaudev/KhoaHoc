import {user_profile, URLPublic} from '../../../config/config';

export async function deleteClassApi(classId) {
  let api = URLPublic + `delete_class?classId=${classId.classId}`;

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const response = await (await fetch(api, requestOptions)).json();

  return response;
}
