import { Button, Input } from 'components/common';
import { useEffect, useState } from 'react';
import { Solid, InlineIcon } from 'utils/icon.utils';
import ImageUploader from 'components/common/image-uploader/image-uploader';
import { ICity } from 'interfaces/city.interface';
import { ENDPOINT_URL } from 'constants/api.const';
import { DELETE, GET, POST, PUT } from 'utils/fetcher.utils';
import { SITE_PAGES } from 'constants/pages.const';
import { useHistory } from 'react-router';
import Loading from 'components/common/loading';

interface Props {
  type: 'new' | 'edit';
  id?: string;
  city?: ICity;
}
function refreshPage() {
  location.reload();
}

export default function CityInfor(props: Props): JSX.Element {
  let initCity: ICity = { titles: '', id: '', room_id: '', is_pinned: false };
  if (props.city) initCity = props.city;

  const history = useHistory();
  const [city, setCity] = useState<ICity>(initCity);
  const [loading, setLoading] = useState(false);

  async function Add() {
    if (!city.titles || !city.id || !city.thumbnail) {
      window.alert('Please fulfill all fields.');
      return;
    }
    const payload = {
      titles: city.titles,
      id: city.id.trim(),
      is_pinned: city.is_pinned,
      room_id: city.room_id ? city.room_id : null,
      thumnail: city.thumbnail,
    };

    try {
      setLoading(true);
      const response = await POST(ENDPOINT_URL.POST.createACity, payload);
      //console.log(response);
      if (response.data.valid) {
        window.alert('Add city successfully');
      } else window.alert('Unsuccess response');
    } catch (error: any) {
      //console.log(error.response);
      window.alert('Sth wrong');
    } finally {
      setLoading(false);
      refreshPage();
    }
  }
  async function Save() {
    if (!city.titles || !city.id || !city.thumbnail) {
      window.alert('Please fulfill all fields.');
      return;
    }
    let payload1;
    payload1 = {
      titles: city.titles,
      id: city.id.trim(),
      is_pinned: city.is_pinned,
      thumnail: city.thumbnail,
    };
    if (city.room_id)
      payload1 = { ...payload1, room_id: city.room_id ? city.room_id : null };

    try {
      setLoading(true);
      const response = await PUT(
        ENDPOINT_URL.PUT.updateACity(initCity.id),
        payload1,
      );
      //console.log(response);
      if (response.data.valid) {
        window.alert('Update city successfully');
      } else window.alert('Unsuccess response');
    } catch (error: any) {
      //console.log(error.response);
      window.alert('Sth wrong');
    } finally {
      setLoading(false);
      refreshPage();
    }
  }

  async function Delete() {
    if (!initCity.id) return;
    try {
      setLoading(true);
      const response = await DELETE(
        ENDPOINT_URL.DELETE.deleteACity(initCity.id),
      );
      if (response.data.valid) {
        window.alert('Delete city successfully');
        history.push(SITE_PAGES.VIEW_CITY_LIST.path);
      } else window.alert('Unsuccess response');
    } catch (error: any) {
      window.alert('Sth wrong');
      //console.log(error.response);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setCity(initCity);
  }, [props]);

  return (
    <>
      {!loading ? (
        <div className="flex justify-evenly bg-gray-200 w-full h-full">
          <div className="w-1/4 h-1/2 rounded-xl bg-white flex flex-col">
            <div className="flex flex-col mx-4 my-8">
              <Input
                border="full"
                type="text"
                classname="py-4 px-2 mr-4 h-3/5"
                label={{ value: 'ID', position: 'top' }}
                value={initCity.id}
                onChange={(e) => {
                  setCity({ ...city, id: e.target.value });
                }}
                disable
              />
              <Input
                border="full"
                type="text"
                classname="py-4 px-2 mr-4 h-3/5"
                label={{ value: 'Title', position: 'top' }}
                value={initCity?.titles}
                onChange={(e) => {
                  setCity({ ...city, titles: e.target.value });
                }}
              />
              <Input
                border="none"
                type="checkbox"
                label={{ value: 'Pinned', position: 'left' }}
                checked={city.is_pinned}
                onChange={(e) => {
                  setCity({ ...city, is_pinned: e.target.checked });
                }}
              />
            </div>
            <div className="mt-auto w-full flex py-2 justify-evenly">
              {props.type === 'new' ? (
                <Button className="w-1/3 py-2" onClick={Add}>
                  Add
                </Button>
              ) : (
                <Button className="w-1/3 py-2" onClick={Save}>
                  Save
                </Button>
              )}
              {props.type === 'edit' && (
                <Button className="w-1/3 py-2" onClick={Delete}>
                  <InlineIcon
                    icon={Solid.bin}
                    style={{ fontSize: 'inherit' }}
                  />
                </Button>
              )}
            </div>
          </div>
          <div className="flex items-center w-3/5 bg-white rounded-xl p-2">
            <ImageUploader
              image={city.thumbnail}
              setImage={(value) => setCity({ ...city, thumbnail: value })}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
