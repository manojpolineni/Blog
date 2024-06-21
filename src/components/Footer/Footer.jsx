import React from 'react';
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../assets/react.svg";

const links = [
  {
    name: "Home",
    to: "/home",
  },
  {
    name: "Profile",
    to: "/profile",
  },
  {
    name: "Blogs",
    to: "/blogs",
  },
  {
    name: "Contact Us",
    to: "/contact",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white  dark:border-t-[1px]">
      <div className="max-w-7xl mx-auto px-2.5 py-12 sm:px-6 lg:px-3.5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="">
            <Link className="flex items-center">
              <img src={logo} alt="logo" className="h-[45px] lg:h-[50px] " />
              <h4 className="text-2xl font-bold lg:text-3xl mx-2 uppercase">
                Blog
              </h4>
            </Link>
            <p className="font-[400] text-base lg:text-lg my-3">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
              obcaecati maxime, quisquam suscipit nesciunt temporibus ipsa quos
              dolorem dolorum quasie?{" "}
            </p>
          </div>
          <div className="flex flex-col">
            <ul>
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item?.to}
                    className=" text-sm text-white md:text-lg md:font-medium md:leading-7 lg:text-white-500"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <ul>
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item?.to}
                    className=" text-sm text-white md:text-lg md:font-medium md:leading-7 lg:text-white-500"
                  >
                    {item?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li>
                <p className="text-sm font-small mb-5 max-lg:text-lg lg:text-base lg:leading-6 ">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Veniam, atque odit? Maxime culpa id pariatur ipsum, ut, veniam
                  ab similique ipsa facere, non expedita aspernatur esse iure?
                  Repellendus, ea minima?
                </p>
              </li>
              <li className="flex items-center lg:leading-8">
                <FaPhone size={20} />
                <Link to="tel:9502489901" className="mx-2 ">
                  Phone: +91 9502489901
                </Link>
              </li>
              <li className="flex items-center lg:leading-8">
                <FaEnvelope size={20} />
                <Link to="mailto:manojpolineni68@gmail.com" className="mx-2">
                  Email: manojpolineni68@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
