import { ImageSlider, DivPx } from 'components/common';
import { RoomDetail, Dialogue } from 'components/section/view-a-room';
//import { ROOMS_DATA } from 'constants/rooms-data.const';
import { Layout } from 'components/common';
import { GET, BASE } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IRoomDetail } from 'interfaces/room.interface';
import { IHostDetail } from 'interfaces/host.interface';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';


export default function ViewARoom(): JSX.Element{
  const location = useLocation();
  const keyword = location.search.substring(1);
  console.log('dasd: '+ keyword);

  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();
  const [hostDetails, setHostDetails] = useState<IHostDetail>();

  async function fetchRoom() {
    const response = await GET(ENDPOINT_URL.GET.getRoomsByID(keyword));
    if(response.status == 200){
      setRoomDetails(response.data.room);
      setHostDetails({
        _id: response.data.room.host_id,
        host_name: 'Luxury house',
      });
    }
  }
  useEffect(() => {
    fetchRoom();
  }, []);

  return(
    <Layout>
      <div className = 'bg-white rounded-lg'>
        <div className='border-b px-4 py-2'>
          <p className='font-bold text-lg'>ID @{hostDetails?._id}</p>
        </div>
        {roomDetails && roomDetails.photos && hostDetails ?(
          <div>
            <div className='py-4'>
              {roomDetails?.photos.length > 0 && (
                <ImageSlider
                  limit={3}
                  images={roomDetails?.photos.map((photo) => {
                    return { ...photo, path: BASE + photo.path };
                  })}
                />
              )}
              <DivPx size={48} />
            </div>
            <div className="w-full flex flex-col items-center lg:flex-row">       
              <div className="w-2/3 lg:w-2/5">
                <Dialogue detail={roomDetails} hostdetail= {hostDetails} />
              </div>
              <div className="w-11/12 lg:w-3/5">
                <RoomDetail detail={roomDetails}  />
              </div>
            </div> 
          </div>
        ): (
          <div>Loading</div>
        )}
        
      </div>
    </Layout>
  );
}