import React from "react";

const MedicalHistory = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-4">
        <h2 className="text-lg font-bold p-2 w-full text-center text-gray-800">
          Medical History
        </h2>
        <p className="w-full h-full bg-teal-50 grid place-content-center text-gray-500 rounded p-6 italic">
          None Recorded
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-2">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b text-gray-800 bg-gray-100">
            <th className="py-2 px-4 font-semibold text-left">
              Medical Condition History
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-2.5 text-gray-800 px-4">
                <div className="flex items-center text-sm">
                  <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-2"></span>
                  {item}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalHistory;

