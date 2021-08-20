import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IBookingHistory, IBookingTable, IStatus } from 'interfaces/user.interface';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import './booking-history.css';
import { IOrder } from 'interfaces/order.interface';

export const OrderStatus = {
  waiting: { label: 'pending', color: 'text-gray-400' },
  accepted: { label: 'accepted', color: 'text-success' },
  done: { label: 'done', color: 'text-brown-400' },
  denied: { label: 'rejected', color: 'text-error' },
};

function CheckStatus(status: string): IStatus{
  if(status === OrderStatus.waiting.label) return OrderStatus.waiting;
  else if(status === OrderStatus.accepted.label) return OrderStatus.accepted;
  else return OrderStatus.denied;
}


interface IBookingList{
  list: IOrder[];
}

interface Props {
  booking_history: IBookingTable[];
  items_per_pages?: number;
  currentPage: number;
}

const items_per_pages = 6 ;

export default function CustomerBookingTable(props: IBookingList): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);

  useEffect(() => {
    props.list === undefined ? setMaxPage(1)
      : setMaxPage(Math.ceil(props.list.length / items_per_pages));
  }, [props.list]);
  

  const list : IBookingTable[] = [];
  props.list.map((item, index)=>{
    list.push({ orderID: item._id, order_status: CheckStatus(item.status), roomID: item.room_id });
  });

  const indexofLastOrder = (currentPage + 1)*items_per_pages;
  const indexofFirstOrder = indexofLastOrder - items_per_pages;

  let currentOrder : IBookingTable[] = ([{ orderID: '', roomID: '', order_status: OrderStatus.waiting }]);
  if(list) currentOrder = list.slice(indexofFirstOrder, indexofLastOrder);
  
  return (
    <div className=" border">
      <div className="uppercase font-bold text-xl px-6 pt-4">
        Booking history
      </div>
      <div>
        <BookingTable booking_history={currentOrder} currentPage={currentPage}/>
      </div>
      <div className="mt-auto">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
        />
      </div>
    </div>
  );
}

function BookingTable(props: Props) {
  const [render, setRender] = useState(renderTable());

  function renderTable() {
    return (
      <tbody className="text-center">
        {props.booking_history.map((item, index) => {
          if (index > items_per_pages - 1) return;
          return (
            <tr
              key={item.orderID}
              className={
                (index > 0 && index % (items_per_pages - 1) === 0) ||
                index === props.booking_history.length - 1
                  ? ''
                  : 'border-b'
              }
            >
              <td className="border-r py-6">{index + props.currentPage * items_per_pages}</td>
              <td className="border-r py-6">
                <Link to={SITE_PAGES.BOOKING_HISTORY.path}>{item.roomID}</Link>
              </td>
              <td className={['py-6', item.order_status.color].join(' ')}>
                {item.order_status.label}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
  
  useEffect(() => {
    setRender(renderTable());
  }, [props.booking_history]);

  console.log('Or');
  return (
    <div className="bg-white rounded-xl w-full flex flex-col items-center p-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b uppercase">
            <th className="border-r py-6">No</th>
            <th className="border-r py-6">Room ID</th>
            <th className="py-6">Status</th>
          </tr>
        </thead>
        {render}
      </table>

    </div>
  );
}
