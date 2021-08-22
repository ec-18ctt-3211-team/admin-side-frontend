import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IBookingTable } from 'interfaces/user.interface';
import { SITE_PAGES } from 'constants/pages.const';
import './list-of-rooms-table.css';
import { IRoomDetail } from 'interfaces/room.interface';

interface IRoom{
  ID?: string;
  Name? : string;
}

interface IListofRoom{
  list: IRoomDetail[];
}

interface Props {
  list_of_rooms: IRoom[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}

const items_per_pages = 6;

export default function HostListofRoom(props: IListofRoom) :JSX.Element{ 
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);

  useEffect(() => {
    props.list === undefined ? setMaxPage(1)
      : setMaxPage(Math.ceil(props.list.length / items_per_pages));
  }, [props.list]);

  const list : IRoom[] = [];
  props.list.map((item, index)=>{
    list.push({ ID: item._id, Name: item.title });
  });

  const indexofLastRoom = (currentPage + 1)*items_per_pages;
  const indexofFirstRoom = indexofLastRoom - items_per_pages;

  let currentRoom : IRoom[] = ([{ ID: '#100', Name: 'LUXURY HOMESTAY' }]);
  if(list) currentRoom = list.slice(indexofFirstRoom, indexofLastRoom);
  
  return(
    <div className='h-full'>
      <div className='h-full'>
        <div className="uppercase font-bold text-xl px-6 pt-2">
          List of Rooms
        </div>
        <div>
          <ListOfRoomsTable 
            list_of_rooms = {currentRoom}
            currentPage = {currentPage}
            setCurrentPage = {setCurrentPage}
            maxPage = {maxPage}
          />
        </div>
      </div>
    </div>
  );
}

function ListOfRoomsTable(props: Props) {
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
              <td className="border-r py-6 w-12">{index + props.currentPage * items_per_pages}</td>
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
  }, [props.list_of_rooms]);

  return (
    <div className="bg-white rounded-xl shadow-lg w-full flex flex-col items-center p-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b uppercase">
            <th className="border-r py-6">No</th>
            <th className="py-6">Name</th>
          </tr>
        </thead>
        {render}
      </table>

      <div className="mt-auto">
        <Pagination
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          maxPage={props.maxPage}
        />
      </div>
    </div>
  );
}
