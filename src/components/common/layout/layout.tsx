import Footer from './footer';
import Sidebar from './sidebar';

type Props = {
  children: React.ReactNode;
  allowSearch?: boolean;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="h-full min-h-screen w-full flex flex-col">
      <div className="flex bg-gray-200 h-auto w-full flex-1">
        <Sidebar />
        <div className="p-8 w-[calc(100%-232px)] h-full">{props.children}</div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

/*
    <div className="h-auto min-h-full flex flex-col bg-gray-200">
      <Navbar/>
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="p-4 w-[calc(100%-232px)] h-full">{props.children}</div>
      </div>
      <Footer/>
    </div>*/
