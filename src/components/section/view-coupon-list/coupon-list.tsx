import React from 'react';
import { SITE_PAGES } from 'constants/pages.const';
import { IImageTag } from 'interfaces/image-tag.interface';
import { Link } from 'react-router-dom';
import './coupon-list.css';

interface Props{
  currentCoupon: IImageTag[];
}

const Wrapper = (props: {
  children: React.ReactNode;
  isLink?: boolean;
  id: string;
}): JSX.Element => {
  return (
    <div className ='mx-14 w-1/4 container'>
      {props.isLink ? (
        <Link className="cursor-pointer" to={SITE_PAGES.VIEW_COUPON_LIST.path + `/${props.id}`}>
          {props.children}
        </Link>) : (<div>{props.children}</div>)
      }
    </div>
  );
};

export default function CouponList(props: Props){
  return(
    <div className='flex flex-row justify-around my-4'>
      {props.currentCoupon.map((photo:any) => {
        return (
          <Wrapper id={photo._id} isLink={true}>
            <img
              key = {photo._id}
              src = {photo.path}
              className={[
                'h-80 w-full rounded-xl shadow bg-brown-200 object-cover',
                photo.path
                  ? 'opacity-80 hover:shadow-2xl hover:opacity-100'
                  : 'opacity-90',
              ].join(' ')}
            />
            <div className='content'>Coupon {photo._id}</div>
          </Wrapper>
        );
      })}
    </div>
  );
}
/*
  <div className ='mx-14 w-1/4 container'>
    <img
      key = {photo._id}
      src = {photo.path}
      className={[
        'h-80 w-full rounded-xl shadow bg-brown-200 object-cover',
        photo.path
          ? 'opacity-80 hover:shadow-2xl hover:opacity-100'
          : 'opacity-90',
      ].join(' ')}
    />
    <div className='content'>Coupon {photo._id}</div>
  </div>*/