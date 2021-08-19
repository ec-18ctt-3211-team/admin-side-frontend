export const OrderStatusLabels = {
  pending: { label: 'pending', color: 'text-gray' },
  accepted: { label: 'accepted', color: 'text-success' },
  rejected: { label: 'rejected', color: 'text-error' },
};

export type OrderStatus = 'pending' | 'accepted' | 'rejected';

export interface IOrder {
  status: OrderStatus;
  deleted_at: string | null;
  _id: string;
  room_id: string;
  host_id: string;
  customer_name: string;
  customer_phone: string;
  email: string;
  num_adult: number;
  num_kid: number;
  created_at: string;
  day_start: string;
  day_end: string;
  __v: number;
}
export const DefaultOrder: IOrder = {
  status: 'pending', 
  deleted_at: null,
  _id : '',
  host_id : '',
  room_id : '',
  customer_name : '',
  customer_phone : '',
  email : '',
  num_adult : 0,
  num_kid : 0,
  created_at : '',
  day_start : '',
  day_end : '',
  __v: 0,
};