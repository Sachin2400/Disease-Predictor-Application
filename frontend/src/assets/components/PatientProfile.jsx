import React, { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import Record from "./Record";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import Sugar_chart from "./Sugar_chart";
import Personal from "./Personal";
import MedicalHistory from "./Medical History";
import ConsumptionModal from "./ConsumptionModal";

const PatientProfile = ({ responseData }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [consumptionModal, setConsumptionModal] = useState(false);

  const first_name = responseData?.first_name || "";
  const last_name = responseData?.last_name || "";
  const height = responseData?.height || 0;
  const weight = responseData?.weight || 0;

  const [bmi, setBmi] = useState(0);
  const [bmiColor, setBmiColor] = useState("");

  useEffect(() => {
    const calculateBMI = () => {
      if (height > 0 && weight > 0) {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(bmiValue);

        if (bmiValue < 18.5) {
          setBmiColor("bg-purple-100 text-purple-700 border-purple-300");
        } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
          setBmiColor("bg-blue-100 text-blue-700 border-blue-300");
        } else if (bmiValue >= 24.9 && bmiValue < 29.9) {
          setBmiColor("bg-orange-100 text-orange-700 border-orange-300");
        } else {
          setBmiColor("bg-red-100 text-red-700 border-red-300");
        }
      }
    };
    calculateBMI();
  }, [height, weight]);

  if (responseData?.new_patient) {
    return null;
  }

  return (
    <div className="profile flex justify-center flex-col items-center w-full px-4 max-w-7xl mx-auto pb-16">
      {responseData && Object.keys(responseData).length > 0 ? (
        <>
          <div className="w-full flex flex-col md:flex-row gap-6 mt-4">
            <div className="bg-gray-800 rounded-2xl p-4 flex md:flex-col justify-around items-center shadow-lg md:w-20">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
                setConsumptionModal={setConsumptionModal}
              />
            </div>

            <div className="flex-1 flex flex-col gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Hi, {first_name} {last_name}
                  </h1>
                  <p className="text-gray-500 text-sm">Check and monitor your health indicators daily.</p>
                </div>
                <div className="flex items-center gap-3 mt-4 sm:mt-0">
                  <span className="text-sm font-semibold text-gray-600">BMI:</span>
                  <div className={`px-4 py-2 rounded-xl font-bold border ${bmiColor}`}>
                    {bmi > 0 ? bmi.toFixed(1) : "N/A"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-3">Blood Pressure Trends</h3>
                  <div className="h-56">
                    <BP_chart chartData={responseData.bp_log} />
                  </div>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-3">Glucose Level Trends</h3>
                  <div className="h-56">
                    <Sugar_chart chartData={responseData.blood_glucose} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Personal responseData={responseData} />
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                  <Calendar />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Medical History</h3>
                  <MedicalHistory data={responseData.medical_history} />
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Glucose Log</h3>
                  <GlucoseLevel responseData={responseData} />
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-800 mb-2">Blood Pressure Log</h3>
                  <BP_Log responseData={responseData} />
                </div>
              </div>
            </div>
          </div>

          <Record setRecord={setRecord} record={record} />
          <LogModal setLogModal={setLogModal} logModal={logModal} />
          <ProfileModal
            setProfileModal={setProfileModal}
            profileModal={profileModal}
          />
          <ConsumptionModal
            consumptionModal={consumptionModal}
            setConsumptionModal={setConsumptionModal}
          />
        </>
      ) : (
        <div className="py-20 text-center text-gray-500">Loading patient data...</div>
      )}
    </div>
  );
};

export default PatientProfile;

