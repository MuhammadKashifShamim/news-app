import React, { ReactNode } from "react";
import Header from "./Header";
import MainFooter from "./MainFooter";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="layout h-full bg-slate-50 dark:bg-gray-900">
    <Header />
    {props.children}
    <MainFooter />
  </div>
);

export default Layout;
