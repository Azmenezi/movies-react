// src/api/auth.js
import { useQuery } from "@tanstack/react-query";
import axios from "./index";
import jwt_decode from "jwt-decode";

export async function login({ usernameOrEmail, password }) {
  const response = await axios.post("/auth/signin", {
    usernameOrEmail,
    password,
  });
  return response.data;
}

export async function register({ username, email, password, image }) {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  if (image) {
    formData.append("image", image);
  }
  const response = await axios.post("/auth/register", formData);
  return response.data;
}

export const storeToken = (token) => {
  localStorage.setItem("token", token);
};

export const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};

export const checkStaff = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    if (decode.staff === true) {
      return true;
    }
    return false;
  }
  return false;
};
export const logout = () => {
  localStorage.removeItem("token");
};

export const tokenInfo = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);

    return decode;
  }
  return false;
};

export function useGetProfile() {
  return useQuery(
    ["profile"],
    () => axios.get("/auth/profile").then((res) => res.data),
    {
      onError: (error) => {
        window.alert(error.response.data.error.message);
      },
    }
  );
}
