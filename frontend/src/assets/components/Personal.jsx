import React from "react";

const Personal = ({ responseData }) => {
  const {
    age,
    sex,
    height,
    weight,
    diet,
    exercise,
    dob_day,
    dob_month,
    dob_year,
    smoke_cons,
    alcohol_cons,
    current_med,
  } = responseData || {};

  return (
    <div className="px-6 py-6 bg-white rounded-2xl shadow-sm border border-gray-100 h-full">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Info</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Age</div>
          <div className="font-semibold text-gray-800 text-base">{age || "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Sex</div>
          <div className="font-semibold text-gray-800 text-base">{sex || "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Height</div>
          <div className="font-semibold text-gray-800 text-base">{height ? `${height} cm` : "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Weight</div>
          <div className="font-semibold text-gray-800 text-base">{weight ? `${weight} kg` : "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Date of Birth</div>
          <div className="font-semibold text-gray-800 text-base">
            {dob_day ? `${dob_day}/${dob_month}/${dob_year}` : "-"}
          </div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Diet</div>
          <div className="font-semibold text-gray-800 text-base">{diet || "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Exercise</div>
          <div className="font-semibold text-gray-800 text-base">{exercise || "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Smoking</div>
          <div className="font-semibold text-gray-800 text-base">{smoke_cons || "-"}</div>
        </div>
        <div className="border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Alcohol</div>
          <div className="font-semibold text-gray-800 text-base">{alcohol_cons || "-"}</div>
        </div>
        <div className="col-span-2 sm:col-span-3 border border-gray-100 p-3 rounded-xl bg-gray-50/50">
          <div className="text-gray-500 text-xs font-medium">Current Medications</div>
          <div className="font-semibold text-gray-800 text-sm mt-1">
            {Array.isArray(current_med) && current_med.length > 0
              ? current_med.join(", ")
              : typeof current_med === "string" && current_med
              ? current_med
              : "None"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;
