export interface IUserInfo {
  userID: string;
  username: string;
  phone_number: string;
  email: string;
  password?: string;
  ava?: string;
}

export interface IStatus {
  label: string;
  color: string;
}

export interface IBookingTable {
  orderID: string;
  roomID: string;
  order_status: IStatus;
}

export interface IBookingHistory {
  status: string,
  deleted_at?: string,
  _id: string,
  host_id: string,
  room_id: string,
  customer_name: string,
  customer_phone: string,
  email: string,
  payment_number: string,
  num_adult: number,
  num_kid: number,
  created_at: string,
  day_start: string,
  day_end: string,
  customer_id: string,
  price: string,
}
export const DefaultBookingHistory: IBookingHistory = {
  status: '', 
  _id : '',
  host_id : '',
  room_id : '',
  customer_name : '',
  customer_phone : '',
  email : '',
  payment_number : '',
  num_adult : 0,
  num_kid : 0,
  created_at : '',
  day_start : '',
  day_end : '',
  customer_id : '',
  price : '',
};
