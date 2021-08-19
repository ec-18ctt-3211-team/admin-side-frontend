import { Button, Layout, Pagination } from 'components/common';
import { GIFTS } from 'constants/images.const';
import { SITE_PAGES } from 'constants/pages.const';
import { BASE } from 'utils/fetcher.utils';
import { useEffect, useState } from 'react';
import { IImageTag } from 'interfaces/image-tag.interface';
import CouponList from 'components/section/view-coupon-list/coupon-list';
import { useHistory } from 'react-router-dom';

export default function ViewCouponList(): JSX.Element{
  const history = useHistory();
  const [coupon, setCoupon] = useState<IImageTag[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(5);
  const [couponsPerPage, setCouponsPerPage] = useState<number>(3);

  useEffect(() => {
    setCoupon(GIFTS);
  }, []);
  useEffect(() => {
    setMaxPage(Math.ceil(coupon.length/couponsPerPage));
  }, [coupon]);

  const indexofLastCoup = (currentPage + 1) * couponsPerPage;
  const indexofFirstCoup = indexofLastCoup - couponsPerPage;
  const currentCoupon = coupon.slice(indexofFirstCoup,indexofLastCoup);

  return(
    <div className = 'h-full flex'>
      <Layout>
        <div className = "bg-white rounded-lg border-b p-2 h-full">
          <div className='w-[232px] h-8 sm:ml-auto'>
            <Button onClick={()=>{history.push({
              pathname : SITE_PAGES.VIEW_COUPON_LIST.path+'/new',
              state: {
                update: true,
              }
            });
            }}>New Coupon</Button>
          </div>
          <div>
            <CouponList currentCoupon={currentCoupon}/>
          </div>
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
            />
          </div>
        </div>
      </Layout>
    </div>
  );
}