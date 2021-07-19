import { SITE_PAGES } from 'constants/pages.const';
import { useEffect, useState, useRef } from 'react';
import { IRoomDetail } from 'interfaces/room.interface';
import './dialogue.css';

interface Props {
  detail: IRoomDetail;
  hostid: string;
}

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function Dialogue(props: Props): JSX.Element {
  const [total, setTotal] = useState(props.detail.price);
  const [dayStart, setStart] = useState<Date>(today);
  const [dayEnd, setEnd] = useState<Date>(tomorrow);

  useEffect(() => {
    const start = dayStart.getTime();
    const end = dayEnd.getTime();
    if (end - start < 0) return;
    setTotal(props.detail.price * Math.round((end - start) / 86400000));
  }, [dayStart, dayEnd]);

  return (
    <div className="border rounded-md w-full flex flex-col items-center px-2 py-2 ml-1.5">
      <div className="w-full flex justify-center my-1">{props.detail.host}</div>
      <div className="w-full flex justify-center my-1">{props.hostid}</div>
      <div className="w-full flex flex-row my-1">
        <div>{props.detail.room_type}</div>
        <div className='ml'>{props.detail.total_bedrooms} bedrooms</div>
      </div>
      <div className="w-full flex justify-center my-2">${props.detail.price} per NIGHT</div>
    </div>
  );
}