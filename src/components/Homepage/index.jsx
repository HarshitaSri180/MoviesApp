import React, { useState } from "react";
import SecondComp from "./secondComp";
import "./style.css";
import { Link } from "react-router-dom";
import MyList from "../myList";
import menu from "../../assets/images/menu.png";

export default function Index({ setMyList }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Sidebar closed by default on small screens
  // const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [clickvariable, setClickvariable] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button for Mobile */}
      <span
        className="lg:hidden absolute text-white text-4xl top-5 left-4 cursor-pointer z-50"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <i className="bi bi-x px-2 mt-2  rounded-md">X</i>
        ) : (
          <div>
            <img className="bi bi-filter-left px-2  rounded-md " src={menu} />
          </div>
        )}
      </span>

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 p-2 w-[300px] bg-gray-900 text-center transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center justify-between">
            <h1 className="font-bold text-4xl text-gray-200">Moviffes App</h1>
            <i
              className="bi bi-x cursor-pointer lg:hidden"
              onClick={toggleSidebar}
            ></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>

        <Link to="/">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-500 text-white">
            <i className="bi bi-house-door-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold ">
              Home
            </span>
          </div>
        </Link>

        <Link to="/myList">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-500 text-white">
            <i className="bi bi-bookmark-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              My List
            </span>
          </div>
        </Link>

        <div className="my-4 bg-gray-600 h-[1px]"></div>

        <Link to="/logout">
          <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-red-500 text-white">
            <i className="bi bi-chat-left-text-fill"></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout
            </span>
          </div>
        </Link>
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } lg:ml-64`}
      >
        <SecondComp setMyList={setMyList} />
      </div>
    </div>
  );
}
