import "./App.css";
import React from "react";
import Header from "./assets/components/Header";
import Main from "./assets/components/Main";
import Footer from "./assets/components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./assets/components/Dashboard";
import ContactDoctor from "./assets/components/ContactDoctor";
import { AppProvider } from "./assets/components/context";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contactdoctor" element={<ContactDoctor />} />
          <Route path="/" element={<Main />} />
          <Route path="*" element={<Main />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
