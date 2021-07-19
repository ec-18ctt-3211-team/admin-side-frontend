import { HostInfo } from 'components/section/view-a-host/host-info';
import HostListofRoom from 'components/section/view-a-host/list-of-rooms-table';
import { useState } from 'react';

export default function ViewACustomer(): JSX.Element {
  const [hostInfo, setHostInfo] = useState({
    hostID: '1234567',
    hostname: 'nhily',
    phone_number: '0123456789',
    email: 'nhily@gmail.com',
    citizen_id: '0123456789',
  });
  return(
    <>
      <div className='border-b px-4 py-2'>
        <p className='font-bold'>ID @{hostInfo.hostID}</p>
      </div>
      <div className = "flex flex-row w-full">
        <div className='w-1\/3 lg:w-2/5'>
          <HostInfo  host={hostInfo}></HostInfo>
        </div>
        <div className='w-2\/5 lg:w-3/5'>
          <HostListofRoom></HostListofRoom>
        </div>
      </div>
    </>
  );
}
