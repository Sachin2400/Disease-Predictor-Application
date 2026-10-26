import React, { useRef, useState, useEffect } from "react";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "./Prediction";
import dpImg from "../img/dp-image.svg";

const DpWindow = () => {
  const { options } = useGlobalContext();
  const index = useRef(null);
  const allSymptomsString = useRef(null);
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [copySymptoms, setCopySymptoms] = useState([]);
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length + 1).fill("0")
  );
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const handleAddSymptom = () => {
    if (selectedSymptom && !isDuplicate(selectedSymptom)) {
      index.current = options.indexOf(selectedSymptom) + 1;
      setSelectedSymptom(null);
      addSymptom(selectedSymptom);
    } else if (isDuplicate(selectedSymptom)) {
      alert("This symptom has already been added!");
    } else {
      alert("Choose a valid symptom");
    }
  };

  const handleClick = () => {
    if (symptoms.length !== 0) {
      setCopySymptoms([...allSymptoms]);
    }
  };

  const clearSymptoms = () => {
    setSymptoms([]);
    setAllSymptoms(Array(options.length + 1).fill("0"));
    setPrediction(false);
  };

  const addSymptom = (symptom) => {
    if (!symptom) return;
    if (!isDuplicate(symptom)) {
      setSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms((prevSymptoms) => prevSymptoms.filter((s) => s !== symptom));
    const symptomIndex = options.indexOf(symptom) + 1;
    setAllSymptoms((prevAllSymptoms) => {
      const newAllSymptoms = [...prevAllSymptoms];
      newAllSymptoms[symptomIndex] = "0";
      return newAllSymptoms;
    });

    if (symptoms.length === 1) {
      setPrediction(false);
    }
  };

  useEffect(() => {
    if (index.current !== null) {
      const newSymptomsArray = [...allSymptoms];
      newSymptomsArray[index.current] = "1";
      setAllSymptoms(newSymptomsArray);
    }
  }, [symptoms]);

  useEffect(() => {
    if (copySymptoms.length > 0) {
      allSymptomsString.current = copySymptoms.join("");
      axios
        .get(`http://127.0.0.1:8000/prediction/${allSymptomsString.current}/`)
        .then((response) => {
          if (symptoms.length !== 0) {
            setPrediction(response.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [copySymptoms]);

  return (
    <div className="dpWindow w-full flex items-center flex-col justify-start max-w-7xl mx-auto px-4 py-8">
      <div className="bttns-container flex w-full md:w-3/4 lg:w-2/3 justify-center mb-8">
        <SymptomSearch
          handleAddSymptom={handleAddSymptom}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
      </div>

      <div className="symptoms w-full flex flex-col lg:flex-row justify-center gap-8 mb-16">
        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div className="w-full">
            <h2 className="w-full text-xl lg:text-2xl font-bold text-gray-800 mb-4">
              Your Selected Symptoms ({symptoms.length})
            </h2>
            <div className="flex flex-wrap bg-teal-50/50 p-4 rounded-xl min-h-36 max-h-64 overflow-y-auto w-full gap-2 border border-teal-100">
              {symptoms.length === 0 ? (
                <div className="text-gray-400 italic flex items-center justify-center w-full h-24">
                  Add symptoms from the search box above
                </div>
              ) : (
                symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="added-symptom py-1.5 px-3 bg-white border border-teal-200 rounded-full flex items-center gap-2 shadow-xs text-sm text-teal-900"
                  >
                    <span>{symptom}</span>
                    <button
                      onClick={() => removeSymptom(symptom)}
                      className="cursor-pointer hover:opacity-75"
                    >
                      <img src={cancelIcon} alt="remove" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="btn-container w-full flex gap-3 mt-6">
            <Button
              variant="contained"
              color="primary"
              onClick={handleClick}
              disabled={symptoms.length === 0}
              className="flex-1 h-11 font-semibold"
            >
              Run AI Prediction
            </Button>
            <Button
              variant="outlined"
              color="error"
              className="h-11 font-semibold"
              onClick={clearSymptoms}
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            Predicted Diagnosis &amp; Probability
          </h2>
          {prediction ? (
            <Prediction prediction={prediction} />
          ) : (
            <div className="w-full h-full min-h-56 bg-sky-50/50 rounded-xl flex items-center justify-center text-gray-400 italic border border-sky-100">
              Select symptoms and click "Run AI Prediction" to see probabilities
            </div>
          )}
        </div>
      </div>

      <section className="w-full flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-teal-50 to-emerald-50 p-8 rounded-3xl border border-teal-100">
        <div className="hero flex flex-col justify-center md:w-3/5">
          <div className="hero-text text-2xl lg:text-3xl font-extrabold text-teal-900 mb-3">
            About our Disease Predictor Model
          </div>
          <div className="text-sm lg:text-base text-gray-600 leading-relaxed">
            Introducing our advanced disease prediction engine trained on medical datasets across 41 common pathologies using Support Vector Classifiers (SVC) with probabilistic hyperplanes and balanced oversampling. Gain immediate insights into potential clinical risks and find recommended medical specialties.
          </div>
        </div>
        <div className="img-wrapper w-full md:w-2/5 flex justify-center">
          <img src={dpImg} alt="Disease Predictor AI" className="w-full max-w-xs object-contain" />
        </div>
      </section>
    </div>
  );
};

export default DpWindow;
