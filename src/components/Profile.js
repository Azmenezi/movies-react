import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../api/auth";
import Skeleton from "./Loading/Skeleton";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const { data: profileData, isLoading, isError, error } = useGetProfile();
  const profile = profileData && profileData[0]; // Check if profileData exists before accessing the first element

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (!user) return navigate("/");
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {isLoading ? (
        <div className="p-6 bg-white rounded shadow-md w-80">
          <Skeleton className=" h-52 w-full mb-4 bg-gray-300 flex justify-center"></Skeleton>

          <div className="space-y-5">
            <div>
              <div className="block mb-1 font-semibold text-gray-500">
                Username
              </div>
              <Skeleton className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md"></Skeleton>
              <div>
                <label className="block mb-1 mt-6 font-semibold text-gray-500">
                  Email
                </label>
                <Skeleton className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md"></Skeleton>
              </div>
            </div>
          </div>
          <div className="flex">
            <Skeleton className="w-full h-10 mt-6 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md flex justify-center ">
              Loading...
            </Skeleton>
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white rounded shadow-md w-80">
          <img
            src={`http://localhost:8000/${profile?.image}`}
            className=" h-52 w-full mb-4 bg-gray-300 flex justify-center overflow-hidden object-cover rounded"
          />

          <div className="space-y-5">
            <div>
              <div className="block mb-1 font-semibold text-gray-500">
                Username
              </div>
              <div className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md font-bold">
                {profile.username}
              </div>
              <div>
                <label className="block mb-1 mt-6 font-semibold text-gray-500">
                  Email
                </label>
                <div className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md font-bold">
                  {profile.email}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => navigate("/reviews")}
              className="w-full h-10 mt-6 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md flex justify-center "
            >
              My Reviews
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
