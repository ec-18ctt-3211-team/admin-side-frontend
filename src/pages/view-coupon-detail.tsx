import { Layout } from 'components/common';
import CouponInfor from 'components/section/view-coupon-details/coupon-infor';
import { SITE_PAGES } from 'constants/pages.const';
import { useLocation } from 'react-router-dom';

export default function ViewCouponDetails(): JSX.Element{
  const newCoupon = 'new';
  const path = SITE_PAGES.VIEW_COUPON_LIST.path;
  const location = useLocation();
  const state = location.pathname.substring(path.length + 1);

  console.log(': '+ state);
  return(
    <div className = 'h-full flex'>
      <Layout>
        <div className = "bg-white rounded-lg border-b p-2 h-full">
          {(state === newCoupon) ? 
            <CouponInfor type='new'/> :  
            <CouponInfor type='edit' id={ state }/>}
        </div>
      </Layout>    
    </div>
  );
}