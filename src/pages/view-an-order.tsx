import { Layout } from 'components/common';
import Loading from 'components/common/loading';
import { ENDPOINT_URL } from 'constants/api.const';
import { DefaultOrder, IOrder } from 'interfaces/order.interface';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { getDateString } from 'utils/datetime.utils';
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
        <div className="p-8 bg-white flex rounded-lg">
          <div className="w-1/2 px-4">
            <div className="uppercase font-bold text-xl text-brown-500">
              customer information
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
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}