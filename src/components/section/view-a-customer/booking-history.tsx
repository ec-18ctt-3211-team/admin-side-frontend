import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IBookingTable } from 'interfaces/user.interface';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import './booking-history.css';

export const OrderStatus = {
  waiting: { label: 'Waiting', color: 'text-gray-400' },
  accepted: { label: 'Accepted', color: 'text-success' },
  done: { label: 'Done', color: 'text-brown-400' },
  denied: { label: 'Denied', color: 'text-error' },
};

interface Props {
  booking_history: IBookingTable[];
  items_per_pages?: number;
}
export default function CustomerBookingTable(): JSX.Element{
  const bookinghistory: IBookingTable[] = [ { orderID: '#1', roomID: '123', order_status: OrderStatus.waiting },
    { orderID: '#1', roomID: '123', order_status: OrderStatus.waiting },
    {
      orderID: '#1',
      roomID: '123',
      order_status: OrderStatus.accepted,
    },
    { orderID: '#1', roomID: '123', order_status: OrderStatus.denied },
    { orderID: '#1', roomID: '123', order_status: OrderStatus.done },
    { orderID: '#1', roomID: '123', order_status: OrderStatus.denied },
    {
      orderID: '#1',
      roomID: '123',
      order_status: OrderStatus.accepted,
    },
  ];
  return(
    <div>
      <div className='vl'></div>
      <div className='list-box'>
        <div className="uppercase font-bold text-xl px-6 pt-4">
          Booking history
        </div>
        <div>
          <BookingTable booking_history={bookinghistory}/>
        </div>
      </div>
    </div>
  );
}

function BookingTable(props: Props) {
  const { items_per_pages = 6 } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);
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
              <td className="border-r py-6">{item.orderID}</td>
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
  }, [currentPage]);

  return (
    <div className="bg-white rounded-xl shadow-lg w-full flex flex-col items-center p-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b uppercase">
            <th className="border-r py-6">ID</th>
            <th className="border-r py-6">Booking Information</th>
            <th className="py-6">Status</th>
          </tr>
        </thead>
        {render}
      </table>

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