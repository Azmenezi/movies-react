// src/api/auth.js
import axios from "./index";
import jwt_decode from "jwt-decode";

export async function login({ usernameOrEmail, password }) {
  try {
    const response = await axios.post("/auth/signin", {
      usernameOrEmail,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function register({ username, email, password, image }) {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image);
    }
    const response = await axios.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
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
