import React from "react";
import {
  Button,
  Container,
  Grid,
  InputLabel,
  Divider,
  MenuItem,
  Select,
  FormControl,
  TextField,
} from "@mui/material";

const PatientForm = ({
  profileData,
  handleInputChange,
  handleFormSubmit,
  patientData,
}) => {
  if (patientData?.new_patient) {
    return (
      <div className="my-8 flex flex-col justify-center max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <h2 className="heading text-3xl font-extrabold text-teal-800 text-center">
            Empowering Your Health Journey — Complete Profile
          </h2>
        </div>
        <Container className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={profileData?.first_name || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={profileData?.last_name || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  name="age"
                  label="Age"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={profileData?.age || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="dropdown-sex-label">Sex</InputLabel>
                  <Select
                    required
                    name="sex"
                    labelId="dropdown-sex-label"
                    value={profileData?.sex || "Male"}
                    onChange={handleInputChange}
                    label="Sex"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <InputLabel sx={{ fontSize: "1.05rem", pl: "4px" }}>
                  Date of Birth
                </InputLabel>
                <Divider sx={{ my: 1 }} />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="dob_day"
                  type="number"
                  label="Day"
                  variant="outlined"
                  fullWidth
                  value={profileData?.dob_day || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="dob_month"
                  label="Month"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={profileData?.dob_month || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="dob_year"
                  label="Year"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={profileData?.dob_year || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  name="height"
                  label="Height (cm)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={profileData?.height || ""}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="weight"
                  label="Weight (kg)"
                  variant="outlined"
                  fullWidth
                  type="number"
                  value={profileData?.weight || ""}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  name="current_med"
                  label="Current Medications (separated by commas)"
                  variant="outlined"
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                  value={
                    Array.isArray(profileData?.current_med)
                      ? profileData.current_med.join(", ")
                      : profileData?.current_med || ""
                  }
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="medical_history"
                  label="Medical History (separated by commas)"
                  variant="outlined"
                  fullWidth
                  type="text"
                  multiline
                  rows={3}
                  value={
                    Array.isArray(profileData?.medical_history)
                      ? profileData.medical_history.join(", ")
                      : profileData?.medical_history || ""
                  }
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="exercise-label">Exercise</InputLabel>
                  <Select
                    labelId="exercise-label"
                    value={profileData?.exercise || "No"}
                    onChange={handleInputChange}
                    name="exercise"
                    label="Exercise"
                  >
                    <MenuItem value="Yoga">Yoga</MenuItem>
                    <MenuItem value="Mild">Mild Exercises - Walks, Jogs</MenuItem>
                    <MenuItem value="Heavy">Heavy Exercises - Running, Lifting</MenuItem>
                    <MenuItem value="No">No Exercise</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel id="diet-label">Diet</InputLabel>
                  <Select
                    labelId="diet-label"
                    value={profileData?.diet || "Vegetarian"}
                    onChange={handleInputChange}
                    name="diet"
                    label="Diet"
                  >
                    <MenuItem value="Vegan">Vegan</MenuItem>
                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="alcohol-cons-label" required>
                    Alcohol Consumption
                  </InputLabel>
                  <Select
                    required
                    name="alcohol_cons"
                    labelId="alcohol-cons-label"
                    value={profileData?.alcohol_cons || "No"}
                    label="Alcohol Consumption"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"No"}>No</MenuItem>
                    <MenuItem value={"Mild"}>Mild</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="smoke-cons-label" required>
                    Smoking Consumption
                  </InputLabel>
                  <Select
                    name="smoke_cons"
                    labelId="smoke-cons-label"
                    value={profileData?.smoke_cons || "No"}
                    label="Smoking Consumption"
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"No"}>No</MenuItem>
                    <MenuItem value={"Mild"}>Mild</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <div className="buttonContainer mt-6 w-full flex justify-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="h-12 px-8 font-semibold shadow-md"
              >
                Submit Profile
              </Button>
            </div>
          </form>
        </Container>
      </div>
    );
  }
  return null;
};

export default PatientForm;
