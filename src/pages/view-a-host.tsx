import { HostInfo } from 'components/section/view-a-host/host-info';
import HostListofRoom from 'components/section/view-a-host/list-of-rooms-table';
import { useState, useEffect } from 'react';
import { Layout } from 'components/common';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { useLocation } from 'react-router-dom';
import { DefaultListofRooms, IRoomDetail } from 'interfaces/room.interface';
import Loading from 'components/common/loading';

interface IHostInfo{
  hostID: string;
  hostname: string;
  phone_number: string;
  email: string;
  citizen_id: string;
}

export default function ViewAHost(): JSX.Element {
  const location = useLocation();
  const path = location.pathname.split('/');
  const keyword = path[path.length - 1];

  const [found, SetFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hostInfo, setHostInfo] = useState<IHostInfo>({ hostID: '', 
    hostname: '', phone_number: '', email: '', citizen_id: '' });
  const [listofrooms, setListofRooms] = useState<IRoomDetail[]>([DefaultListofRooms]);

  async function getHostData(){
    try{
      setLoading(true);
      const response = await GET(
        ENDPOINT_URL.GET.getHostsByID(keyword),
      );
      
      if(response.status == 200){
        if(response.data.valid === false || response.data.customer === null) {
          return;
        }
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
    catch (error: any){
      console.log(error.response);
      window.alert('Error in response');
    }
    finally{
      setLoading(false);
    }
  }
  async function getHostListofRooms(hostID: string){
    if(!hostID) return;
    const response = await GET(
      ENDPOINT_URL.GET.getRoomByHostID(hostID),
    );

    if(response.status == 200){
      if(response.data.valid === false) {
        return;
      }
      setListofRooms(response.data.rooms);
    }
  }

  useEffect(()=>{
    getHostData();
  }, []);
  useEffect(()=>{
    getHostListofRooms(hostInfo.hostID);
  }, [hostInfo.hostID]);

  return(
    <>
      {!loading ? 
        (<>
          {found ?
            (<Layout>
              <div className = 'bg-white rounded-lg'>
                <div className='border-b px-4 py-2'>
                  <p className='font-bold text-lg'>ID @{hostInfo?.hostID}</p>
                </div>
                <div className = "flex flex-row w-full">
                  <div className='w-1\/3 lg:w-2/5'>
                    <HostInfo host={hostInfo}></HostInfo>
                  </div>
                  <div className='w-2\/5 lg:w-3/5'>
                    <HostListofRoom list={listofrooms}></HostListofRoom>
                  </div>
                </div>
              </div>    
            </Layout>): 
            (
              <div className='h-full flex border'>
                <Layout>
                  <div className = "h-full bg-white rounded-lg">No result</div>
                </Layout>
              </div>
            )}    
        </>) : 
        (
          <Loading/>
        )
      }   
    </>
  );
}
