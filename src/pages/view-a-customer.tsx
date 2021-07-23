import { UserInfo } from 'components/section/view-a-customer/user-info';
import { useState, useEffect } from 'react';
import CustomerBookingTable from 'components/section/view-a-customer/booking-history';
import { Layout } from 'components/common';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IUserInfo } from 'interfaces/user.interface';

interface Props {
  id?: string;
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function ViewACustomer(props: Props): JSX.Element {
  let found = false;
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  async function getData(){
    const response = await GET(
      ENDPOINT_URL.GET.getCustomerByID(),
    );

    if(response.status == 200){
      let res: any;
      const data = response.data.customers; 
      data.map((data: any) =>{
        if(data._id === '60e954bfa6e91a3cf4f5088b' ){
          res = data;
          console.log('Result:'+ data);
          found = true;
        }
      });
     
      if(found){
        setUserInfo({ ...userInfo,
          userID: res._id,
          username: res.name,
          phone_number: res.phone,
          email: res.email,
        });
      }
    }
  }

  useEffect(()=>{
    getData();
  }, [userInfo]);
  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}>
      <div className = "bg-white rounded-lg">
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
      </div>
    </Layout>
  );
}
