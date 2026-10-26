import React from "react";

const SkeletonLoader = () => {
  return (
    <article className="flex flex-wrap gap-8 w-full justify-center max-w-7xl px-4">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          role="status"
          className="w-72 bg-white rounded-xl shadow-md p-6 flex flex-col items-center border border-gray-100 animate-pulse"
        >
          <div className="w-24 h-24 mb-3 rounded-full bg-gray-200"></div>
          <div className="h-4 bg-gray-200 rounded-full w-36 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded-full w-24 mb-4"></div>
          <div className="flex w-full mb-3 justify-center gap-3">
            <div className="h-8 bg-gray-200 rounded-md w-20"></div>
            <div className="h-8 bg-gray-200 rounded-md w-20"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded-full w-32 mb-3"></div>
          <div className="h-8 bg-gray-100 rounded-md w-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </article>
  );
};

export default SkeletonLoader;

