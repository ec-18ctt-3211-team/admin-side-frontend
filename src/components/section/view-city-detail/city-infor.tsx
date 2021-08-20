import { Button, Input } from 'components/common';
import { useEffect, useState } from 'react';
import { binSolid, InlineIcon } from 'utils/icon.utils';
import ImageUploader from 'components/common/image-uploader/image-uploader';
import { ICity } from 'interfaces/city.interface';
import { ENDPOINT_URL } from 'constants/api.const';
import { GET, POST } from 'utils/fetcher.utils';

interface Props{
  type: 'new'| 'edit';
  id? : string;
  city?: ICity;
}

export default function CityInfor(props: Props):JSX.Element{
  let initCity : ICity = { titles: '' , id: '', room_id: '',is_pinned: false };
  if( props.city ) initCity = props.city;

  const [city, setCity] = useState<ICity>({ titles: '' , id: '', room_id: '',is_pinned: false });

  async function submit() {
    if (!city.titles || !city.id || !city.room_id) {
      window.alert('Please fulfill all fields.');
      return;
    }
    const payload = {
      titles: city.titles,
      id: city.id,
      is_pinned: city.is_pinned,
      room_id: city.room_id,
    };
    try{
      const response = await POST(ENDPOINT_URL.POST.createACity, payload);
      console.log(response);
      if(response.data.valid){
        window.alert('Add city successfully');
      }
      else window.alert('Unsuccess response');
    }
    catch{
      window.alert('Sth wrong');
    }
  }
  const CheckBoxHandler = (e:any) =>{
    setCity({ ...city, is_pinned: e.target.checked });
  };

  return(
    <div className = "flex flew-row w-full h-full">
      <div className = "flex flex-col items-center my-4 border-r w-2/5">
        <div className = "flex flex-col mx-14">
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5 px-1'
            label = {{ value :'Title', position: 'top' }}
            value = { props.city?.titles }
            onChange ={(e)=>{
              setCity({ ...city, titles : e.target.value });
            }}
          />
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5 px-1'
            label = {{ value :'Room Id', position: 'top' }}
            value = { props.city?.room_id }
            onChange ={(e)=>{
              setCity({ ...city, room_id : e.target.value });
            }}
          />
          <Input
            border = 'full' 
            type = 'text' 
            classname = 'py-2 mr-4 h-3/5 px-1'
            label = {{ value :'id', position: 'left' }}
            value = { props.city?.id }
            onChange ={(e)=>{
              setCity({ ...city, id : e.target.value });
            }}
          />
          <Input
            border = 'none' 
            type = 'checkbox' 
            classname = 'py-2 mr-4 h-3/5'
            label = {{ value :'Pinned', position: 'left' }}
            checked = {props.city?.is_pinned}
            onClick = {CheckBoxHandler}
          />
        </div>
        <div className= "mt-auto w-full flex flex-row items-center">
          {(props.type === 'new')? 
            (<Button className="w-2/5 mx-1 h-6" onClick={submit}> 
              Add
            </Button>)
            : 
            (<Button className="w-2/5 mx-1 h-6" onClick={submit}>
              Save
            </Button>)}
          <Button className="w-2/5 mx-1 h-6" onClick={()=> setCity(initCity)}>
            Cancel
          </Button>
          <Button className="w-2/5 mx-1 h-6">
            <InlineIcon icon = {binSolid} style={{ fontSize: 'inherit' }} />
          </Button>
        </div>
      </div>
      <div className = "flex flex-col items-center w-3/5 my-4">
        <div className="w-full ">
          <ImageUploader 
            city = {city}
            setCity = {setCity}
          />
        </div>
      </div>
    </div>
  );
}