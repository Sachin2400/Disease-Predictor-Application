import React from "react";
import hero_img from "../img/hero-img.svg";
import Button from "@mui/material/Button";
import { useGlobalContext } from "./context";

const Hero = () => {
  const { setLoginButtonClicked, setRegistrationToggle } = useGlobalContext();

  return (
    <div className="w-4/5 hero-container pt-20 lg:pt-10 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
      <div className="hero flex flex-col text-center md:text-left md:w-1/2">
        <div className="hero-text text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Your Healthcare, Simplified
        </div>
        <div className="hero-stanza text-lg text-gray-600 mb-8 leading-relaxed">
          Experience optimal health with simplified solutions, just a click away! Access intelligent machine learning prognosis and manage your personal medical logs seamlessly.
        </div>
        <div className="hero-btn-container flex justify-center md:justify-start gap-4">
          <Button
            variant="contained"
            color="primary"
            className="hover:scale-105 h-12 px-6 rounded-lg font-semibold shadow-md transition-transform"
            onClick={() => {
              setRegistrationToggle(true);
              setLoginButtonClicked(true);
            }}
          >
            Join Us!
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="hover:scale-105 h-12 px-6 rounded-lg font-semibold transition-transform"
            onClick={() => {
              setLoginButtonClicked(true);
              setRegistrationToggle(false);
            }}
          >
            Already a member?
          </Button>
        </div>
      </div>
      <div className="img-wrapper w-80 sm:w-96 lg:w-1/2 flex justify-center">
        <img src={hero_img} alt="Hero illustration" className="block w-full max-w-md object-contain" />
      </div>
    </div>
  );
};

export default Hero;
