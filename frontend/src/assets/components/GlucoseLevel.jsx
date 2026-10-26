import React from "react";

const GlucoseLevel = ({ responseData }) => {
  if (
    !responseData ||
    !responseData.blood_glucose ||
    !responseData.blood_glucose.date ||
    responseData.blood_glucose.date.length === 0
  ) {
    return (
      <p className="w-full h-full grid place-content-center italic text-gray-500 py-6">
        No values in log
      </p>
    );
  }

  const getCellStyles = (value, isAfterColumn) => {
    if (isAfterColumn) {
      if (value > 180) {
        return "bg-red-100 font-semibold";
      }
    } else {
      if (value > 120) {
        return "bg-red-100 font-semibold";
      }
    }
    return "";
  };

  let prevDate = null;

  return (
    <div className="px-1 bg-white overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b font-semibold text-gray-700 text-left">
              Date
            </th>
            <th className="py-2 px-4 border-b font-semibold text-gray-700 text-center">
              Before
            </th>
            <th className="py-2 px-4 border-b font-semibold text-gray-700 text-center">
              After
            </th>
          </tr>
        </thead>
        <tbody>
          {responseData.blood_glucose.date.map((date, index) => {
            const currentBefore = responseData.blood_glucose.before[index];
            const currentAfter = responseData.blood_glucose.after[index];

            if (!currentBefore && !currentAfter) {
              return null;
            }

            const isFirstDate = prevDate !== date;
            prevDate = date;

            return (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td
                  className={`py-2 px-3 border-r text-gray-800 ${
                    isFirstDate ? "bg-sky-50 font-medium" : "pl-6"
                  }`}
                >
                  <div className="flex items-center">
                    {isFirstDate && (
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                    )}
                    <div>{date}</div>
                  </div>
                </td>
                <td
                  className={`py-2 px-4 border-r text-center ${getCellStyles(
                    currentBefore,
                    false
                  )}`}
                >
                  {currentBefore || "-"}
                </td>
                <td
                  className={`py-2 px-4 text-center ${getCellStyles(
                    currentAfter,
                    true
                  )}`}
                >
                  {currentAfter || "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GlucoseLevel;

