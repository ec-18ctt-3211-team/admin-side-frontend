import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import Sidebar from './sidebar';

type Props = {
  children: React.ReactNode;
};

export default function Layout(props: Props): JSX.Element {
  return (
    <div className="min-h-full flex flex-col bg-gray-200">
      <Navbar/>
      <div className="flex h-full w-full">
        <Sidebar />
        <div className="p-4 w-[calc(100%-232px)] h-full">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}
