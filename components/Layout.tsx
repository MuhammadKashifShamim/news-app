import React, { ReactNode } from "react";
import Header from "./Header";
import MainFooter from "./MainFooter";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900">
    <Header />
    <div className="min-h-screen">{props.children}</div>
    <MainFooter />
  </div>
);

export default Layout;
