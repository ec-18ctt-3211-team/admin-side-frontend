import { ImageSlider, DivPx } from 'components/common';
import { RoomDetail, Dialogue } from 'components/section/view-a-room';
import { ROOMS } from 'constants/images.const';
import { ROOMS_DATA } from 'constants/rooms-data.const';
import { Layout } from 'components/common';

interface IHostID{
  host_id: string;
}
interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function ViewARoom(id: IHostID , props: Props): JSX.Element{
  return(
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}>
      <div className = 'bg-white rounded-lg'>
        <div className='border-b px-4 py-2'>
          <p className='font-bold text-lg'>ID @{id.host_id}</p>
        </div>
        <div className='py-4'>
          <ImageSlider limit={3} images={ROOMS} />
          <DivPx size={48} />
        </div>
        <div className="w-full flex flex-col items-center lg:flex-row">       
          <div className="w-2/3 lg:w-2/5">
            <Dialogue detail={ROOMS_DATA[0]} hostid='@123456' />
          </div>
          <div className="w-11/12 lg:w-3/5">
            <RoomDetail detail={ROOMS_DATA[0]} />
          </div>
        </div> 
      </div>
    </Layout>
  );
}