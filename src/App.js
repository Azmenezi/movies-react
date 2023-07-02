import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";

import { useEffect, useState } from "react";
import UserContext from "./context/UserContext";
import LoginForm from "./components/Auth/LoginForm";
import RegisterForm from "./components/Auth/RegisterForm";
import Home from "./pages/Home";
import ReviewList from "./components/Review/MyReviewList";
import { checkStaff, checkToken } from "./api/auth";
import Movies from "./components/Movie/Movies";
import StaffContext from "./context/StaffContext";
import MovieDetails from "./components/Movie/MovieDetails";
import Profile from "./components/Profile";
import Watchlist from "./components/Watchlist/Watchlist";

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
            <Route path="/movies/:movieId" element={<MovieDetails />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </StaffContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
