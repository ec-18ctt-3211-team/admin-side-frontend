import { Button, Input } from 'components/common';
import { useEffect, useState } from 'react';
import { binSolid, InlineIcon } from 'utils/icon.utils';
import ImageUploader from 'components/common/image-uploader/image-uploader';
import { ICity } from 'interfaces/city.interface';
import { ENDPOINT_URL } from 'constants/api.const';
import { DELETE, GET, POST, PUT } from 'utils/fetcher.utils';
import { SITE_PAGES } from 'constants/pages.const';
import { useHistory } from 'react-router';

interface Props{
  type: 'new'| 'edit';
  id? : string;
  city?: ICity;
}
function refreshPage(){
  location.reload();
}

export default function CityInfor(props: Props):JSX.Element{
  let initCity : ICity = { titles: '' , id: '', room_id: '',is_pinned: false };
  if(props.city) initCity = props.city;

  const history = useHistory();
  const [city, setCity] = useState<ICity>(initCity);
  

  async function Add() {
    if (!city.titles || !city.id || !city.thumbnail ) {
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
    
    try{
      const response = await POST(ENDPOINT_URL.POST.createACity, payload);
      console.log(response);
      if(response.data.valid){
        window.alert('Add city successfully');
      }
      else window.alert('Unsuccess response');
    }
    catch(error: any){
      console.log(error.response);
      window.alert('Sth wrong');
    }
    finally{
      refreshPage();
    }
  }
  async function Save() {
    if (!city.titles || !city.id || !city.thumbnail ) {
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
    if(city.room_id) payload1 = { ...payload1, room_id: city.room_id ? city.room_id : null };
    
    try{
      const response = await PUT(ENDPOINT_URL.PUT.updateACity(initCity.id), payload1);
      console.log(response);
      if(response.data.valid){
        window.alert('Update city successfully');
      }
      else window.alert('Unsuccess response');
    }
    catch (error: any){
      console.log(error.response);
      window.alert('Sth wrong');
    }
    finally{
      refreshPage();
    }
  }
  function Cancel(){
    setCity(initCity);
    refreshPage();
  }

  async function Delete() {
    if(!initCity.id) return;
    try{
      const response = await DELETE(ENDPOINT_URL.DELETE.deleteACity(initCity.id));
      if(response.data.valid){
        window.alert('Delete city successfully');
        history.push(SITE_PAGES.VIEW_CITY_LIST.path);
      }
      else window.alert('Unsuccess response');
    }
    catch (error: any){
      window.alert('Sth wrong');
      console.log(error.response);
    }
  }

  useEffect(()=>{
    setCity(initCity);
  }, [props]);

  return(
    <div className = "flex flew-row w-full h-full">
      <div className = "flex flex-col items-center my-4 border-r w-2/5">
        <div className = "flex flex-col mx-14">
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5 px-1'
            label = {{ value :'ID', position: 'top' }}
            value = { initCity.id }
            onChange ={(e)=>{
              setCity({ ...city, id : e.target.value });
            }}
            disable = {props.type === 'edit'}
          />
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5 px-1'
            label = {{ value :'Title', position: 'top' }}
            value = { initCity?.titles }
            onChange ={(e)=>{
              setCity({ ...city, titles : e.target.value });
            }}
          />
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5 px-1'
            label = {{ value :'Room Id', position: 'top' }}
            value = { initCity?.room_id }
            onChange ={(e)=>{
              setCity({ ...city, room_id : e.target.value });
            }}
          />
          <Input
            border = 'none' 
            type = 'checkbox' 
            classname = 'py-2 mr-4 h-3/5'
            label = {{ value :'Pinned', position: 'left' }}
            checked = {city.is_pinned}
            onChange = {(e)=>{
              setCity({ ...city, is_pinned : e.target.checked });
            }}
          />
        </div>
        <div className= "mt-auto w-full flex flex-row justify-center">
          {(props.type === 'new')? 
            (<Button className="w-2/5 mx-1 h-6" onClick={Add}> 
              Add
            </Button>)
            : 
            (<Button className="w-2/5 mx-1 h-6" onClick={Save}>
              Save
            </Button>)}
          <Button className="w-2/5 mx-1 h-6" onClick={Cancel}>
            Cancel
          </Button>
          {props.type === 'edit' && 
            <Button className="w-2/5 mx-1 h-6" onClick={Delete}>
              <InlineIcon icon = {binSolid} style={{ fontSize: 'inherit' }} />
            </Button>
          }
        </div>
      </div>
      <div className = "flex flex-col items-center w-3/5 my-4">
        <div className="w-full mt-auto">
          <ImageUploader 
            city = {city}
            setCity = {setCity}
          />
        </div>
      </div>
    </div>
  );
}