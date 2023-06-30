import React, { useContext, useState } from "react";
import { checkToken, login } from "../api/auth";
import UserContext from "../context/UserContext";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { token } = await login({ usernameOrEmail, password });
      localStorage.setItem("token", token);
      checkToken();
      if (token) setUser(true);
    } catch (error) {
      console.log(error);
    }
  };
  if (user) return navigate("/");
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
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
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
