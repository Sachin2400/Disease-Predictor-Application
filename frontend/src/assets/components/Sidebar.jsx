import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";
import consumption from "../img/cons.svg";

const Sidebar = ({
  setRecord,
  setLogModal,
  setProfileModal,
  setConsumptionModal,
}) => {
  const handleRecord = () => {
    setRecord(true);
  };
  const handleLogModal = () => {
    setLogModal(true);
  };
  const handleProfileModal = () => {
    setProfileModal(true);
  };
  const handleConsumptionModal = () => {
    setConsumptionModal(true);
  };

  return (
    <div className="flex md:flex-col justify-center items-center gap-6">
      <button
        onClick={handleProfileModal}
        title="Edit Profile"
        className="w-10 h-10 p-2 hover:scale-110 hover:bg-gray-700 rounded-xl transition cursor-pointer"
      >
        <img src={profile} alt="Profile" className="w-full h-full object-contain filter invert" />
      </button>
      <button
        onClick={handleRecord}
        title="Medical History"
        className="w-10 h-10 p-2 hover:scale-110 hover:bg-gray-700 rounded-xl transition cursor-pointer"
      >
        <img src={record} alt="Record" className="w-full h-full object-contain filter invert" />
      </button>
      <button
        onClick={handleLogModal}
        title="Add Log Entry"
        className="w-10 h-10 p-2 hover:scale-110 hover:bg-gray-700 rounded-xl transition cursor-pointer"
      >
        <img src={settings} alt="Vitals Log" className="w-full h-full object-contain filter invert" />
      </button>
      <button
        onClick={handleConsumptionModal}
        title="Consumption Factors"
        className="w-10 h-10 p-2 hover:scale-110 hover:bg-gray-700 rounded-xl transition cursor-pointer"
      >
        <img src={consumption} alt="Consumption" className="w-full h-full object-contain filter invert" />
      </button>
    </div>
  );
};

export default Sidebar;

