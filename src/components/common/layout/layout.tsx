import Footer from './footer';
import Sidebar from './sidebar';

type Props = {
  children: React.ReactNode;
  allowSearch?: boolean;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <div>
      <div className="h-screen flex flex-col">
        <div className="flex bg-gray-200 h-full w-full">
          <Sidebar />
          <div className="p-8 w-[calc(100%-232px)]">{props.children}</div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
