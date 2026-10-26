import React, { useState } from "react";
import { useGlobalContext } from "./context";
import { TextField, Button } from "@mui/material";
import cancelIcon from "../img/cross icon.svg";
import SignIn from "./GoogleSignIn";

const RegisterForm = () => {
  const { submitRegistration, email, username, password, closeModal } =
    useGlobalContext();
  const [user_email, setUserEmail] = useState("");
  const [user_username, setUserUsername] = useState("");
  const [user_password, setUserPassword] = useState("");
  const [emailExists, setEmailExists] = useState("");

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isPasswordValid = (pw) => {
    return passwordRegex.test(pw);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isPasswordValid(user_password)) {
      try {
        const fetchResponse = await fetch(
          `http://127.0.0.1:8000/check_email?email=${user_email}`
        );
        const data = await fetchResponse.json();

        if (data.email_exists) {
          setEmailExists("Email already exists");
        } else {
          submitRegistration(event);
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    } else {
      console.log("Invalid password");
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative">
      <div className="flex justify-end mb-2">
        <button onClick={closeModal} className="p-1 hover:bg-gray-100 rounded-full cursor-pointer">
          <img src={cancelIcon} alt="cross" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Sign Up Now!
          </h2>
          <p className="text-center text-sm text-gray-500">
            Access personalized healthcare services
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            type="email"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              setEmailExists("");
              email.current = event.target.value;
            }}
            color="success"
            required
            fullWidth
            size="small"
          />
          {emailExists && (
            <p className="text-red-500 text-xs text-center">{emailExists}</p>
          )}

          <TextField
            id="formBasicUsername"
            label="Username"
            variant="outlined"
            value={user_username}
            onChange={(event) => {
              setUserUsername(event.target.value);
              username.current = event.target.value;
            }}
            color="success"
            required
            fullWidth
            size="small"
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
            color={isPasswordValid(user_password) ? "success" : "warning"}
            required
            fullWidth
            size="small"
          />
          {!isPasswordValid(user_password) && user_password.length > 0 && (
            <p className="text-gray-500 text-xs text-center">
              Password must be at least 8 characters, with 1 letter, 1 digit, &amp; 1 special char.
            </p>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            disabled={!isPasswordValid(user_password) || !user_email || !user_username}
            className="h-10 mt-1 font-semibold"
          >
            Create Account
          </Button>
          <SignIn />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

