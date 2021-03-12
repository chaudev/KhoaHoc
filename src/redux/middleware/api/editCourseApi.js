import {user_profile, URLPublic} from '../../../config/config';

export async function editCourseApi(
  courseId,
  courseName,
  trainer,
  startedDate,
  endedDate,
  buildingId,
  roomId,
) {
  let api = URLPublic + 'edit_course';

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var raw = JSON.stringify({
    courseId,
    courseName,
    trainer,
    startedDate,
    endedDate,
    buildingId,
    roomId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return (await fetch(api, requestOptions)).json();
}
