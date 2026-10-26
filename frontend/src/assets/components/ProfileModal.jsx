import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useGlobalContext } from "./context";

const ProfileModal = ({ profileModal, setProfileModal }) => {
  const { handleDashboardChange, data, handleDashboardSubmit } =
    useGlobalContext();

  const closeModal = () => {
    setProfileModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("profile-modal-overlay")) {
        closeModal();
      }
    };
    if (profileModal) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileModal]);

  if (!profileModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/50 z-50 profile-modal-overlay">
      <div className="flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-2xl max-w-xl w-full mx-4 max-h-[90vh] overflow-y-auto relative">
        <div className="w-full flex justify-end">
          <button onClick={closeModal} className="hover:scale-105 cursor-pointer">
            <img src={crossIcon} alt="cross-icon" loading="lazy" className="w-5 h-5" />
          </button>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 pb-4">Edit Profile</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDashboardSubmit(e);
            closeModal();
          }}
          className="w-full flex flex-col gap-4 items-center"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="first_name"
                label="First Name"
                fullWidth
                size="small"
                value={data?.first_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="last_name"
                label="Last Name"
                fullWidth
                size="small"
                value={data?.last_name || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Age"
                fullWidth
                type="number"
                size="small"
                value={data?.age || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="edit-sex-label">Sex</InputLabel>
                <Select
                  name="sex"
                  labelId="edit-sex-label"
                  value={data?.sex || "Male"}
                  label="Sex"
                  onChange={handleDashboardChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="height"
                label="Height (cm)"
                fullWidth
                type="number"
                size="small"
                value={data?.height || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="weight"
                label="Weight (Kg)"
                fullWidth
                type="number"
                size="small"
                value={data?.weight || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_day"
                label="Day"
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={data?.dob_day || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob_month"
                label="Month"
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={data?.dob_month || ""}
                onChange={handleDashboardChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob_year"
                label="Year"
                variant="outlined"
                fullWidth
                size="small"
                type="number"
                value={data?.dob_year || ""}
                onChange={handleDashboardChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="edit-diet-label">Diet Type</InputLabel>
                <Select
                  name="diet"
                  labelId="edit-diet-label"
                  value={data?.diet || "Vegetarian"}
                  label="Diet Type"
                  onChange={handleDashboardChange}
                >
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel id="edit-ex-label">Exercise</InputLabel>
                <Select
                  name="exercise"
                  labelId="edit-ex-label"
                  value={data?.exercise || "No"}
                  label="Exercise"
                  onChange={handleDashboardChange}
                >
                  <MenuItem value="Yoga">Yoga</MenuItem>
                  <MenuItem value="Mild Exercises">Mild Exercises - Walks, Jogs</MenuItem>
                  <MenuItem value="Heavy Exercises">Heavy Exercises - Running, Lifting</MenuItem>
                  <MenuItem value="No">No Exercise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="w-48 mt-4 font-semibold"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;

