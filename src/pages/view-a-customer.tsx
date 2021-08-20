import { UserInfo } from 'components/section/view-a-customer/user-info';
import { useState, useEffect } from 'react';
import CustomerBookingTable from 'components/section/view-a-customer/booking-history';
import { Layout } from 'components/common';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IUserInfo } from 'interfaces/user.interface';
import { IOrder, DefaultOrder } from 'interfaces/order.interface';
import { useLocation } from 'react-router-dom';

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
  const [userInfo, setUserInfo] = useState<IUserInfo>({ phone_number: '', username: '', userID: '', email: '' });
  const [bookingHistory, setBookingHistory] = useState<IOrder[]>(
    [DefaultOrder]);

  async function getUserData(){
    const response = await GET(
      ENDPOINT_URL.GET.getCustomerByID(keyword),
    );

    if(response.status == 200){
      if(response.data.valid === false || response.data.customer === null) {
        return;
      }
      SetFound(true);
      setUserInfo({ ...userInfo,
        userID: response.data.customer._id,
        username: response.data.customer.name,
        phone_number: response.data.customer.phone,
        email: response.data.customer.email,
      });
      console.log('ID:'+ userInfo.userID);
    }
  }
  async function getUserBooking(userID: string){
    if(!userID) return;
    const response = await GET(
      ENDPOINT_URL.GET.getOrderByCustomerID(userID),
    );

    if(response.status == 200){
      if(response.data.valid === false) {
        return;
      }
      console.log(userID);
      setBookingHistory(response.data.orders);
    }
  }

  useEffect(()=>{
    getUserData();
  }, []);
  useEffect(()=>{
    getUserBooking(userInfo.userID);
  }, [userInfo.userID]);
  console.log('Origin');
  console.log(bookingHistory);
  
  return (
    <>
      {found ? 
        (<Layout>
          <div className = "bg-white rounded-lg">
            <div className="border-b px-4 py-2">
              <p className="font-bold text-lg">ID @{userInfo?.userID}</p>
            </div>
            <div className="flex w-full h-full">
              <div className="w-1\/3 lg:w-2/5 h-full">
                <UserInfo user={userInfo}></UserInfo>
              </div>
              <div className="w-2\/5 lg:w-3/5 h-full">
                <CustomerBookingTable list={bookingHistory}/>
              </div>
            </div>
          </div>      
        </Layout>
        ):(
          <div className='h-full flex border'>
            <Layout>
              <div className = "h-full bg-white rounded-lg">No result</div>
            </Layout>
          </div>
        )}
    </>
  );
}
