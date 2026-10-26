import React, { useState, useContext, useEffect, useRef } from "react";
import axios from "axios";

const AppContext = React.createContext();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const AppProvider = ({ children }) => {
  const options = [
    "Itching",
    "Skin rash",
    "Shivering",
    "Chills",
    "Joint pain",
    "Stomach pain",
    "Acidity",
    "Ulcers on tongue",
    "Muscle wasting",
    "Vomiting",
    "Burning micturition",
    "Spotting urination",
    "Fatigue",
    "Weight gain",
    "Anxiety",
    "Cold hands and feets",
    "Mood swings",
    "Weight loss",
    "Restlessness",
    "Lethargy",
    "Patches in throat",
    "Irregular sugar level",
    "Cough",
    "High fever",
    "Sunken eyes",
    "Breathlessness",
    "Sweating",
    "Dehydration",
    "Indigestion",
    "Headache",
    "Yellowish skin",
    "Dark urine",
    "Nausea",
    "Loss of appetite",
    "Pain behind the eyes",
    "Back pain",
    "Constipation",
    "Abdominal pain",
    "Diarrhea",
    "Mild fever",
    "Yellow urine",
    "Yellowing of eyes",
    "Acute liver failure",
    "Fluid overload",
    "Swelling of stomach",
    "Swelled lymph nodes",
    "Malaise",
    "Blurred and distorted vision",
    "Phlegm",
    "Throat irritation",
    "Redness of eyes",
    "Sinus pressure",
    "Runny nose",
    "Congestion",
    "Chest pain",
    "Weakness in limbs",
    "Fast heart rate",
    "Pain during bowel movements",
    "Pain in anal region",
    "Bloody stool",
    "Irritation in anus",
    "Neck pain",
    "Dizziness",
    "Cramps",
    "Bruising",
    "Obesity",
    "Swollen legs",
    "Swollen blood vessels",
    "Puffy face and eyes",
    "Enlarged thyroid",
    "Brittle nails",
    "Swollen extremeties",
    "Excessive hunger",
    "Extra-marital contacts",
    "Drying and tingling lips",
    "Slurred speech",
    "Knee pain",
    "Hip joint pain",
    "Muscle weakness",
    "Stiff neck",
    "Swelling joints",
    "Movement stiffness",
    "Spinning movements",
    "Loss of balance",
    "Unsteadiness",
    "Weakness of one body side",
    "Loss of smell",
    "Bladder discomfort",
    "Foul smell of urine",
    "Continuous feel of urine",
    "Passage of gases",
    "Internal itching",
    "Toxic look",
    "Depression",
    "Irritability",
    "Muscle pain",
    "Altered sensorium",
    "Red spots over body",
    "Belly pain",
    "Abnormal menstruation",
    "Dischromic patches",
    "Watering from eyes",
    "Increased appetite",
    "Polyuria",
    "Family history",
    "Mucoid sputum",
    "Rusty sputum",
    "Lack of concentration",
    "Visual disturbances",
    "Receiving blood transfusion",
    "Receiving unsterile injections",
    "Coma",
    "Stomach bleeding",
    "Distention of abdomen",
    "History of alcohol consumption",
    "Blood in sputum",
    "Prominent veins on calf",
    "Palpitations",
    "Painful walking",
    "Pus-filled pimples",
    "Blackheads",
    "Scarring",
    "Skin peeling",
    "Silver-like dusting",
    "Small dents in nails",
    "Inflammatory nails",
    "Blister",
    "Red sore around nose",
    "Yellow crust oozing",
  ];

  const [currentUser, setCurrentUser] = useState(false);
  const [responseCall, setResponseCall] = useState(false);
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const email = useRef("");
  const username = useRef("");
  const password = useRef("");
  const error = useRef("");
  const [age, setAge] = useState("");
  const [medicalhistory, setMedicalHistory] = useState([]);
  const [sex, setSex] = useState("");
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);
  const url = "http://127.0.0.1:8000/patient";
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    bp_log: { date: [], high: [], low: [] },
    blood_glucose: { date: [], before: [], after: [] },
  });

  useEffect(() => {
    client
      .get("/user")
      .then(function (res) {
        if (res.data?.user) {
          setCurrentUser(true);
        }
      })
      .catch(function () {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      setRegistrationToggle(false);
      setLoginButtonClicked(true);
    } else {
      setRegistrationToggle(true);
      setLoginButtonClicked(true);
    }
  }

  function closeModal() {
    setLoginButtonClicked(false);
  }

  function submitRegistration(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setResponseCall(true);
    client
      .post("/register", {
        email: email.current,
        username: username.current,
        password: password.current,
      })
      .then(function () {
        client
          .post("/login", {
            email: email.current,
            password: password.current,
          })
          .then(function () {
            setCurrentUser(true);
            setResponseCall(false);
            setLoginButtonClicked(false);
            fetchData();
          });
      })
      .catch(function (err) {
        error.current = "Registration failed. Please check your details.";
        setResponseCall(false);
      });
  }

  function submitLogin(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setResponseCall(true);
    client
      .post("/login", {
        email: email.current,
        password: password.current,
      })
      .then(function () {
        setResponseCall(false);
        setCurrentUser(true);
        error.current = "";
        setLoginButtonClicked(false);
        fetchData();
      })
      .catch(function () {
        error.current = "Wrong email or password. Please try again.";
        setResponseCall(false);
      });
  }

  function submitLogout() {
    client
      .post("/logout", {}, { withCredentials: true })
      .then(function () {
        setCurrentUser(false);
        setData({});
      })
      .catch(function () {
        setCurrentUser(false);
      });
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "medical_history" || name === "current_med") {
      const arrValue = value.split(",");
      setFormData((prevData) => ({
        ...prevData,
        [name]: arrValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleDashboardChange = (event) => {
    const { name, value } = event.target;
    if (name === "medical_history" || name === "current_med") {
      const arrValue = typeof value === "string" ? value.split(",") : value;
      setData((prevData) => ({
        ...prevData,
        [name]: arrValue,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    try {
      const submitPayload = {
        ...formData,
        new_patient: false,
      };
      setFormData(submitPayload);
      await axios.put(url, submitPayload, {
        withCredentials: true,
      });
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDashboardSubmit = async (event) => {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    try {
      await axios.put(url, data, {
        withCredentials: true,
      });
      await fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        update_form_btn,
        submitRegistration,
        submitLogin,
        submitLogout,
        currentUser,
        setCurrentUser,
        registrationToggle,
        setRegistrationToggle,
        email,
        username,
        password,
        age,
        setAge,
        medicalhistory,
        setMedicalHistory,
        sex,
        setSex,
        loginButtonClicked,
        setLoginButtonClicked,
        closeModal,
        options,
        handleInputChange,
        formData,
        setFormData,
        handleFormSubmit,
        url,
        data,
        setData,
        fetchData,
        handleDashboardSubmit,
        handleDashboardChange,
        error,
        responseCall,
        setResponseCall,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

