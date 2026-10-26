import React from "react";
import { Button } from "@mui/material";
import servicesImg from "../img/services-img.svg";
import diseasePredImg from "../img/diseasepredictor.svg";
import { useGlobalContext } from "./context";

const Services = () => {
  const { setLoginButtonClicked } = useGlobalContext();

  return (
    <section id="services" className="w-full flex flex-col items-center py-16 px-6 max-w-7xl mx-auto">
      <div className="services-container flex flex-col md:flex-row items-center justify-between gap-12 w-full mb-20">
        <div className="img-wrapper w-full md:w-1/2 flex justify-center">
          <img src={servicesImg} alt="Healthcare services" className="w-full max-w-md object-contain" />
        </div>
        <div className="hero flex flex-col justify-center w-full md:w-1/2 text-center md:text-left">
          <div className="hero-text text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Access Quality Healthcare Assistance Anytime, Anywhere
          </div>
          <div className="hero-stanza text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
            Medware provides you with your go-to healthcare service from the ease of your device from any location! Connect with verified medical specialists in multiple fields.
          </div>
          <div className="flex justify-center md:justify-start">
            <Button
              variant="contained"
              color="primary"
              className="h-11 px-6 font-semibold"
              onClick={() => setLoginButtonClicked(true)}
            >
              Explore Specialists
            </Button>
          </div>
        </div>
      </div>

      <div className="disease-predictor flex flex-col md:flex-row-reverse items-center justify-between gap-12 w-full bg-teal-50/50 p-8 sm:p-12 rounded-3xl border border-teal-100">
        <div className="img-wrapper w-full md:w-1/2 flex justify-center">
          <img
            src={diseasePredImg}
            alt="Disease Predictor AI"
            className="w-full max-w-md object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 text-center md:text-left">
          <div className="text-3xl lg:text-4xl font-extrabold text-teal-900 mb-4">
            Feeling low? Check Symptoms in Seconds
          </div>
          <div className="text-base lg:text-lg text-gray-600 mb-8 leading-relaxed">
            Use our built-in Disease Predictor powered by trained Support Vector Classifier (SVC) machine learning algorithms and get recommended medical assistance instantly based on 129 distinct clinical indicators.
          </div>
          <div className="hero-btn-container flex gap-4 justify-center md:justify-start flex-wrap">
            <Button
              variant="contained"
              color="primary"
              className="h-12 px-6 font-semibold shadow-md"
              onClick={() => setLoginButtonClicked(true)}
            >
              Disease Predictor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="h-12 px-6 font-semibold"
              onClick={() => setLoginButtonClicked(true)}
            >
              Contact Doctor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
