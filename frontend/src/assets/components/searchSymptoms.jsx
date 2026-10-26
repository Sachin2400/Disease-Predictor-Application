import React from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useGlobalContext } from "./context";

const SymptomSearch = ({
  selectedSymptom,
  setSelectedSymptom,
  handleAddSymptom,
}) => {
  const { options } = useGlobalContext();

  return (
    <div className="flex w-full justify-center gap-3 items-center">
      <Autocomplete
        options={options}
        value={selectedSymptom}
        onChange={(e, newValue) => {
          setSelectedSymptom(newValue);
        }}
        className="searchbox w-full bg-white rounded-lg shadow-xs"
        renderInput={(params) => (
          <TextField
            variant="outlined"
            color="primary"
            {...params}
            label="Enter or select your symptoms..."
          />
        )}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddSymptom}
        className="h-14 px-6 font-semibold shadow-sm"
      >
        Add
      </Button>
    </div>
  );
};

export default SymptomSearch;
