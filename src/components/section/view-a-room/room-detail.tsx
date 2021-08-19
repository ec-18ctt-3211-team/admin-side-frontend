import { IRoomDetail } from 'interfaces/room.interface';

interface Props {
  detail: IRoomDetail;
}

export default function RoomDetail(props: Props): JSX.Element {
  return (
    <div className="w-full px-8">
      <h1 className="font-bold text-center text-4xl">
        {props.detail.title}
      </h1>
      <div className="py-4">{props.detail.description}</div>
    </div>
  );
}