import { Link } from 'react-router-dom';
import { Searchbar, DivPx } from 'components/common';
import { SITE_PAGES } from 'constants/pages.const';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
  allowSearch?: boolean;
}

export default function Navbar(props: Props): JSX.Element {
  return (
    <div className="flex flex-wrap p-4 w-screen sticky border-b">
      <Link
        to={SITE_PAGES.MAIN.path}
        className="w-10 h-10 px-4 my-2 cursor-pointer rounded-full bg-gray-300"
      ></Link>

      {props.allowSearch && <Searchbar />}
      <div className="py-2 sm:ml-auto flex flex-row-reverse sm:flex-row justify-center cursor-pointer items-center">
        <span className="px-4 hover:text-brown-600">Host</span>
        <DivPx size={8} />
        {!props.isAuthorized ? (
          <div>
            <span className="px-4">Sign up</span>
            <DivPx size={8} />
            <span className="px-4">Login</span>
          </div>
        ) : (
          <Link
            to={SITE_PAGES.MAIN.path}
            className={[
              'p-2 flex items-center rounded-3xl',
              'text-brown-600 bg-brown-100',
              'hover:text-brown-100 hover:bg-brown-600',
            ].join(' ')}
          >
            {/* <img src="#" alt="user-img" className="w-6 h-6 bg-gray-300 rounded-full" /> */}
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <span className="px-2">Username</span>
          </Link>
        )}
      </div>
    </div>
  );
}
