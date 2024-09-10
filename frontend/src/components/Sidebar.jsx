import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown.js";

const Sidebar = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className=" col-auto min-vh-100 d-flex justify-content-between flex-column"
          id="sidebar"
        >
          <div>
            <a className="text-decoration-none  d-sm-inline ms-3 mt-2 d-flex text-white align-item-center">
              <i className="fs-4  bi bi-prescription"></i>
              <span className="ms-1 d-none d-sm-inline fs-4">Pharmacy</span>
            </a>

            <hr className="text-dark " />
            <ul className="nav nav-pills flex-column" id="list">
              <li className="nav-item  fs-4">
                <Link to={"/"} className="nav-link  fs-5">
                  <i className="bi bi-speedometer2 "></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              <li className="nav-item  fs-4">
                <div className="dropdown">
                  <Link data-bs-toggle="dropdown" className="nav-link fs-5">
                    <i className="bi bi-grid "></i>
                    <span className="ms-2 d-none d-sm-inline">Products</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/products"} class="dropdown-item text-dark">
                        Products List
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/products/addnew"}
                        class="dropdown-item text-dark"
                        href="#"
                      >
                        ADD Product
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/products/find"}
                        class="dropdown-item text-dark"
                      >
                        Find Product
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nav-item  fs-4">
                <Link to={"/sales"} className="nav-link  fs-5">
                  <i className="bi bi-cash "></i>
                  <span className="ms-2 d-none d-sm-inline">Sale</span>
                </Link>
              </li>
              <li className="nav-item  fs-4">
                <Link to={"/suppliers"} className="nav-link  fs-5">
                  <i className="bi bi-sliders "></i>
                  <span className="ms-2 d-none d-sm-inline">Suppliers</span>
                </Link>
              </li>
              <li className="nav-item  fs-4">
                <Link to={"/purchases"} className="nav-link  fs-5">
                  <i className="bi bi-receipt "></i>
                  <span className="ms-2 d-none d-sm-inline ">Purchases</span>
                </Link>
              </li>
              <li className="nav-item  fs-4">
                <div className="dropdown">
                  <Link data-bs-toggle="dropdown" className="nav-link fs-5">
                    <i className="bi bi-person "></i>
                    <span className="ms-2 d-none d-sm-inline">Users</span>
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to={"/adduser"} class="dropdown-item text-dark">
                        <i className="bi bi-person-add "></i>
                        <span className="ms-2 d-none d-sm-inline">
                          New User
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link to={"/logout"} class="dropdown-item text-dark">
                        <i className="bi bi-box-arrow-left "></i>
                        <span className="ms-2 d-none d-sm-inline">Logout</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
