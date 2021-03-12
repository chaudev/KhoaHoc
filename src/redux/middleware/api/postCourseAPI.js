import {user_profile, URLPublic} from '../../../config/config';

export async function postCourseAPI(
  courseName,
  trainer,
  startedDate,
  endedDate,
  buildingId,
  roomId,
) {
  let api = URLPublic + 'create_new_course';

  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var raw = JSON.stringify({
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
