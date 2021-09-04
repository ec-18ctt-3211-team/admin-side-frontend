import Input from 'components/common/input/input';
import { Icon, Outline, Solid } from 'utils/icon.utils';

import './user-info.css';
import { IUserInfo } from 'interfaces/user.interface';

interface IFormInput {
  user?: IUserInfo;
}

export const UserInfo: React.FC<IFormInput> = (props: IFormInput) => {
  const { user } = props;
  return (
    <div className="flex justify-center">
      <div className="infor-component">
        <h1 className="text-4xl font-bold pt-4 pb-2">{user?.username}</h1>
        <div className="py-2 ">
          <Input
            border="full"
            type="text"
            placeholder="email"
            classname="py-2"
            value={user?.email}
            icon={{ icon: <Icon icon={Outline.envelope} />, position: 'right' }}
            disable
          />
        </div>

        <div className="py-2">
          <Input
            border="full"
            type="text"
            placeholder="full name"
            classname="py-2"
            value={user?.username}
            icon={{ icon: <Icon icon={Solid.user} />, position: 'right' }}
            disable
          />
        </div>

        <div className="py-2 ">
          <Input
            border="full"
            type="text"
            placeholder="phone number"
            classname="py-2"
            value={user?.phone_number}
            icon={{ icon: <Icon icon={Outline.phone} />, position: 'right' }}
            disable
          />
        </div>
      </div>
    </div>
  );
};
