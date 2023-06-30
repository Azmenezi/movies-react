import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import StaffContext from "../context/StaffContext";
import { checkStaff } from "../api/auth";
import UserContext from "../context/UserContext";

function Navbar() {
  const [user, setUser] = useContext(UserContext);
  const [staff, setStaff] = useContext(StaffContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(false);
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="text-white font-bold">My Movies</div>
      <div>
        {user ? (
          <>
            <NavLink
              onClick={() => setStaff(checkStaff())}
              to="/movies"
              className="text-white mx-4"
            >
              movies
            </NavLink>
            <NavLink
              onClick={() => setStaff(checkStaff())}
              to="/reviews"
              className="text-white mx-4"
            >
              my reviews
            </NavLink>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
