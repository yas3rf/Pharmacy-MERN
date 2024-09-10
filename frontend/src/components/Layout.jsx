import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div className="app-container">
        <div className="side-container">
          <Sidebar />
        </div>
        <div className="component-container"></div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
