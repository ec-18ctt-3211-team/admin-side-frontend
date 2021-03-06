import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IBookingTable } from 'interfaces/user.interface';
import { SITE_PAGES } from 'constants/pages.const';
import './list-of-rooms-table.css';
import { IRoomDetail } from 'interfaces/room.interface';
import { Link } from 'react-router-dom';

interface IRoom {
  ID?: string;
  Name?: string;
}

interface IListofRoom {
  list: IRoomDetail[];
}

interface Props {
  list_of_rooms: IRoom[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}

const items_per_pages = 6;

export default function HostListofRoom(props: IListofRoom): JSX.Element {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);

  useEffect(() => {
    props.list === undefined
      ? setMaxPage(1)
      : setMaxPage(Math.ceil(props.list.length / items_per_pages));
  }, [props.list]);

  const list: IRoom[] = [];
  props.list.map((item, index) => {
    list.push({ ID: item._id, Name: item.title });
  });

  const indexofLastRoom = (currentPage + 1) * items_per_pages;
  const indexofFirstRoom = indexofLastRoom - items_per_pages;

  let currentRoom: IRoom[] = [{ ID: '#100', Name: 'LUXURY HOMESTAY' }];
  if (list) currentRoom = list.slice(indexofFirstRoom, indexofLastRoom);

  return (
    <div className="w-full flex flex-col h-[80%]">
      <div className="uppercase font-bold text-xl px-6 pt-4 text-center">
        List of Rooms
      </div>
      <div>
        <ListOfRoomsTable
          list_of_rooms={currentRoom}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPage={maxPage}
        />
      </div>
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
              <td className="border-r border-brown-600 py-6">
                {index + 1 + props.currentPage * items_per_pages}
              </td>
              <td className="py-6">
                <Link
                  className="cursor-pointer"
                  to={SITE_PAGES.VIEW_A_ROOM.path + `/${item.ID}`}
                >
                  {item.Name}
                </Link>
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
    <div className="bg-white rounded-xl w-full flex flex-col items-center p-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b border-brown-600 uppercase bg-brown-100 text-brown-500">
            <th className="border-r border-brown-600 py-6">No</th>
            <th className="py-6">Name</th>
          </tr>
        </thead>
        {render}
      </table>
    </div>
  );
}
