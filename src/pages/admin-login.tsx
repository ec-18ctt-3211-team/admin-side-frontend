import { Form }  from 'components/common/form/Form';
import { useHistory } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { IUserInfo } from 'interfaces/user.interface';
import { useEffect, useState } from 'react';
import { ENDPOINT_URL } from 'constants/api.const';
import { BASE, POST } from 'utils/fetcher.utils';


export default function AdminLogin(){
  const [userInfo, setUserInfo] = useState<IUserInfo>({ userID: '', username: '', phone_number: '', email: '', password: '' });
  const history = useHistory();

  async function login() {
    console.log('email:' + userInfo.email);
    console.log('password:' + userInfo.password);
    if (!userInfo.password) return;
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
      isAdmin: true,
    };

    const response = await POST(ENDPOINT_URL.POST.login, payload);
    if (response.data.valid) {
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      localStorage.setItem('userID', response.data.userID);
      setUserInfo({
        ...userInfo,
        userID: response.data.userID,
        username: response.data.name,
        ava: BASE + response.data.ava,
      });
      checkAuthorized();
    } else console.log('A: '+ response.data.message);
  }
  
  /*
  const LogIn = () =>{
    console.log('email1:' + userInfo.email);
    console.log('password1:' + userInfo.password);
    history.push({
      pathname: SITE_PAGES.VIEW_A_ROOM.path,
      search: '',  
      state: { 
        update: true, 
      },
    });
  };*/
  function checkAuthorized(){
    console.log('Check Author');
    const token = localStorage.getItem('token');
    if (token) {
      history.push({
        pathname: SITE_PAGES.VIEW_A_ROOM.path,
        search: '',  
        state: { 
          update: true, 
        },
      });
      return true;
    } else return false;
  }
  useEffect(() => {
    checkAuthorized();
  }, [localStorage]);
  return(
    <>
      <Form 
        type='AdminLogIn' 
        title='Log In' 
        userInfo = {userInfo}
        setUserInfo = {setUserInfo}
        onClick={login}/>
    </>
  );
}