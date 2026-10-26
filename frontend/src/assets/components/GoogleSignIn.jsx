import React, { useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useGlobalContext } from "./context";

const SignIn = () => {
  const {
    email,
    submitLogin,
    username,
    password,
    submitRegistration,
  } = useGlobalContext();

  const userObject = useRef({});

  const handleCallback = async (response, event) => {
    try {
      userObject.current = jwtDecode(response.credential);
      username.current = userObject.current.name;
      email.current = userObject.current.email;
      password.current = response.credential.slice(0, 8);

      const fetchResponse = await fetch(
        `http://127.0.0.1:8000/check_email?email=${email.current}`
      );
      const data = await fetchResponse.json();

      if (data.email_exists) {
        submitLogin(event);
      } else {
        submitRegistration(event);
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  useEffect(() => {
    const initializeGoogleSignIn = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: "your-client-id-here-from-google-developer-account.apps.googleusercontent.com",
          callback: (response) => handleCallback(response, null),
        });

        const signInDiv = document.getElementById("signInDiv");
        if (signInDiv) {
          window.google.accounts.id.renderButton(signInDiv, {
            theme: "outline",
            size: "large",
          });
        }
      }
    };

    initializeGoogleSignIn();
  }, []);

  return (
    <div className="App flex justify-center mt-2">
      <div id="signInDiv"></div>
    </div>
  );
};

export default SignIn;

