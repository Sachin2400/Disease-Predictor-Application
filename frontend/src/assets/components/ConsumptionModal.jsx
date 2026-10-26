import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ConsumptionModal = ({ consumptionModal, setConsumptionModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeConsumptionModal = () => {
    setConsumptionModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal-overlay")) {
        closeConsumptionModal();
      }
    };
    if (consumptionModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [consumptionModal]);

  if (!consumptionModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50 modal-overlay">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-2xl w-96 relative">
        <div className="w-full flex justify-end">
          <button
            onClick={closeConsumptionModal}
            className="z-50 hover:scale-105 cursor-pointer"
          >
            <img src={crossIcon} alt="cross-icon" loading="lazy" className="w-5 h-5" />
          </button>
        </div>
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            closeConsumptionModal();
            handleDashboardSubmit(e);
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <h1 className="text-2xl font-semibold text-gray-800 text-center">
                Consumption Data
              </h1>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="smoke-label">Smoking Consumption</InputLabel>
                <Select
                  labelId="smoke-label"
                  value={data?.smoke_cons || "No Consumption"}
                  onChange={handleDashboardChange}
                  name="smoke_cons"
                  label="Smoking Consumption"
                >
                  <MenuItem value={"No Consumption"}>Non Smoker</MenuItem>
                  <MenuItem value={"Mild Smoking"}>Mild Smoking</MenuItem>
                  <MenuItem value={"Oftenly Smokes/ Addiction"}>Addiction</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="alcohol-label">Alcohol Consumption</InputLabel>
                <Select
                  labelId="alcohol-label"
                  value={data?.alcohol_cons || "No Consumption"}
                  onChange={handleDashboardChange}
                  name="alcohol_cons"
                  label="Alcohol Consumption"
                >
                  <MenuItem value={"No Consumption"}>No Consumption</MenuItem>
                  <MenuItem value={"Mild Consumption"}>Mild Consumption</MenuItem>
                  <MenuItem value={"High Consumption"}>High Consumption</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="outlined" color="success" type="submit" fullWidth>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ConsumptionModal;
