import { ICity } from 'interfaces/city.interface';
import { useEffect, useState } from 'react';

interface IImageInfo{
  src?: string;
}

interface Props{
  city: ICity;
  setCity: (city: ICity) => void;
  file: any;
  setFile: (file: any) => void;
  img?: string;
}

export default function ImageUploader(props: Props): JSX.Element{
  const initImage : IImageInfo = { src : '' };
  if(props.img) initImage.src = props.img;

  const [image, setImage] = useState<IImageInfo>(initImage);

  const fileSelectedHandler = (e:any) =>{
    const link = URL.createObjectURL(e.target.files[0]);
    setImage({ ...image, src:link });

    props.setFile(e.target.files[0]);
    props.setCity({ ...props.city, thumbnail: link });
  };

  return(
    <div className='w-full flex flex-col items-center'>
      <div className='my-4 mx-1'>
        {image.src ? (
          <img
            src = {image?.src}
            className = 'h-80 w-full shadow object-cover'
          />
        ):(
          <div className = 'h-80 w-full'></div>
        )}
      </div>
      <div className='mt-auto'>
        <input 
          type='file' 
          accept="image/png, image/jpeg" 
          onChange={fileSelectedHandler}/>
      </div>
    </div>
  );
}