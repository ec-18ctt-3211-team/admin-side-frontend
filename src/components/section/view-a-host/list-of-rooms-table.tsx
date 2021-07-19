import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IBookingTable } from 'interfaces/user.interface';
import { SITE_PAGES } from 'constants/pages.const';
import './list-of-rooms-table.css';

interface IRoom{
  ID?: string;
  Name? : string;
}

interface Props {
  list_of_rooms: IRoom[];
  items_per_pages?: number;
}
export const OrderStatus = {
  waiting: { label: 'Waiting', color: 'text-gray-400' },
  accepted: { label: 'Accepted', color: 'text-success' },
  done: { label: 'Done', color: 'text-brown-400' },
  denied: { label: 'Denied', color: 'text-error' },
};


export default function HostListofRoom() :JSX.Element{ 
  const roomlists: IRoom[] =[
    { ID: '#1', Name: 'LUXURY HOMESTAY' },{},{},{},{},{}
  ];
  const [currentPage, setCurrentPage] = useState(0);
  return(
    <div className='host-list'>
      <div className='vl'></div>
      <div className='list-box'>
        <div className="uppercase font-bold text-xl px-6 pt-2">
          List of Rooms
        </div>
        <div>
          <ListOfRoomsTable list_of_rooms={roomlists}/>
        </div>
      </div>
    </div>
  );
}

function ListOfRoomsTable(props: Props) {
  const { items_per_pages = 6 } = props;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);
  const [render, setRender] = useState(renderTable());

  function renderTable() {
    return (
      <tbody className="text-center">
        {props.list_of_rooms.map((item, index) => {
          if (index > items_per_pages - 1) return;
          return (
            <tr
              key={item.ID}
              className={
                (index > 0 && index % (items_per_pages - 1) === 0) ||
                index === props.list_of_rooms.length - 1
                  ? ''
                  : 'border-b'
              }
            >
              <td className="border-r py-6">{item.ID}</td>
              <td className="py-6">
                {item.Name}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  useEffect(() => {
    setRender(renderTable());
  }, [currentPage]);

  return (
    <div className="bg-white rounded-xl shadow-lg w-full flex flex-col items-center p-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b uppercase">
            <th className="border-r py-6">ID</th>
            <th className="py-6">Name</th>
          </tr>
        </thead>
        {render}
      </table>

      <div className="mt-auto">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
        />
      </div>
    </div>
  );
}
