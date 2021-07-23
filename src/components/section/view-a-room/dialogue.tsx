import { SITE_PAGES } from 'constants/pages.const';
import { useEffect, useState, useRef } from 'react';
import { IRoomDetail } from 'interfaces/room.interface';
import './dialogue.css';
import { IHostDetail } from 'interfaces/host.interface';

interface Props {
  detail: IRoomDetail;
  hostdetail: IHostDetail;
}

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function Dialogue(props: Props): JSX.Element {
  const [total, setTotal] = useState(props.detail.normal_price);
  const [dayStart, setStart] = useState<Date>(today);
  const [dayEnd, setEnd] = useState<Date>(tomorrow);

  useEffect(() => {
    const start = dayStart.getTime();
    const end = dayEnd.getTime();
    if (end - start < 0) return;
    setTotal(props.detail.normal_price * Math.round((end - start) / 86400000));
  }, [dayStart, dayEnd]);

  return (
    <div className="border rounded-md w-full flex flex-col items-center px-2 py-2 ml-1.5">
      <div className="w-full flex justify-center my-1">{props.hostdetail.host_name}</div>
      <div className="w-full flex justify-center my-1">{props.hostdetail._id}</div>
      <div className="w-full flex flex-row my-1">
        <div>{props.detail.room_type}</div>
        <div className='ml'>{props.detail.total_bedrooms} bedrooms</div>
      </div>
      <div className="w-full flex justify-center my-2">${props.detail.normal_price} per NIGHT</div>
    </div>
  );
}