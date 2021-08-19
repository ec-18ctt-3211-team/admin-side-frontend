import { Button, Layout, Pagination } from 'components/common';
import { SITE_PAGES } from 'constants/pages.const';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CityList from 'components/section/view-city-list/city-list-table';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { ICity } from 'interfaces/city.interface';

const items_per_pages = 6 ;

export default function ViewCityList(): JSX.Element{
  const history = useHistory();
  const [city, setCity] = useState<ICity[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(10);

  async function fetchCity() {
    try{
      const response = await GET(
        ENDPOINT_URL.GET.getAllCity(),
      );
      if(response.status == 200){
        if(response.data.valid === false) {
          return;
        }
        setCity(response.data.cities);
        if(city === undefined){
          setCity([{ id: '', titles: '', room_id: '' }]);
        }
      }
    }
    catch {
      console.log('False');
      setCity([{ id: '', titles: '', room_id: '' }]);
    }
  }

  useEffect(() => {
    fetchCity();
  }, [currentPage]);

  useEffect(() => {
    if(city === undefined) setMaxPage(1);
    else 
      setMaxPage(Math.ceil(city.length/items_per_pages));
  }, [city]);

  const indexofLastCity = (currentPage + 1)*items_per_pages;
  const indexofFirstCity = indexofLastCity - items_per_pages;
  const currentCity = city.slice(indexofFirstCity, indexofLastCity);
  
  return(
    <Layout>
      <div className = "bg-white rounded-lg border-b p-2">
        <div className='w-[232px] h-8 sm:ml-auto'>
          <Button onClick={()=>{history.push({
            pathname : SITE_PAGES.VIEW_CITY_LIST.path+'/new',
            state: {
              update: true,
            }
          });
          }}>New City</Button>
        </div>
        <div>
          <CityList cityList={currentCity} currentPage={currentPage}/>
        </div>
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
          />
        </div>
      </div>
    </Layout> 
  );
}