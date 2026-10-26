import React, { useRef, useEffect, useState } from "react";
import LoginBtn from "./Login-Button";
import LogoHorizontal from "../img/logo.svg";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";
import cancelIcon from "../img/cross icon.svg";

const Header = () => {
  const { currentUser } = useGlobalContext();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdownMenu = () => {
    setDropdown(!dropdown);
  };

  const handleClickOutsideDropdown = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-gray-100">
      <div className="flex justify-between items-center px-6 md:px-12 h-20 max-w-7xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2">
          <figure className="h-10 w-auto">
            <img
              src={LogoHorizontal}
              alt="Medware Logo"
              className="h-full w-auto object-contain"
            />
          </figure>
          <span className="text-2xl font-bold tracking-tight text-teal-700">Medware</span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-6 text-base font-medium text-gray-700">
          {currentUser ? (
            <div className="flex gap-6 items-center">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? "text-teal-600 font-semibold bg-teal-50" : "hover:text-teal-600"
                  }`
                }
              >
                Predictor
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? "text-teal-600 font-semibold bg-teal-50" : "hover:text-teal-600"
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/contactdoctor"
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg transition-colors ${
                    isActive ? "text-teal-600 font-semibold bg-teal-50" : "hover:text-teal-600"
                  }`
                }
              >
                Consult
              </NavLink>
            </div>
          ) : (
            <div className="flex gap-6 items-center">
              <a href="#services" className="hover:text-teal-600 transition-colors">
                Services
              </a>
              <a href="#about" className="hover:text-teal-600 transition-colors">
                About Us
              </a>
            </div>
          )}
          <LoginBtn />
        </nav>

        <button
          className="block lg:hidden p-2 text-gray-700 hover:text-teal-600 cursor-pointer"
          onClick={toggleDropdownMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {dropdown && (
        <div
          ref={dropdownRef}
          className="fixed top-20 right-4 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-4 lg:hidden z-50"
        >
          <nav className="flex flex-col gap-3 text-base font-medium text-gray-700">
            <button
              className="flex justify-end p-1 hover:bg-gray-100 rounded self-end cursor-pointer"
              onClick={() => setDropdown(false)}
            >
              <img src={cancelIcon} alt="close" className="w-5 h-5" />
            </button>
            {currentUser ? (
              <>
                <NavLink
                  to="/"
                  onClick={() => setDropdown(false)}
                  className="px-3 py-2 hover:bg-teal-50 rounded-lg text-teal-700"
                >
                  Predictor
                </NavLink>
                <div className="border-t border-gray-100 my-1"></div>
                <NavLink
                  to="/dashboard"
                  onClick={() => setDropdown(false)}
                  className="px-3 py-2 hover:bg-teal-50 rounded-lg text-teal-700"
                >
                  Dashboard
                </NavLink>
                <div className="border-t border-gray-100 my-1"></div>
                <NavLink
                  to="/contactdoctor"
                  onClick={() => setDropdown(false)}
                  className="px-3 py-2 hover:bg-teal-50 rounded-lg text-teal-700"
                >
                  Consult
                </NavLink>
              </>
            ) : (
              <>
                <a
                  href="#services"
                  className="px-3 py-2 hover:bg-teal-50 rounded-lg text-teal-700"
                  onClick={() => setDropdown(false)}
                >
                  Services
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a
                  href="#about"
                  className="px-3 py-2 hover:bg-teal-50 rounded-lg text-teal-700"
                  onClick={() => setDropdown(false)}
                >
                  About Us
                </a>
              </>
            )}
            <div className="border-t border-gray-100 my-1"></div>
            <div className="pt-2">
              <LoginBtn />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;

