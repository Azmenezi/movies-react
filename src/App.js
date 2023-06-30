import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Home from "./pages/Home";
import ReviewList from "./components/ReviewList";
import { checkStaff, checkToken } from "./api/auth";
import Movies from "./components/Movies";
import StaffContext from "./context/StaffContext";

function App() {
  const [user, setUser] = useState(false);
  const [staff, setStaff] = useState(false);
  useEffect(() => {
    setUser(checkToken());
    setStaff(checkStaff());
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <StaffContext.Provider value={[staff, setStaff]}>
        <div className="">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/reviews" element={<ReviewList />} />
          </Routes>
        </div>
      </StaffContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
