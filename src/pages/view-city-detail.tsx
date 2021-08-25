import { Layout } from 'components/common';
import { SITE_PAGES } from 'constants/pages.const';
import { useLocation } from 'react-router-dom';
import CityInfor from 'components/section/view-city-detail/city-infor';
import { useEffect, useState } from 'react';
import { ICity } from 'interfaces/city.interface';
import { ENDPOINT_URL } from 'constants/api.const';
import { GET } from 'utils/fetcher.utils';
import Loading from 'components/common/loading';

const newCity = 'new';

export default function ViewCityDetails(): JSX.Element{
  const path = SITE_PAGES.VIEW_CITY_LIST.path;
  const location = useLocation();
  const state = location.pathname.substring(path.length + 1);
  const [loading, setLoading] = useState(false);

  const [city, setCity] = useState<ICity>({ titles: '' , id: '', room_id: '',is_pinned: false });
  async function fetchCity() {
    if(state === newCity) return;
    try{
      setLoading(true);
      const response = await GET(
        ENDPOINT_URL.GET.getCityByID(state),
      );
      if(response.status == 200){
        if(response.data.valid === false ) {
          return;
        }
        setCity({ ...city,
          titles: response.data.city[0].titles,
          id: response.data.city[0].id,
          thumbnail: response.data.city[0].thumnail,
          is_pinned: response.data.city[0].is_pinned,
          room_id: response.data.city[0].room_id,
        });
      }
    }
    catch {
      window.alert('Error');
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCity();
  }, []);

  return(
    <Layout>
      {!loading ? (
        <div className = "bg-white rounded-lg h-full">
          {(state === newCity) ? 
            <CityInfor type='new'/> :  
            <CityInfor type='edit' id={ state } city={city}/>}
        </div>
      ):(
        <Loading/>
      )}
    </Layout>  
  );
}