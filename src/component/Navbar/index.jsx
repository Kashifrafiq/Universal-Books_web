import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";
import Footer from "../Footer";
import { FaUserCircle } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Set the logged-in user's email
      } else {
        setUserEmail(null); // No user logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUserEmail(null);
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  const brohandle = () => {
    navigate("/album-list");
  };

  const subhandle = () => {
    navigate("/account");
  };

  const hideProfileIcon =
    location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div>
      <div style={{ backgroundColor: "#121212", padding: "15px 20px" }} className="navbar-container">
        <div className="d-flex justify-content-between align-items-center container">
          <img
            style={{ cursor: "pointer" }}
            height={80}
            src="https://universalsounds.world/assets/images/logo-text-blue.png"
            alt="Logo"
            onClick={() => navigate("/")}
          />

          {!hideProfileIcon && userEmail && (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle d-flex align-items-center"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  padding: "0",
                }}
              >
                <FaUserCircle size={30} className="me-2 text-white" />
              </button>
              <ul
                style={{ backgroundColor: "white", width: "auto" }}
                className="dropdown-menu dropdown-menu-end custom-dropdown-menu"
                aria-labelledby="userDropdown"
              >
                <li className="dropdown-item-text text-muted">{userEmail}</li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item custom-dropdown-item" onClick={brohandle}>
                    Browse Albums
                  </button>
                </li>
                <li>
                  <button className="dropdown-item custom-dropdown-item" onClick={subhandle}>
                    Subscriptions
                  </button>
                </li>
                <li>
                  <button className="dropdown-item custom-dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {isMobile && (
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link" onClick={brohandle}>
                Browse Albums
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={subhandle}>
                Subscriptions
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
