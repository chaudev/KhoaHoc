import {user_profile} from '../../../Components/config';

export async function editClassApi(
  classId,
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
    classId,
    className,
    trainer,
    date,
    startedTime,
    endedTime,
    buildingId,
    roomId,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return (
    await fetch(
      'http://118.69.123.51:5000/fis/api/edu/edit_class',
      requestOptions,
    )
  ).json();
}
