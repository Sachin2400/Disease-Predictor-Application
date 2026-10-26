import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button } from "@mui/material";
import { useGlobalContext } from "./context";

const Record = ({ record, setRecord }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeRecord = () => {
    setRecord(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("record-modal-overlay")) {
        closeRecord();
      }
    };
    if (record) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [record]);

  if (!record) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50 record-modal-overlay">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 relative">
        <div className="w-full flex justify-end">
          <button onClick={closeRecord} className="hover:scale-105 cursor-pointer">
            <img src={crossIcon} alt="cross-icon" loading="lazy" className="w-5 h-5" />
          </button>
        </div>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            closeRecord();
            handleDashboardSubmit(e);
          }}
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Update Medical Records
          </h1>
          <TextField
            name="current_med"
            label="Current Medications"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={
              Array.isArray(data?.current_med)
                ? data.current_med.join(", ")
                : data?.current_med || ""
            }
          />
          <TextField
            name="medical_history"
            label="Medical History"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            helperText="Separate values by commas"
            onChange={handleDashboardChange}
            value={
              Array.isArray(data?.medical_history)
                ? data.medical_history.join(", ")
                : data?.medical_history || ""
            }
          />
          <Button variant="contained" color="success" type="submit" fullWidth className="mt-2 font-semibold">
            Save Records
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Record;

