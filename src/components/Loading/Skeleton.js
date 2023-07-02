import React from "react";

const Skeleton = ({ className = "", children }) => {
  return (
    <div className={`animate-pulse flex space-x-4 ${className}`}>
      {children}
    </div>
  );
};

export default Skeleton;
