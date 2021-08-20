import Input from 'components/common/input/input';
import {
  Icon,
  envelopeOutline,
  userSolid,
  phoneOutline,
  contactSolid,
} from 'utils/icon.utils';

import './host-info.css';

interface IHostInfo{
  hostID: string;
  hostname: string;
  phone_number: string;
  email: string;
  citizen_id: string;
}

interface IFormInput{
  title?: string;
  host?: IHostInfo;
}

export const HostInfo: React.FC<IFormInput> = (props: IFormInput) =>{
  const {  title, host }= props;
  return(
    <div className='flex justify-center'>
      <div className='infor-component'>
        <h1 className = 'text-4xl font-bold py-4'>{host?.hostname}</h1>
        <p> @{host?.hostID}</p>
        <div className= 'py-2'>
          <Input 
            border='full' 
            type ='text' 
            placeholder = 'email'
            classname = 'py-2'
            value = {host?.email}
            icon={{ icon: <Icon icon={envelopeOutline} />, position: 'right' }}
            disable/>
        </div>

        <div className='py-2'>
          <Input 
            border='full' 
            type ='text' 
            placeholder= 'full name'
            classname = 'py-2'
            value = {host?.hostname}
            icon={{ icon: <Icon icon={userSolid} />, position: 'right' }}
            disable/> 
        </div>
    
        <div className='py-2'> 
          <Input 
            border='full' 
            type ='text' 
            placeholder = 'phone number'
            classname = 'py-2' 
            value = {host?.phone_number}
            icon={{ icon: <Icon icon={phoneOutline} />, position: 'right' }}
            disable/> 
        </div>
    
        <div className='py-2'>  
          <Input 
            border='full' 
            type ='text' 
            placeholder = 'citizen id' 
            classname = 'py-2'
            value = {host?.citizen_id}
            icon={{ icon: <Icon icon={contactSolid} />, position: 'right' }}
            disable/>
        </div>
      </div>
    </div>
  );
};