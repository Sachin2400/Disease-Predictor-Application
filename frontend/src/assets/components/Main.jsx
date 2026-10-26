import React from "react";
import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import DpWindow from "./dpWindow";

const Main = () => {
  const { currentUser } = useGlobalContext();

  if (!currentUser) {
    return (
      <main className="flex items-center flex-col min-h-screen pt-24 bg-gradient-to-b from-teal-50/50 via-white to-gray-50">
        <Hero />
        <Services />
        <About />
        <Modal />
      </main>
    );
  }

  return (
    <main className="flex items-center flex-col min-h-screen pt-24 bg-gray-50">
      <DpWindow />
    </main>
  );
};

export default Main;

