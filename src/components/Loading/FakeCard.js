import React from "react";
import Skeleton from "./Skeleton";

export const FakeCard = () => {
  return (
    <div className="border p-4">
      <h2 className="font-bold text-lg">Loading...</h2>
      <p className=""></p>
      <p className=""></p>
      <Skeleton className="bg-gray-500 mt-3 w-30 h-10 px-2 py-1 rounded"></Skeleton>
      <Skeleton className="bg-gray-500 mt-3 px-2 w-30 h-6 py-1 rounded"></Skeleton>
    </div>
  );
};
