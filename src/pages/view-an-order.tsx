import { Layout } from 'components/common';
import Loading from 'components/common/loading';
import { ENDPOINT_URL } from 'constants/api.const';
import { SITE_PAGES } from 'constants/pages.const';
import { DefaultOrder, IOrder } from 'interfaces/order.interface';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { GET } from 'utils/fetcher.utils';

export default function ViewAnOrder(): JSX.Element {
  const location = useLocation();
  const [order, setOrder] = useState<IOrder>(DefaultOrder);
  const [loading, setLoading] = useState(false);

  async function fetchOrder() {
    try {
      setLoading(true);
      const path = location.pathname.split('/');
      const orderID = path[path.length - 1];
      const response = await GET(ENDPOINT_URL.GET.getOrderByID(orderID));
      if (response.data.valid) {
        setOrder(response.data.order);
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      {!loading ? (
        <div className='bg-white rounded-lg flex flex-col'>
          <div className='border-b px-4 py-2'>
            <p className='font-bold text-lg'>ID @{order?._id}</p>
          </div>
          <div className="p-8 bg-white flex rounded-lg">
            <div className="w-1/2 px-4">
              <div className="uppercase font-bold text-xl text-brown-500">
                customer information
              </div>
              <div className="uppercase font-bold text-base px-4 pt-4 pb-2 text-brown-400">
                Customer ID:
              </div>
              <div className="px-8 border-b">
                <Link className="cursor-pointer hover:text-gray-600" 
                  to={SITE_PAGES.VIEW_A_CUSTOMER.path + `/${order.customer_id}`}>
                  {order.customer_id}
                </Link>
              </div>
              <div className="uppercase font-bold text-base p-4 text-brown-400">
                customer name:
              </div>
              <div className="px-8 border-b uppercase text-center">
                {order.customer_name}
              </div>
              <div className="uppercase font-bold text-base p-4 text-brown-400">
                phone number:
              </div>
              <div className="px-8 border-b text-center">
                {order.customer_phone}
              </div>
              <div className="uppercase font-bold text-base p-4 text-brown-400">
                email:
              </div>
              <div className="px-8 border-b text-center">{order.email}</div>
              <div className="uppercase font-bold text-base p-4 text-brown-400">
                payment method:
              </div>
              <div className="px-8 border-b uppercase text-center">Paypal</div>
            </div>
            <div className="w-1/2 px-4">
              <div className="uppercase font-bold text-xl text-brown-500">
                booking information
              </div>
              <div className="uppercase font-bold text-base px-4 pt-4 pb-2 text-brown-400">
                Room ID:
              </div>
              <div className="px-8 border-b">
                <Link className="cursor-pointer hover:text-gray-600" 
                  to={SITE_PAGES.VIEW_A_ROOM.path + `/${order.room_id}`}>
                  {order.room_id}
                </Link>
              </div>
              <div className="uppercase font-bold text-base px-4 pt-4 pb-2 text-brown-400">
                Host ID:
              </div>
              <div className="px-8 border-b">
                <Link className="cursor-pointer hover:text-gray-600" 
                  to={SITE_PAGES.VIEW_A_HOST.path + `/${order.host_id}`}>
                  {order.host_id}
                </Link>
              </div>
              <div className="uppercase font-bold text-base px-4 pt-4 pb-2 text-brown-400">
                number of guest:
              </div>
              <div className="flex p-4">
                <div className="px-8 border-b">{order.num_adult}</div>
                <div className="px-4 uppercase">adult(s)</div>
                <div className="px-8 border-b">{order.num_kid}</div>
                <div className="px-4 uppercase">kid(s)</div>
              </div>
              <div className="flex p-4">
                <div className="pr-4 uppercase font-bold text-brown-400">
                  from
                </div>
                <div className="px-4 border-b">{order.day_start}</div>
                <div className="px-4 uppercase font-bold text-brown-400">to</div>
                <div className="px-4 border-b">{order.day_end}</div>
              </div>
              <div className="flex p-4">
                <div className="pr-4 uppercase font-bold text-brown-400">
                  Price
                </div>
                <div className="px-4 border-b">{order.price}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}