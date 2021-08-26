import { ICity } from 'interfaces/city.interface';
import { useEffect, useRef, useState } from 'react';

interface Props{
  city: ICity;
  setCity: (city: ICity) => void;
  file?: any;
  setFile?: (file: any) => void;
  img?: string;
}

export default function ImageUploader(props: Props): JSX.Element{

  const [preview, setPreview] = useState<string | null>(
    props.city.thumbnail? props.city.thumbnail: '',
  );
  const [message, setMessage] = useState('Choose image to Upload');
  const uploadImage = useRef<HTMLInputElement>(null);

  function fileSelectedHandler() {
    const uploaded = uploadImage.current;
    
    if (uploaded?.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result as string);
          props.setCity({ ...props.city, thumbnail: reader.result as string });
        }
      };
      if (uploaded.files[0] && uploaded.files[0].size <= 1024 * 1024) {
        reader.readAsDataURL(uploaded.files[0]);
      } else {
        setMessage('Image must be under 1MB');
        setPreview(null);
        props.setCity({ ...props.city, thumbnail: '' });
      }
    }
  }
  console.log(props.file);

  return(
    <div className='w-full flex flex-col items-center'>
      <div className='my-4 mx-1'>
        {preview ? (
          <img
            src = {preview}
            alt = {'Should be an image'}
            className = 'h-80 w-full shadow object-cover'
          />
        ):(
          <div className = 'h-80 w-full text-brown-100 flex justify-center items-center'>
            <div>
              {message}
            </div>
          </div>
        )}
      </div>
      <div className='mt-auto w-20 border'>
        <input 
          type='file' 
          accept="image/png, image/jpeg" 
          ref={uploadImage}
          onClick={() => {
            uploadImage.current?.addEventListener('change', fileSelectedHandler);
          }}
        />
      </div>
    </div>
  );
}