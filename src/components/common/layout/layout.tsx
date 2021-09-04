import Navbar from './navbar';
import Sidebar from './sidebar';

type Props = {
  children: React.ReactNode;
  allowSearch?: boolean;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gray-200">
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <div className="md:hidden">
        <Navbar />
      </div>
      <div className="p-8 w-full md:w-[calc(100%-232px)]">{props.children}</div>
    </div>
  );
}
