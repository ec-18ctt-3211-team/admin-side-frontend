import { SITE_PAGES } from 'constants/pages.const';
import { useEffect, useState, useRef } from 'react';
import { IRoomDetail } from 'interfaces/room.interface';
import './dialogue.css';
import { IHostDetail } from 'interfaces/host.interface';
import { Link } from 'react-router-dom';

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
    <div className="border rounded-md w-full flex flex-col items-center px-2 ml-1.5">
      <div className="w-full flex justify-center my-1 font-semibold hover:text-gray-600">
        <Link className="cursor-pointer" to={SITE_PAGES.VIEW_A_HOST.path + `/${props.hostdetail._id}`}>
          {props.hostdetail._id}
        </Link>
      </div>
      <div className="w-full flex flex-row my-2">
        <div>{props.detail.room_type}</div>
        <div className='ml'>{props.detail.max_guest} guests</div>
      </div>
      <div className="w-full flex justify-center my-2">${props.detail.normal_price} per NIGHT</div>
    </div>
  );
}