import {user_profile} from '../../../Components/config';

export async function editCourseApi(
  courseId,
  courseName,
  trainer,
  startedDate,
  endedDate,
  buildingId,
  roomId,
) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var raw = JSON.stringify({
    courseId: courseId,
    courseName: courseName,
    trainer: trainer,
    startedDate: startedDate,
    endedDate: endedDate,
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
    await fetch('http://10.86.224.37:5001/api/edu/edit_course', requestOptions)
  ).json();
}
