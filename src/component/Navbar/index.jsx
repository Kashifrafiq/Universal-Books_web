import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../Footer";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to update user email from localStorage
    const updateUserEmail = () => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserEmail(parsedData.email);
      }
    };

    // Initial check for user data
    updateUserEmail();

    // Add event listener for the custom login event
    window.addEventListener("userLoggedIn", updateUserEmail);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("userLoggedIn", updateUserEmail);
    };
  }, []);

  const handleLogout = () => {
    // Clear user data and redirect to home page
    localStorage.removeItem("userData");
    setUserEmail(null);
    navigate("/"); // Redirect to home page
  };

  const brohandle =()=>{
    navigate('/album-details')
  }

  const subhandle =()=>{
    navigate('/account')
  }

  return (
    <div>
      <div style={{ backgroundColor: "#121212", padding: "15px 130px" }}>
        <div className="d-flex justify-content-between align-items-center">
          <img
          style={{cursor:"pointer"}}
          // onClick={()=>navigate("/dashboard")}
            height={130}
            src="https://universalsounds.world/assets/images/logo-text-blue.png"
            alt="Logo"
          />
          {/* Profile Icon and Dropdown */}
          {userEmail && (
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
                <FaUserCircle size={30} className="me-2 text-white" /> {/* Profile Icon */}
              </button>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li className="dropdown-item-text text-muted">
                  {userEmail} {/* Email displayed in dropdown */}
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item" onClick={brohandle}>
                    Browse Albums
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={subhandle}>
                    Subscriptions
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Navbar;
