import { ICity } from 'interfaces/city.interface';
import { useState } from 'react';

interface IImageInfo{
  src?: string;
}

interface Props{
  city: ICity;
  setCity: (city: ICity) => void;
}

export default function ImageUploader(props: Props): JSX.Element{
  const [image, setImage] = useState<IImageInfo>();
  const fileSelectedHandler = (e:any) =>{
    const link = URL.createObjectURL(e.target.files[0]);
    setImage({ ...image, src:link });

    const file : File = e.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('image', file, file.name);
      props.setCity({ ...props.city, thumbnail: formData });
    }
  };

  return(
    <div className='w-full flex flex-col items-center'>
      <div className='my-4 mx-1'>
        <img
          src = {image?.src}
          className = 'h-80 w-full shadow object-cover'
        />
      </div>
      <div className='mt-auto'>
        <input type='file' accept="image/png, image/jpeg" onChange={fileSelectedHandler}></input>
      </div>
    </div>
  );
}