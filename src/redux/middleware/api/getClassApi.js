import {user_profile, URLPublic} from '../../../config/config';

export async function getClassApi(course_id) {
  let api = URLPublic + `get_class_by_course?courseId=${course_id.course_id}`;

  var myHeader = new Headers();
  myHeader.append('Authorization', `Bearer ${user_profile.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeader,
    redirect: 'follow',
  };

  return await (await fetch(api, requestOptions)).json();
}
