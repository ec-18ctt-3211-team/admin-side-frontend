import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';

const Menu = (props: {
  data: { label: string; path: string };
}): JSX.Element => {
  return (
    <Link
      to={props.data.path}
      className="p-4 w-full uppercase font-semibold text-sm text-brown-400 hover:bg-brown-400 hover:text-white"
    >
      {props.data.label}
    </Link>
  );
};

export default function Sidebar(): JSX.Element {
  const username = localStorage.getItem('username');
  const userImg = localStorage.getItem('userImg');
  return (
    <div className="bg-white w-[232px] h-auto flex flex-col">
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
      <Menu data={SITE_PAGES.VIEW_A_ROOM} />
      <Menu data={SITE_PAGES.VIEW_A_HOST} />
      <Menu data={SITE_PAGES.VIEW_A_CUSTOMER} />
      <Menu data={SITE_PAGES.VIEW_COUPON_LIST} />
      <Menu data={SITE_PAGES.VIEW_CITY_LIST} />
    </div>
  );
}
