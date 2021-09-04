import { UserInfo } from 'components/section/view-a-customer/user-info';
import { useState, useEffect } from 'react';
import CustomerBookingTable from 'components/section/view-a-customer/booking-history';
import { Layout } from 'components/common';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IUserInfo } from 'interfaces/user.interface';
import { IOrder, DefaultOrder } from 'interfaces/order.interface';
import { useLocation } from 'react-router-dom';
import Loading from 'components/common/loading';

export const OrderStatus = {
  waiting: { label: 'Waiting', color: 'text-gray-400' },
  accepted: { label: 'Accepted', color: 'text-success' },
  done: { label: 'Done', color: 'text-brown-400' },
  denied: { label: 'Denied', color: 'text-error' },
};

export default function ViewACustomer(): JSX.Element {
  const location = useLocation();
  const path = location.pathname.split('/');
  const keyword = path[path.length - 1];

  const [found, SetFound] = useState(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    phone_number: '',
    username: '',
    userID: '',
    email: '',
  });
  const [bookingHistory, setBookingHistory] = useState<IOrder[]>([
    DefaultOrder,
  ]);
  const [loading, setLoading] = useState(true);

  async function getUserData() {
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(keyword));

      if (response.status == 200) {
        if (response.data.valid === false || response.data.customer === null) {
          return;
        }
        SetFound(true);
        setUserInfo({
          ...userInfo,
          userID: response.data.customer._id,
          username: response.data.customer.name,
          phone_number: response.data.customer.phone,
          email: response.data.customer.email,
        });
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function getUserBooking(userID: string) {
    if (!userID) return;
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getOrderByCustomerID(userID));

      if (response.status == 200) {
        if (response.data.valid === false) {
          return;
        }
        setBookingHistory(response.data.orders);
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);
  useEffect(() => {
    getUserBooking(userInfo.userID);
  }, [userInfo.userID]);

  return (
    <>
      {!loading ? (
        <>
          {found ? (
            <Layout>
              <div className="bg-white h-full rounded-xl">
                <p className="font-bold text-lg border-b px-8 py-4">
                  ID @{userInfo?.userID}
                </p>
                <div className="flex w-full h-full py-4">
                  <div className="w-1/3">
                    <UserInfo user={userInfo} />
                  </div>
                  <div className="w-2/3">
                    <CustomerBookingTable list={bookingHistory} />
                  </div>
                </div>
              </div>
            </Layout>
          ) : (
            <div className="h-full flex border">
              <Layout>
                <div className="h-full bg-white rounded-lg">No result</div>
              </Layout>
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
