import React, { useState } from "react";
import { useGlobalContext } from "./context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import cancelIcon from "../img/cross icon.svg";
import SignIn from "./GoogleSignIn";

const LoginForm = () => {
  const [errorDisplay, setErrorDisplay] = useState("");
  const { email, password, submitLogin, closeModal, error } =
    useGlobalContext();
  const [user_email, setUserEmail] = useState("");
  const [user_password, setUserPassword] = useState("");

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
      <div className="flex justify-end mb-2">
        <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
          <img src={cancelIcon} alt="cross" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Hello Again!
          </h2>
          <p className="text-center text-sm text-gray-500">
            Welcome back, you've been missed!
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setErrorDisplay(error.current);
            submitLogin(event);
          }}
          className="flex flex-col justify-center gap-4"
        >
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            type="email"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              email.current = event.target.value;
            }}
            helperText="We'll never share your email"
            color="success"
            required
            fullWidth
          />
          <TextField
            id="formBasicPassword"
            label="Password"
            type="password"
            variant="outlined"
            value={user_password}
            onChange={(event) => {
              setUserPassword(event.target.value);
              password.current = event.target.value;
            }}
            color="success"
            required
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit" fullWidth className="h-11 font-semibold">
            Login
          </Button>
          {errorDisplay && (
            <p className="text-red-500 text-center text-xs mt-1">
              {errorDisplay}
            </p>
          )}
          <SignIn />
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
