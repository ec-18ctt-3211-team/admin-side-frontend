import Input from 'components/common/input/input';
import { Button } from 'components/common';
import { Icon, Outline, Solid } from 'utils/icon.utils';

import './Form.css';
import { IUserInfo } from 'interfaces/user.interface';

interface IFormInput {
  type: 'SignUp' | 'LogIn' | 'AdminLogIn';
  title?: string;
  onClick?: () => void;
  userInfo: IUserInfo;
  setUserInfo: (user: IUserInfo) => void;
}

export const Form: React.FC<IFormInput> = (props: IFormInput) => {
  const { type, title } = props;
  return (
    <div className="flex justify-center">
      <div className="login-component">
        {type === 'SignUp' && (
          <h1 className="text-4xl font-bold py-4">{title}</h1>
        )}
        {(type === 'LogIn' || type === 'AdminLogIn') && (
          <h1 className="text-4xl font-bold py-4">{title}</h1>
        )}
        <div className="py-2 h-full">
          <Input
            border="full"
            type="text"
            placeholder="email"
            classname="py-2"
            icon={{ icon: <Icon icon={Outline.envelope} />, position: 'right' }}
            onChange={(e) =>
              props.setUserInfo({ ...props.userInfo, email: e.target.value })
            }
          />
        </div>

        {type === 'SignUp' && (
          <div className="py-2 h-full">
            <Input
              border="full"
              type="text"
              placeholder="full name"
              classname="py-2"
              icon={{ icon: <Icon icon={Solid.user} />, position: 'right' }}
            />
          </div>
        )}

        {type === 'SignUp' && (
          <div className="py-2 h-full">
            <Input
              border="full"
              type="text"
              placeholder="phone number"
              classname="py-2"
              icon={{ icon: <Icon icon={Outline.phone} />, position: 'right' }}
            />
          </div>
        )}

        <div className="py-2 h-full">
          <Input
            border="full"
            type="password"
            placeholder="password"
            classname="py-2"
            icon={{ icon: <Icon icon={Outline.password} />, position: 'right' }}
            onChange={(e) =>
              props.setUserInfo({ ...props.userInfo, password: e.target.value })
            }
          />
        </div>

        {type === 'SignUp' && (
          <div className="py-2 h-full">
            <Input
              border="full"
              type="password"
              placeholder="confirm password"
              classname="py-2"
              icon={{
                icon: <Icon icon={Outline.password} />,
                position: 'right',
              }}
            />
          </div>
        )}

        <div className="w-full flex justify-center py-4">
          {type === 'SignUp' && (
            <Button children="Sign Up" className="py-2 w-2/3 h-full"></Button>
          )}
          {(type === 'LogIn' || type === 'AdminLogIn') && (
            <Button
              children="Log In"
              className="py-2 w-2/3 h-full"
              onClick={props.onClick}
            ></Button>
          )}
        </div>
        {type === 'LogIn' && <p className="italic my-4">or</p>}
        {type === 'LogIn' && (
          <p className="italic" id="p-link">
            create a new account
          </p>
        )}
      </div>
    </div>
  );
};
