import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import StaffContext from "../context/StaffContext";
import { checkStaff, tokenInfo } from "../api/auth";
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
  const userInfo = tokenInfo();

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      {userInfo === false ? (
        <div className="text-white font-bold">My Movies</div>
      ) : (
        <>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center"
          >
            <div className="text-white mx-2 font-bold">
              <img
                className="w-10 h-10 overflow-hidden object-cover rounded-full"
                src={`http://localhost:8000/${userInfo?.image}`}
              />
            </div>
            <div className="text-white font-bold ">{userInfo?.username}</div>
          </button>
        </>
      )}

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
            <NavLink to="/watchlist" className="text-white mx-4">
              watchlist
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
