import { HostInfo } from 'components/section/view-a-host/host-info';
import HostListofRoom from 'components/section/view-a-host/list-of-rooms-table';
import { useState, useEffect } from 'react';
import { Layout } from 'components/common';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const keyword = location.search.substring(1);

  const [found, SetFound] = useState(false);
  const [hostInfo, setHostInfo] = useState<IHostInfo>();
  async function getData(){
    const response = await GET(
      ENDPOINT_URL.GET.getHostsByID(keyword),
    );
    
    if(response.status == 200){
      if(response.data.customer === null) return;
      SetFound(true);
      setHostInfo({ ...hostInfo, 
        hostID: response.data.customer._id, 
        hostname: response.data.customer.name,
        phone_number: response.data.customer.phone,
        email: response.data.customer.email,
        citizen_id: response.data.customer.ci
      });
    }
  }

  useEffect(()=>{
    getData();
  }, [hostInfo]);

  return(
    <>
      {found ?
        (<Layout
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
        </Layout>): 
        (
          <div className='h-full flex border'>
            <Layout
              isAuthorized={props.isAuthorized}
              setAuthorized={props.setAuthorized}>
              <div className = "h-full bg-white rounded-lg">No result</div>
            </Layout>
          </div>
        )}    
    </>
  );
}
