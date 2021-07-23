import { HostInfo } from 'components/section/view-a-host/host-info';
import HostListofRoom from 'components/section/view-a-host/list-of-rooms-table';
import { useState, useEffect } from 'react';
import { Layout } from 'components/common';
import axios from 'axios';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}
interface IHostInfo{
  hostID: string;
  hostname: string;
  phone_number: string;
  email: string;
  citizen_id: string;
}

export default function ViewAHost(props: Props): JSX.Element {
  const [hostInfo, setHostInfo] = useState<IHostInfo>();
  async function getData(){
    const response = await GET(
      ENDPOINT_URL.GET.getHostsByID(),
    );
    setHostInfo({ ...hostInfo, 
      hostID: '12347', 
      hostname: response.data.customers[0].name,
      phone_number: response.data.customers[0].phone,
      email: response.data.customers[0].email,
      citizen_id: response.data.customers[0].ci
    });
  }

  useEffect(()=>{
    getData();
  }, [hostInfo]);

  return(
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}>
      <div className = 'bg-white rounded-lg'>
        <div className='border-b px-4 py-2'>
          <p className='font-bold text-lg'>ID @{hostInfo?.hostID}</p>
        </div>
        <div className = "flex flex-row w-full">
          <div className='w-1\/3 lg:w-2/5'>
            <HostInfo host={hostInfo}></HostInfo>
          </div>
          <div className='w-2\/5 lg:w-3/5'>
            <HostListofRoom></HostListofRoom>
          </div>
        </div>
      </div>
    </Layout>
  );
}
