import {user_profile} from '../../../Components/config';

export async function getClassApi(course_id) {
  let url = `http://10.86.224.37:5001/api/edu/get_class_by_course?courseId=${course_id.course_id}`;

  var myHeader = new Headers();
  myHeader.append('Authorization', `Bearer ${user_profile.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeader,
    redirect: 'follow',
  };

  const response = await (await fetch(url, requestOptions)).json();

  return response;
}
