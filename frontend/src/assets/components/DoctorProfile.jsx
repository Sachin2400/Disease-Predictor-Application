import React from "react";

const DoctorProfile = ({ doctors }) => {
  return (
    <article className="flex justify-center w-full gap-8 flex-wrap max-w-7xl px-4">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="w-72 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center border border-gray-100"
        >
          <img
            className="w-24 h-24 mb-3 rounded-full object-cover shadow-md border-2 border-teal-500"
            src={doctor.image_link || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300"}
            alt={doctor.name}
          />
          <h5 className="text-lg text-gray-900 font-bold text-center">
            {doctor.name}
          </h5>
          <span className="text-sm font-medium text-teal-600 mb-2">
            {doctor.speciality}
          </span>
          <div className="flex mt-3 space-x-3 w-full justify-center">
            <a
              href={`tel:${doctor.mobile_no}`}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-md transition"
            >
              Contact
            </a>
            <a
              href={doctor.profile_link || "#"}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition"
            >
              View Profile
            </a>
          </div>
          <div className="mt-3 text-xs italic text-gray-500 font-medium">
            {doctor.experience} Years of Experience
          </div>
          <div className="px-1 mt-3 text-gray-600 text-center w-full">
            <p className="italic text-xs h-12 overflow-y-auto">
              {doctor.work_address}
            </p>
          </div>
        </div>
      ))}
    </article>
  );
};

export default DoctorProfile;

