import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";


const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    if (!userEmail) {
      validationErrors.emailRequired = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      validationErrors.invalidEmail = "Please enter a valid email address.";
    }
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    console.log("Validation Errors:", validationErrors);  // Debugging validation errors
    
    if (Object.keys(validationErrors).length === 0) {
      setErrors({}); // Clear previous errors
      setFormSubmitted(true); // Show loading state
  
      try {
        const result = await emailjs.send(
          "service_m0ouj7k", // Your EmailJS service ID
          "template_eafcq5p", // Your EmailJS template ID
          {
            user_email: userEmail, // The email entered by the user
            password_reset_link: "https://your-app.com/reset-password", // The reset password link
          },
          "wBuvL5DASvn8dfHAJ" // Your EmailJS user ID
        );
  
        console.log("EmailJS Result:", result);  // Debugging the result
  
        if (result.status === 200) {
          setFormSubmitted(false); // Hide loading state
          alert("Password reset link sent to your email.");
          navigate("/login"); // Redirect to login page
        } else {
          throw new Error("Error sending password reset email.");
        }
      } catch (error) {
        setFormSubmitted(false); // Hide loading state
        console.error("EmailJS Error:", error);  // Log the error
        alert(`Error: ${error.message}`); // Show error message
      }
    } else {
      setErrors(validationErrors); // Show validation errors
    }
  };
  



  return (
    <section style={{backgroundColor:"black"}} className="pt-0 pb-3 pt-lg-5 pb-lg-5">
              {formSubmitted && (
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
                    <h2 className="card-title text-center pb-3 mt-0">
                      Forgot Password
                    </h2>
                    <p className="text-center text-black-50">
                      Enter your email address you’re using for your account
                      below and we will send you a password reset link.
                    </p>
                  </div>
                  <form className="row g-3 loginform" onSubmit={handleSubmit}>
                    <div className="col-lg-12">
                      <label htmlFor="user_email" className="form-label">
                        Email Address
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="ri-mail-line text-blue"></i>
                        </span>
                        <input
                          type="text"
                          name="user_email"
                          id="user_email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          className="form-control border-start-0 ps-0 rounded-end"
                          placeholder="Enter your email address"
                        />
                      </div>
                      {errors.emailRequired && (
                        <div className="invalid-feedback d-block">
                          {errors.emailRequired}
                        </div>
                      )}
                      {errors.invalidEmail && (
                        <div className="invalid-feedback d-block">
                          {errors.invalidEmail}
                        </div>
                      )}
                    </div>

                    <div className="col-lg-12 mt-5 mb-3">
                      <div className="d-grid gap-2">
                        <button
                          disabled={formSubmitted}
                          type="submit"
                          className="btn login-btn btn-lg bg-blue"
                        >
                          Send me link
                        </button>
                      </div>
                    </div>

                    <div className="col-12 text-center mb-3">
                      <p className="mb-0 text-black-50">
                        Back to{" "}
                        <a
                          onClick={() => navigate("/login")}
                          className="black"
                          style={{ cursor: "pointer" }}
                        >
                          Sign in
                        </a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
