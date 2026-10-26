import React from "react";
import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked, responseCall } =
    useGlobalContext();

  if (loginButtonClicked) {
    return (
      <>
        {responseCall && (
          <div className="fixed inset-0 bg-black/40 flex flex-col justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
            <div className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow">
              Processing request...
            </div>
          </div>
        )}
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-40 p-4">
          <div className="flex justify-center items-center bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
            <figure className="hidden md:flex md:w-1/2 bg-teal-50 justify-center items-center p-8">
              <img
                src={ModalImg}
                alt="Modal illustration"
                className="w-full max-w-xs object-contain"
              />
            </figure>
            <div className="w-full md:w-1/2 p-4">
              {registrationToggle ? <RegisterForm /> : <LoginForm />}
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};

export default Modal;
