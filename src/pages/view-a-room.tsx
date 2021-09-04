import { Layout, Button, Input } from 'components/common';
import { Icon, Solid } from 'utils/icon.utils';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IRoomDetail } from 'interfaces/room.interface';
import UploadImage from 'components/common/image-uploader/image-uploader';
import { IImageTag } from 'interfaces/image-tag.interface';
import Loading from 'components/common/loading';

export default function ViewARoom(): JSX.Element {
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();
  const [loading, setLoading] = useState(false);

  async function fetchRoom() {
    const path = location.pathname.split('/');
    const roomID = path[path.length - 1];
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getRoomsByID(roomID));
      if (response.data.valid) {
        setRoomDetails(response.data.room);
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <Layout>
      {roomDetails && !loading ? (
        <div className="flex h-full w-full">
          <div className="h-full w-2/5 p-4 bg-white flex flex-col rounded-lg">
            <div className="my-4 mx-2 text-center font-bold uppercase text-lg">
              {roomDetails.title}
            </div>
            <div className="px-4 py-2 text-center">
              {roomDetails.max_guest} guest(s)
            </div>
            <div className="px-4 py-2 flex justify-between">
              <strong>Normal price:</strong>
              <div>{roomDetails.normal_price}$</div>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <strong>Weekend price:</strong>
              <div>{roomDetails.weekend_price}$</div>
            </div>
            <div className="px-4 py-2 font-bold uppercase">Address</div>
            <div className="px-4 py-2 flex justify-between">
              <strong>Number:</strong>
              <div>{roomDetails.address.number}</div>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <strong>Street:</strong>
              <div>{roomDetails.address.street}</div>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <strong>Ward:</strong>
              <div>{roomDetails.address.ward}</div>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <strong>District:</strong>
              <div>{roomDetails.address.district}</div>
            </div>
            <div className="px-4 py-2 flex justify-between">
              <strong>City:</strong>
              <div>{roomDetails.address.city}</div>
            </div>
            <div className="h-full w-full border rounded p-2 my-4">
              {roomDetails.description}
            </div>
          </div>
          <div className="h-full w-full ml-4 p-4 bg-white flex rounded-lg flex-wrap">
            <div className="w-1/2 h-1/2 p-2">
              <UploadImage
                image={roomDetails.photos ? roomDetails.photos[0] : null}
                setImage={() => console.log('Disabled image')}
                disable
              />
            </div>
            <div className="w-1/2 h-1/2 p-2">
              <UploadImage
                image={roomDetails.photos ? roomDetails.photos[1] : null}
                setImage={() => console.log('Disabled image')}
                disable
              />
            </div>
            <div className="w-1/2 h-1/2 p-2">
              <UploadImage
                image={roomDetails.photos ? roomDetails.photos[2] : null}
                setImage={() => console.log('Disabled image')}
                disable
              />
            </div>
            <div className="w-1/2 h-1/2 p-2">
              <UploadImage
                image={roomDetails.photos ? roomDetails.photos[3] : null}
                setImage={() => console.log('Disabled image')}
                disable
              />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
