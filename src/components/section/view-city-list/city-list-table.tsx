import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IImageTag } from 'interfaces/image-tag.interface';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import './city-list-table.css';
import { ICity } from 'interfaces/city.interface';

interface Props{
  cityList: ICity[];
  items_per_pages? : number;
  currentPage: number;
}

export default function CityList(props: Props) :JSX.Element{ 
  return(
    <div className='h-full'>
      <div>
        <ListOfCitiesTable cityList={props.cityList} currentPage={props.currentPage}/>
      </div>
    </div>
  );
}

function ListOfCitiesTable(props: Props) {
  const { items_per_pages = 6 } = props;
  const [render, setRender] = useState(renderTable()); 

  function renderTable() {
    return (
      <tbody className="text-center">
        {props.cityList.map((item, index) => {
          if (index > items_per_pages - 1) return;
          return (
            <tr
              key={item.id}
              className={
                (index > 0 && index % (items_per_pages - 1) === 0) ||
                index === props.cityList.length - 1
                  ? ''
                  : 'border-b hover:bg-gray-600:hover'
              }
            >
              <td className="border-r py-6 w-12">
                <Link className="cursor-pointer" to={SITE_PAGES.VIEW_CITY_LIST.path + `/${item.id}`}>
                  {index + 1 + props.currentPage * items_per_pages}
                </Link>
              </td>
              <td className="py-6">
                {item.titles ? 
                  <Link className="cursor-pointer" to={SITE_PAGES.VIEW_CITY_LIST.path + `/${item.id}`}>
                    {item.titles}
                  </Link>: ''}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  useEffect(() => {
    setRender(renderTable());
  }, [props.cityList]);

  return (
    <div className="bg-white w-full flex flex-col items-center p-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="border-b uppercase">
            <th className="border-r py-6">ID</th>
            <th className="py-6">Name</th>
          </tr>
        </thead>
        {render}
      </table>
    </div>
  );
}