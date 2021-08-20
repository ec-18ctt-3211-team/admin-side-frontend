import { Button, Input } from 'components/common';
import { useState } from 'react';
import { binSolid, InlineIcon } from 'utils/icon.utils';
import './coupon-infor.css';

interface Props{
  type: 'new'| 'edit';
  id? : string;
}
interface Coupon{
  label: string;
  detail: string;
  description : string;
}

export default function CouponInfor(props: Props):JSX.Element{
  
  const initcoupon = { label: '', detail: '', description: '' };
  const [coupon, SetCoupon] = useState<Coupon>(initcoupon);

  //console.log('co:' + coupon.label);
  //console.log('co:' + coupon.detail);
  //console.log('co:' + coupon.description);

  return(
    <div className = "flex flex-row h-full mx-14 my-4 border-r w-2/5">
      <div className = "flex flex-col items-center">
        <div className = "flex flex-col h-full mb-8">
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5'
            label = {{ value :'Label', position: 'top' }}
            value = { coupon.label }
            onChange ={(e)=>{
              SetCoupon({ ...coupon,label : e.target.value });
            }}
          />
          <Input
            border='full' 
            type ='text' 
            classname = 'py-2 mr-4 h-3/5'
            label = {{ value :'Detail', position: 'top' }}
            value = { coupon.detail }
            onChange ={(e)=>{
              SetCoupon({ ...coupon, detail : e.target.value });
            }}
          />
          <Input
            border='full' 
            type ='text' 
            classname = 'py-2 mr-4'
            label = {{ value :'Description', position: 'top' }}
            value = { coupon.description }
            onChange ={(e)=>{
              SetCoupon({ ...coupon, description : e.target.value });
            }}
          />
        </div>
        <div className= "mt-auto my-4 w-full flex flex-row items-center">
          {(props.type === 'new')? 
            (<Button className="w-2/5 mx-1 h-6">
              Add
            </Button>)
            : 
            (<Button className="w-2/5 mx-1 h-6">
              Save
            </Button>)}
          <Button className="w-2/5 mx-1 h-6" onClick={()=> SetCoupon(initcoupon)}>
            Cancel
          </Button>
          <Button className="w-2/5 mx-1 h-6">
            <InlineIcon icon = {binSolid} style={{ fontSize: 'inherit' }} />
          </Button>
        </div>
      </div>
      <div>

      </div>
    </div>
  );
}