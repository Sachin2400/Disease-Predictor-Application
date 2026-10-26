import React, { useEffect, useRef } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useGlobalContext } from "./context";

const LogModal = ({ logModal, setLogModal }) => {
  const { fetchData, url, data, setData } = useGlobalContext();
  const afterRef = useRef("");
  const beforeRef = useRef("");
  const highRef = useRef("");
  const lowRef = useRef("");
  const dateRef = useRef("");

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substr(-2);
    const month = currentDate.toLocaleString("default", { month: "short" });
    const day = currentDate.getDate();
    const dateString = `${day} ${month} '${year}`;
    dateRef.current = dateString;
  }, []);

  const closeLogModal = () => {
    setLogModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const highValue = highRef.current?.value;
    const lowValue = lowRef.current?.value;
    const beforeValue = beforeRef.current?.value;
    const afterValue = afterRef.current?.value;
    const dateValue = dateRef.current;

    const updatedFormData = {
      ...data,
      bp_log: {
        date: [...(data?.bp_log?.date || [])],
        high: [...(data?.bp_log?.high || [])],
        low: [...(data?.bp_log?.low || [])],
      },
      blood_glucose: {
        date: [...(data?.blood_glucose?.date || [])],
        before: [...(data?.blood_glucose?.before || [])],
        after: [...(data?.blood_glucose?.after || [])],
      },
    };

    if (highValue && lowValue) {
      updatedFormData.bp_log.high.push(highValue);
      updatedFormData.bp_log.low.push(lowValue);
      updatedFormData.bp_log.date.push(dateValue);
    }

    if (beforeValue && afterValue) {
      updatedFormData.blood_glucose.before.push(beforeValue);
      updatedFormData.blood_glucose.after.push(afterValue);
      updatedFormData.blood_glucose.date.push(dateValue);
    }

    setData(updatedFormData);

    try {
      await axios.put(url, updatedFormData, {
        withCredentials: true,
      });
      await fetchData();
    } catch (error) {
      console.error(error);
    }
    closeLogModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("log-modal-overlay")) {
        closeLogModal();
      }
    };
    if (logModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logModal]);

  if (!logModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50 log-modal-overlay">
      <div className="flex flex-col gap-4 items-center w-96 sm:w-110 bg-white p-6 rounded-xl shadow-2xl relative">
        <div className="w-full flex justify-end">
          <button onClick={closeLogModal} className="hover:scale-105 cursor-pointer">
            <img src={crossIcon} alt="cross-icon" loading="lazy" className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">MEDICAL LOG</h1>
        <form
          className="w-full flex flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <h2 className="p-1 text-sm text-teal-600 font-semibold bg-teal-50 rounded px-3">
            Today: {dateRef.current}
          </h2>
          <h3 className="w-full text-base font-semibold text-gray-700">
            Blood Pressure Level (mmHg)
          </h3>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="high"
                label="High (Systolic)"
                inputRef={highRef}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="low"
                label="Low (Diastolic)"
                inputRef={lowRef}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <h3 className="w-full text-base font-semibold text-gray-700">
            Glucose Level (mg/dL)
          </h3>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="before"
                label="Before Breakfast"
                inputRef={beforeRef}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="after"
                label="After Breakfast"
                inputRef={afterRef}
                type="number"
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="success" type="submit" fullWidth className="mt-2">
            Add Measurement
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogModal;
