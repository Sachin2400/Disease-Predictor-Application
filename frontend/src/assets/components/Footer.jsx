import React from "react";
import footer_logo from "../img/footerimg.svg";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="mx-auto w-full max-w-screen-xl p-6 py-8">
        <div className="md:flex md:justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <img src={footer_logo} className="h-8 mr-3" alt="Footer Logo" />
              <span className="self-center text-2xl font-bold text-gray-800">
                Medware
              </span>
            </a>
            <p className="text-gray-500 text-sm mt-2 max-w-sm">
              Empowering proactive healthcare with advanced Machine Learning and comprehensive health tracking.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>
                  <a href="https://github.com/Sachin2400/Disease-Predictor-Application" className="hover:underline">
                    Github
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Discord
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200" />
        <div className="sm:flex sm:items-center sm:justify-between text-center sm:text-left">
          <span className="text-sm text-gray-500">
            © 2026 <a href="/" className="hover:underline">Medware™</a>. All Rights Reserved.
          </span>
          <div className="flex justify-center space-x-6 mt-4 sm:mt-0">
            <span className="text-xs text-gray-400">
              UPSC / Clinical Healthcare Innovation Engine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

