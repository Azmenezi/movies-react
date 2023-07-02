import React, { useContext, useState } from "react";
import { register as registerService } from "../../api/auth";
import UserContext from "../../context/UserContext";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Skeleton from "../Loading/Skeleton";

const RegisterForm = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);

  const registerMutation = useMutation(
    ({ username, password, email, image }) =>
      registerService({ username, password, email, image }),
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setUser(true);
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const errorHandler = () => {
    if (
      registerMutation?.error?.response?.data?.errors?.filter(
        (error) => error.email
      ).length > 0
    ) {
      return <p>email is invalid</p>;
    } else if (
      registerMutation?.error?.response?.data?.errors?.filter(
        (error) => error.password
      ).length > 0
    ) {
      return (
        <p>password must have 8+ chars, 1 uppercase, 1 lowercase, 1 number.</p>
      );
    } else if (
      registerMutation?.error?.response?.data?.error.message.includes(
        "duplicate"
      )
    ) {
      return <p>username or email is being used</p>;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    registerMutation.mutate({ username, password, email, image });
  };

  if (user) return navigate("/");
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {registerMutation.isLoading ? (
        <div className="p-6 bg-white rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Register</h2>

          <div className="space-y-5">
            <div>
              <div className="block mb-1 font-semibold text-gray-500">
                Username
              </div>
              <Skeleton className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md"></Skeleton>
              <div className="block mb-1 mt-6  font-semibold text-gray-500">
                Email
              </div>
              <Skeleton className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md"></Skeleton>
              <div>
                <label className="block mb-1 mt-6 font-semibold text-gray-500">
                  Password
                </label>
                <Skeleton className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md"></Skeleton>
              </div>
              <div>
                <label className="block mb-1 mt-6 font-semibold text-gray-500">
                  Profile Image
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
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Register</h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-gray-500">
                Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-500">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-500">
                Password
              </label>
              <input
                type="password"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-500">
                Profile Image
              </label>
              <input
                type="file"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                onChange={handleImageChange}
              />
            </div>
            <div>
              {registerMutation.isError ? (
                <div className="bg-red-200 text-center rounded p-1">
                  {errorHandler()}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md"
          >
            Register
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
