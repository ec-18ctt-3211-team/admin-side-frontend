import { UserInfo } from 'components/section/view-a-customer/user-info';
import { useState } from 'react';
import CustomerBookingTable from 'components/section/view-a-customer/booking-history';
import { Layout } from 'components/common';

interface Props {
  id?: string;
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function ViewACustomer(props: Props): JSX.Element {
  const [userInfo, setUserInfo] = useState({
    userID: '1234567',
    username: 'nhily',
    phone_number: '0123456789',
    email: 'nhily@gmail.com',
  });
  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
    >
      <div className="border-b px-4 py-2">
        <p className="font-bold text-lg">ID @{props.id}</p>
      </div>
      <div className="flex w-full">
        <div className="w-1\/3 lg:w-2/5">
          <UserInfo user={userInfo}></UserInfo>
        </div>
        <div className="w-2\/5 lg:w-3/5">
          <CustomerBookingTable />
        </div>
      </div>
    </Layout>
  );
}
