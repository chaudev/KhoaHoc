import {user_profile, URLPublic} from '../../../config/config';

export async function deleteCourseApi(course_id) {
  let api = URLPublic + `delete_course?courseId=${course_id.course_id}`;

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
