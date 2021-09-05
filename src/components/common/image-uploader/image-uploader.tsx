import { useRef, useState } from 'react';

interface Props {
  image: any;
  setImage: (image: any) => void;
  disable?: boolean;
}

export default function UploadImage(props: Props): JSX.Element {
  const [preview, setPreview] = useState<string | null>(
    props.image ? props.image.path : '',
  );
  const [message, setMessage] = useState('Choose image to Upload');
  const uploadImage = useRef<HTMLInputElement>(null);

  function uploadAnImage() {
    const uploaded = uploadImage.current;
    if (uploaded?.files) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result as string);
          props.setImage(reader.result as string);
        }
      };
      if (uploaded.files[0]) {
        if (uploaded.files[0].size <= 1024 * 1024 * 4)
          reader.readAsDataURL(uploaded.files[0]);
        else {
          setMessage('Please input image that under 4MB');
          setPreview(null);
          props.setImage('');
        }
      }
    }
  }

  return (
    <div className="w-full h-full">
      <input type="file" accept=".png,.jpg" ref={uploadImage} hidden />
      <div
        className={[
          'border border-gray-200 rounded-6 select-none',
          'p-4 w-full h-full flex flex-col justify-center items-center',
          'border-dashed border-gray-200 text-gray-500',
          props.disable ? 'cursor-default' : 'cursor-pointer',
        ].join(' ')}
        onClick={() => {
          if (props.disable) {
            setMessage('Please fill in the previous image before continue');
            return;
          }
          uploadImage.current?.click();
          uploadImage.current?.addEventListener('change', uploadAnImage);
        }}
      >
        {!preview ? (
          <div className="py-8 text-sm text-center">{message}</div>
        ) : (
          <img
            src={preview}
            alt="upload"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
