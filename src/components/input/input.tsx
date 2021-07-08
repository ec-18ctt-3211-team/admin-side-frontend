import DivPx from 'components/divpx';

type borderType = 'full' | 'line';
type inputType = 'text' | 'number' | 'date' | 'password';
type positionType = 'left' | 'right' | 'top' | 'bottom';

interface Props {
  border: borderType;
  type: inputType;
  value?: string | number;
  placeholder?: string;
  classname?: string;
  label?: { value: string; position: positionType };
  icon?: { icon: React.ReactNode; position: positionType };
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Input(props: Props): JSX.Element {
  return (
    <div className="flex flex-col w-full h-full">
      {/* top */}
      {(props.icon?.position === 'top' || props.label?.position === 'top') && (
        <div className="flex pb-2">
          {props.icon?.icon}
          <span>{props.label?.value}</span>
        </div>
      )}

      <div className="flex w-full h-full">
        {/* left label  */}
        {props.label?.position === 'left' && (
          <div className="flex">
            <div>{props.label?.value}</div>
            <DivPx size={15} />
          </div>
        )}
        <div
          className={[
            'flex px-4 items-center w-full h-full',
            props.classname,
            props.border === 'full'
              ? 'border rounded-lg'
              : 'border-b-2 border-gray-200',
          ].join(' ')}
        >
          {/* left icon  */}
          {props.icon?.position === 'left' && props.icon?.icon}

          {/* input  */}
          <input
            type={props.type}
            placeholder={props.placeholder}
            className="w-full px-4 focus:outline-none"
            defaultValue={props.value?.toString()}
            onChange={props.onChange}
          />

          {/* right icon  */}
          {props.icon?.position === 'right' && props.icon?.icon}
        </div>

        {/* right label  */}
        {props.label?.position === 'right' && (
          <div className="flex">
            <DivPx size={15} />
            <div>{props.label?.value}</div>
          </div>
        )}
      </div>

      {/* bottom  */}
      {(props.icon?.position === 'bottom' ||
        props.label?.position === 'bottom') && (
        <div className="flex pt-2">
          {props.icon?.icon}
          <span>{props.label?.value}</span>
        </div>
      )}
    </div>
  );
}
