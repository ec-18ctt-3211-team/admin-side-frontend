import Input from 'components/common/input/input';
import { Button } from 'components/common';
import {
  Icon,
  envelopeOutline,
  userSolid,
  phoneOutline,
  passwordOutline,
} from 'utils/icon.utils';

import './Form.css';

interface IFormInput{
  type: 'SignUp'| 'LogIn' ;
  title?: string;
}

export const Form: React.FC<IFormInput> = (props: IFormInput) =>{
  const { type, title }= props;
  return(
    <div className='flex justify-center'>
      <div className='login-component'>
        {type === 'SignUp' && <h1 className = 'text-4xl font-bold py-4'>{title}</h1>}
        {type === 'LogIn' && <h1 className = 'text-4xl font-bold py-4'>{title}</h1>}
        <div className= 'py-2 h-full'>
          <Input 
            border='full' 
            type ='text' 
            placeholder = 'email'
            classname = 'py-2'
            icon={{ icon: <Icon icon={envelopeOutline} />, position: 'right' }}/>
        </div>

        {type === 'SignUp' && 
          <div className='py-2 h-full'>
            <Input 
              border='full' 
              type ='text' 
              placeholder= 'full name'
              classname = 'py-2'
              icon={{ icon: <Icon icon={userSolid} />, position: 'right' }}/> 
          </div>}
       
        {type === 'SignUp' && 
          <div className='py-2 h-full'> 
            <Input 
              border='full' 
              type ='text' 
              placeholder = 'phone number'
              classname = 'py-2' 
              icon={{ icon: <Icon icon={phoneOutline} />, position: 'right' }}/> 
          </div>}     

        <div className='py-2 h-full'> 
          <Input 
            border='full' 
            type ='password' 
            placeholder = 'password' 
            classname = 'py-2'
            icon={{ icon: <Icon icon={passwordOutline} />, position: 'right' }}/>
        </div>
        
        {type === 'SignUp' && 
          <div className='py-2 h-full'>  
            <Input 
              border='full' 
              type ='password' 
              placeholder = 'confirm password' 
              classname = 'py-2'
              icon={{ icon: <Icon icon={passwordOutline} />, position: 'right' }}/>
          </div>}
        
        <div className='w-full flex justify-center py-4'>
          {type === 'SignUp' && <Button children ='Sign Up' className="py-2 w-2/3 h-full"></Button>}
          {type === 'LogIn'  && <Button children ='Log In' className="py-2 w-2/3 h-full"></Button>}
        </div>
        {type === 'LogIn'  && <p className ='italic my-4'>or</p>}
        {type === 'LogIn'  && <p className='italic' id='p-link'>create a new account</p>}
      </div>
    </div>
  );
};
