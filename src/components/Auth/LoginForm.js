import React, { useContext, useState } from "react";

import { login as loginService } from "../../api/auth";
import UserContext from "../../context/UserContext";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import Skeleton from "../Loading/Skeleton";

const LoginForm = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation(
    ({ usernameOrEmail, password }) =>
      loginService({ usernameOrEmail, password }),
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginMutation.mutate({ usernameOrEmail, password });
  };

  if (user) return navigate("/");
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {loginMutation.isLoading ? (
        <div className="p-6 bg-white rounded shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>

          <div className="space-y-5">
            <div>
              <div className="block mb-1 font-semibold text-gray-500">
                Username
              </div>
              <Skeleton className="w-full h-10 border bg-gray-300 px-3 py-2 rounded-md"></Skeleton>
              <div>
                <label className="block mb-1 mt-6 font-semibold text-gray-500">
                  Password
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
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Login</h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-1 font-semibold text-gray-500">
                Username
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-3 py-2 rounded-md"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
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
              {loginMutation.isError ? (
                <div className="bg-red-200 text-center rounded p-1">
                  username or password are incorrect
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
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
