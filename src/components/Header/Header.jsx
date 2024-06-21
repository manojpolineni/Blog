import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/react.svg";
import { FaArrowRightToBracket, FaBell, FaMoon, FaSun, FaUser } from "react-icons/fa6";
import { FaPenSquare } from "react-icons/fa";
import userImage from "../../assets/userone.png";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../redux/AuthSlice";
import { UserInfoContext } from "../../UserContextInfo/UserInfo.jsx";
import { toggleTheme } from "../../redux/theme/theme.js";
import getNotifications from "../Notifications/getNotifications.jsx";

const links = [
  {
    name: "Home",
    to: "/home",
  },
  {
    name: "Todos",
    to: "/todos",
  },
  {
    name: "Create Blog",
    to: "/createblog",
  },
  {
    name: "Contact Us",
    to: "/contact",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { currentUser } = useContext(UserInfoContext);
  const { userName, profilePic } = currentUser || {};
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogOut = () => {
    dispatch(logOutUser());
    localStorage.clear();
    navigate("/", { replace: true });
    location.reload(true);
  };

  useEffect(() => {
    profilePic
  }, [currentUser]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='w-full sticky top-0 z-10 shadow h-[60px]'>
      <nav className="bg-gray-800 sm:relative sm:z-10 lg:z-10 dark:shadow-lg z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="flex">
              <Link to='/home' className="flex-shrink-0 flex items-center text-white font-bold">
                <img src={logo} alt="" className="h-[40px]" />
                <h4 className="text-lg font-medium lg:text-2xl lg:font-bold mx-2 uppercase">
                  Blog
                </h4>
              </Link>
            </div>
            <div className="hidden md:block lg:flex lg:items-center lg:justify-center">
              <ul className="ml-10 flex justify-center items-center">
                {links.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item?.to}
                      className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-lg"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end items-center">
              <button className='flex items-center'
                onClick={() => dispatch(toggleTheme())}
              >
                {theme === 'light' ? <FaSun size = { 24 } className = 'text-slate-300' /> : <FaMoon  size={24} />}
              </button>
            </div>
            <div className="md:hidden xl:hidden block">
              <Link to='/notifications'>
                <FaBell size={22} className="text-white dark:text-white font-bold" />
              </Link> 
            </div>
            <div className="flex items-center">
              <div className="relative flex justify-between items-center">
                <h2 className="text-lg font-medium text-white mx-2 capitalize ">
                  Welcome {userName}
                </h2>
                <img src={currentUser && currentUser.profilePic ? `http://localhost:8089/${currentUser.profilePic}` : userImage} alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onMouseEnter={toggleDropdown}
                />
                {isDropdownOpen && (
                  <div
                    className="absolute flex flex-col top-8 right-0 mt-2 w-44 h-auto bg-white rounded-lg shadow-lg z-10 py-3 px-5"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <Link
                      to="/profile"
                      className="flex items-center py-2 text-lg text-gray-800 gap-3.5 hover:text-blue-500"
                    >
                      <FaUser size={22} />
                      Profile
                    </Link>
                    <Link
                      to="/myblogs"
                      className="flex items-center py-2 text-lg text-gray-800 gap-3.5 hover:text-blue-500"
                    >
                      <FaPenSquare size={22} />
                      My Blogs
                    </Link>
                    <Link
                      onClick={handleLogOut}
                      className="flex text-lg items-center py-2 gap-3.5 text-gray-800 hover:text-blue-500 "
                    >
                      <FaArrowRightToBracket size={22} className="rotate-180" />
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 px-4 py-2 rounded-md"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden sm:relative">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <ul className="ml-5 flex flex-col sm:z-10 ">
                {links.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item?.to}
                      className="text-white text-xl leading-relaxed hover:bg-gray-700 px-3 py-2 rounded-md"
                    >
                      {item?.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
