import { IImageTag } from './image-tag.interface';

export interface IRoomAddress {
  number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface IBookingDate {
  date: string;
  room_id: string;
  __id: string;
  _v: number;
}

export interface ISpecialPrice {
  date: string;
  price: number;
  room_id: string;
  __v: number;
  _id: string;
}


export interface IRoomDetail {
  _id: string;
  title: string;
  thumnail: string;
  photos?: IImageTag[];
  max_guest: number;
  host_id: string;
  address: IRoomAddress;
  description: string;
  normal_price: number;
  weekend_price: number;
  extraPrices?: ISpecialPrice[];
  bookingDates?: IBookingDate[];
  created_at: string;
  deleted_at: null;
  __v: number;
  host?: string;
  room_type?: string;
  total_bedrooms?: string;
}

export const DefaultRoomAddress : IRoomAddress = {
  number: '',
  street: '',
  ward: '',
  district: '',
  city: '',
};

export const DefaultListofRooms : IRoomDetail = {
  _id: 'default',
  title: '',
  thumnail: '',
  max_guest: 0,
  host_id: '',
  address: DefaultRoomAddress,
  description: '',
  normal_price: 0,
  weekend_price: 0,
  created_at: '',
  deleted_at: null,
  __v: 0,
};
