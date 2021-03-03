import {user_profile} from '../../../Components/config';

export async function deleteClassApi(classId) {
  let urlpublic = `http://118.69.123.51:5000/fis/api/edu/delete_class?classId=${classId.classId}`;
  let url = `http://10.86.224.37:5001/api/edu/delete_class?classId=${classId.classId}`;

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${user_profile.token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders, 
    redirect: 'follow',
  };

  const response = await (await fetch(url, requestOptions)).json();

  return response;
}
