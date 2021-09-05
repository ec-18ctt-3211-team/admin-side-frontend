import { Link, useHistory, useLocation } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { Icon, Outline } from 'utils/icon.utils';

const Menu = (props: {
  data: { label: string; path: string };
  isChosen?: boolean;
}): JSX.Element => {
  return (
    <Link
      to={props.data.path}
      className={[
        'p-4 w-full uppercase font-semibold text-sm',
        'hover:bg-brown-400 hover:text-white',
        props.isChosen ? 'bg-brown-400 text-white' : 'bg-white text-brown-400',
      ].join(' ')}
    >
      {props.data.label}
    </Link>
  );
};

export default function Sidebar(): JSX.Element {
  const username = localStorage.getItem('username');
  const userImg = localStorage.getItem('userImg');
  const history = useHistory();
  const location = useLocation();

  function Logout() {
    localStorage.removeItem('userID');
    localStorage.removeItem('username');
    localStorage.removeItem('userImg');
    localStorage.removeItem('auth-token');
    history.push(SITE_PAGES.ADMIN_LOG_IN.path);
  }

  return (
    <div className="bg-white w-[232px] min-h-full flex flex-col">
      <div
        className={[
          'p-2 m-4 flex items-center rounded-3xl w-2/3',
          'text-brown-600 bg-brown-100',
          'hover:text-brown-100 hover:bg-brown-600',
        ].join(' ')}
      >
        {userImg ? (
          <img src={userImg} className="w-8 h-8 bg-gray-300 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        )}
        <span className="px-2">{username}</span>
      </div>
      <Menu
        data={SITE_PAGES.VIEW_A_ROOM}
        isChosen={location.pathname.includes(SITE_PAGES.VIEW_A_ROOM.path)}
      />
      <Menu
        data={SITE_PAGES.VIEW_A_HOST}
        isChosen={location.pathname.includes(SITE_PAGES.VIEW_A_HOST.path)}
      />
      <Menu
        data={SITE_PAGES.VIEW_A_CUSTOMER}
        isChosen={location.pathname.includes(SITE_PAGES.VIEW_A_CUSTOMER.path)}
      />
      <Menu
        data={SITE_PAGES.VIEW_AN_ORDER}
        isChosen={location.pathname.includes(SITE_PAGES.VIEW_AN_ORDER.path)}
      />
      <Menu
        data={SITE_PAGES.VIEW_CITY_LIST}
        isChosen={location.pathname.includes(SITE_PAGES.VIEW_CITY_LIST.path)}
      />
      <div className="mt-auto flex justify-evenly items-center px-4 py-2 select-none cursor-pointer hover:text-brown-500 hover:text-lg">
        <Icon icon={Outline.logout} className="text-2xl" />
        <div onClick={Logout}>Log out</div>
      </div>
    </div>
  );
}
