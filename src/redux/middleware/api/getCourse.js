apiGetAllCourse = '';
import {user_profile} from '../../../Components/config';

export async function get_Course() {
  var myHeader = new Headers();
  myHeader.append('Authorization', `Bearer ${user_profile.token}`);

  var raw = '';

  var requestOptions = {
    method: 'GET',
    headers: myHeader,
    body: raw,
    redirect: 'follow',
  };

  return (
    await fetch(
      'http://118.69.123.51:5000/fis/api/edu/get_all_course',
      requestOptions,
    )
  ).json();
}
