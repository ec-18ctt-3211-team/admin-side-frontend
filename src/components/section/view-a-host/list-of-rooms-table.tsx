import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IBookingTable } from 'interfaces/user.interface';
import { SITE_PAGES } from 'constants/pages.const';
import './list-of-rooms-table.css';

interface HostID{
  host_id? : string;
}
interface IRoom{
  ID?: string;
  Name? : string;
}

interface Props {
  list_of_rooms: IRoom[];
}

const items_per_pages = 6;
export const OrderStatus = {
  waiting: { label: 'Waiting', color: 'text-gray-400' },
  accepted: { label: 'Accepted', color: 'text-success' },
  done: { label: 'Done', color: 'text-brown-400' },
  denied: { label: 'Denied', color: 'text-error' },
};

export default function HostListofRoom(props: HostID) :JSX.Element{ 
  const roomlists: IRoom[] =[
    { ID: '#1', Name: 'LUXURY HOMESTAY' },{},{},{},{},{}
  ];
  const [currentPage, setCurrentPage] = useState(0);
  return(
    <div className='h-full'>
      <div className='h-full'>
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
  let currentRoom : IRoom[]= [{}];
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);
  const [render, setRender] = useState(renderTable());

  const indexofLastRoom = (currentPage + 1)*items_per_pages;
  const indexofFirstRoom = indexofLastRoom - items_per_pages;
  currentRoom = rooms.slice(indexofFirstRoom, indexofLastRoom);
  
  for (let i = currentRoom.length; i < 6; i++) {
    currentRoom.push({});
  }

  function renderTable() {
    return (
      <tbody className="text-center">
        {currentRoom.map((item, index) => {
          if (index > items_per_pages - 1) return;
          return (
            <tr
              key={item.ID}
              className={
                (index > 0 && index % (items_per_pages - 1) === 0) ||
                index === currentRoom.length - 1
                  ? ''
                  : 'border-b'
              }
            >
              <td className="border-r py-6 w-12">{item.ID}</td>
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
    setRooms(props.list_of_rooms);
  }, [currentPage]);

  useEffect(() => {
    setMaxPage( Math.ceil(rooms.length/items_per_pages) );
    setRender(renderTable());
  }, [rooms]);

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
