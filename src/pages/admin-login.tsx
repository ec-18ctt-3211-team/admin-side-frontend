import { Form }  from 'components/common/form/Form';
import { useHistory } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { IUserInfo } from 'interfaces/user.interface';
import { useState } from 'react';
import { ENDPOINT_URL } from 'constants/api.const';
import { BASE, POST } from 'utils/fetcher.utils';
import Loading from 'components/common/loading';


export default function AdminLogin(){
  const [userInfo, setUserInfo] = useState<IUserInfo>({ userID: '', username: '', phone_number: '', email: '', password: '' });
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  function LoadPage(){
    history.push({
      pathname: SITE_PAGES.VIEW_A_ROOM.path,
      search: '',  
      state: { 
        update: true, 
      },
    });
  }

  async function login() {
    if (!userInfo.password) {
      window.alert('Please enter your password.');
      return;
    }
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
      isAdmin: true,
    };
    try{
      setLoading(true);
      const response = await POST(ENDPOINT_URL.POST.login, payload);
      //console.log(response);
      if (response.data.valid) {
        setLoading(false);
        localStorage.setItem('userID', response.data.userId);
        localStorage.setItem('auth-token', response.headers['auth-token']);
        
        setUserInfo({
          ...userInfo,
          userID: response.data.userID,
          username: response.data.name,
          ava: BASE + response.data.ava,
        });
        LoadPage();
      }
    }
    catch (error: any){
      window.alert('Log in unsucccessful');
    }
    finally{
      setLoading(false);
    }
  }
  
  return(
    <>
      {!loading ?(
        <Form 
          type='AdminLogIn' 
          title='Log In' 
          userInfo = {userInfo}
          setUserInfo = {setUserInfo}
          onClick={login}/>
      ):(
        <Loading />
      )}      
    </>
  );
}