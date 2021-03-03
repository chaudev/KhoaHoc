import {user_profile} from '../../../Components/config';

export async function postClassApi(
  courseId,
  className,
  trainer,
  date,
  startedTime,
  endedTime,
  buildingId,
  roomId,
) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var raw = JSON.stringify({
    courseId: courseId,
    className: className,
    trainer: trainer,
    date: date,
    startedTime: startedTime,
    endedTime: endedTime,
    buildingId: buildingId,
    roomId: roomId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return (
    await fetch(
      'http://10.86.224.37:5001/api/edu/create_new_class',
      requestOptions,
    )
  ).json();
}
