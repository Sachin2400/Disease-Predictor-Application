import React from "react";

const Prediction = ({ prediction }) => {
  const handleProbability = (probability) => {
    const percentage = (probability * 100).toFixed(1);
    return `${percentage}%`;
  };

  const firstDiseaseProbability =
    prediction && prediction.length > 0 && prediction[0].diseases_prob
      ? prediction[0].diseases_prob[0]
      : null;

  const showNotice =
    firstDiseaseProbability !== null && firstDiseaseProbability > 0.2;

  const consultDoctor =
    prediction && prediction.length > 0 ? prediction[0].consult_doctor : null;

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="bg-teal-50/70 p-4 rounded-xl flex flex-col gap-2">
        {prediction && prediction.length > 0 && prediction[0].diseases ? (
          prediction[0].diseases.map((disease, index) => (
            <div
              key={index}
              className="rounded-lg py-2 px-3 bg-white border border-teal-100 flex justify-between items-center shadow-xs"
            >
              <div className="font-medium text-gray-800 text-sm">{disease}</div>
              <div className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded">
                {handleProbability(prediction[0].diseases_prob[index])}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-sm text-center py-4">No prediction available</div>
        )}
      </div>

      <div
        className={`p-3 text-center text-sm font-semibold rounded-xl uppercase tracking-wide ${
          showNotice
            ? "bg-amber-100 text-amber-800 border border-amber-200"
            : "bg-emerald-100 text-emerald-800 border border-emerald-200"
        }`}
      >
        {showNotice
          ? `Recommended: Consult a ${consultDoctor || "Doctor"}`
          : "No immediate high-risk concern detected"}
      </div>
    </div>
  );
};

export default Prediction;

