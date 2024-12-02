import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { RiUserLine, RiMailLine, RiLockPasswordLine, RiPhoneLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri"; // Importing icons
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/FirebaseConfig";

const SignupForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password === confirmPassword) {
      setIsSubmitting(true);
  
      try {
        // Create user in Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
  
        console.log("User created:", user);
  
        // Save user data to localStorage (if needed)
        const userData = {
          firstName,
          lastName,
          email,
          uid: user.uid, 
        };
        localStorage.setItem("userData", JSON.stringify(userData));
  
        // Redirect to login or dashboard
        setIsSubmitting(false);
        navigate("/login"); // Adjust route as per your app's structure
      } catch (error) {
        console.error("Error during signup:", error.message);
        alert(error.message);
        setIsSubmitting(false);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <section style={{backgroundColor:"black" , position: "relative"  }} className="pt-0 pb-3 pt-lg-5 pb-lg-5">
      {isSubmitting && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div className="loading">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row justify-content-center pb-2 pb-lg-5">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="card mb-3 p-4 rounded-5">
                <div className="card-body">
                  <div className="pb-2 mb-4">
                    <h2 className="card-title text-center pb-3 mt-0">Sign Up</h2>
                    <p className="text-center text-black-50">
                      Create a new account to get started.
                    </p>
                  </div>

                  <form className="row g-3 signupform" onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div className="col-lg-12">
                      <label htmlFor="first_name" className="form-label">
                        First Name
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <RiUserLine className="text-blue" size={20} />
                        </span>
                        <input
                          type="text"
                          id="first_name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="form-control border-start-0 ps-0 rounded-end"
                          placeholder="Enter your first name"
                          required
                          style={{ fontSize: "14px", color: "#a0a0a0" }} // Lighter and smaller placeholder
                        />
                      </div>
                    </div>

                    {/* Last Name */}
                    <div className="col-lg-12">
                      <label htmlFor="last_name" className="form-label">
                        Last Name
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <RiUserLine className="text-blue" size={20} />
                        </span>
                        <input
                          type="text"
                          id="last_name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="form-control border-start-0 ps-0 rounded-end"
                          placeholder="Enter your last name"
                          required
                          style={{ fontSize: "14px", color: "#a0a0a0" }} // Lighter and smaller placeholder
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-lg-12 mt-4">
                      <label htmlFor="user_email" className="form-label">
                        Email Address
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <RiMailLine className="text-blue" size={20} />
                        </span>
                        <input
                          type="email"
                          id="user_email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-control border-start-0 ps-0 rounded-end"
                          placeholder="Enter your email address"
                          required
                          style={{ fontSize: "14px", color: "#a0a0a0" }} // Lighter and smaller placeholder
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div className="col-lg-12 mt-4">
                      <label htmlFor="mobile_number" className="form-label">
                        Mobile Number
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <RiPhoneLine className="text-blue" size={20} />
                        </span>
                        <input
                          type="tel"
                          id="mobile_number"
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                          className="form-control border-start-0 ps-0 rounded-end"
                          placeholder="Enter your mobile number"
                          required
                          style={{ fontSize: "14px", color: "#a0a0a0" }} // Lighter and smaller placeholder
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-lg-12 mt-4">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white">
                          <RiLockPasswordLine className="text-blue" size={20} />
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-control border-start-0 border-end-0 ps-0"
                          placeholder="Create a password"
                          required
                          style={{ fontSize: "14px", color: "#a0a0a0" }} // Lighter and smaller placeholder
                        />
                        <span
                          className="input-group-text bg-white rounded-end text-black-50 toggle-password"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <RiEyeOffLine className="text-black-50" size={20} />
                          ) : (
                            <RiEyeLine className="text-black-50" size={20} />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="col-lg-12 mt-4">
                      <label htmlFor="confirm_password" className="form-label">
                        Confirm Password
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white">
                          <RiLockPasswordLine className="text-blue" size={20} />
                        </span>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          id="confirm_password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="form-control border-start-0 border-end-0 ps-0"
                          placeholder="Confirm your password"
                          required
                          style={{ fontSize: "14px", color: "#a0a0a0" }} // Lighter and smaller placeholder
                        />
                        <span
                          className="input-group-text bg-white rounded-end text-black-50 toggle-password"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <RiEyeOffLine className="text-black-50" size={20} />
                          ) : (
                            <RiEyeLine className="text-black-50" size={20} />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-lg-12 mt-5 mb-3">
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn signup-btn btn-lg bg-blue"
                          disabled={isSubmitting}
                        >
                          Sign Up
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="text-center text-black-50 mt-3">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue">
                      Login
                    </a>
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupForm;
