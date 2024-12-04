import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    console.log("Validating form...");
    const validationErrors = {};
    if (!userEmail) {
      validationErrors.emailRequired = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      validationErrors.invalidEmail = "Please enter a valid email address.";
    }
    console.log("Validation errors:", validationErrors);
    return validationErrors;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with email:", userEmail);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setIsSubmitting(true);
      console.log("No validation errors. Proceeding to send email...");

      try {
        const auth = getAuth(); // Initialize Firebase Auth
        await sendPasswordResetEmail(auth, userEmail); // Send reset email
        alert("A password reset link has been sent to your email address.");
        console.log("Password reset email sent successfully.");
        navigate("/login");
      } catch (error) {
        console.error("Firebase Error:", error.message);
        alert(
          "An error occurred while sending the reset link. Please try again."
        );
      } finally {
        setIsSubmitting(false);
        console.log("Email sending process complete.");
      }
    } else {
      console.log("Validation failed. Errors:", validationErrors);
      setErrors(validationErrors);
    }
  };

  return (
    <section style={{ backgroundColor: "black" }} className="pt-0 pb-3 pt-lg-5 pb-lg-5">
      {/* Loading Spinner */}
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

      {/* Forgot Password Form */}
      <div className="container">
        <div className="row justify-content-center pb-2 pb-lg-5">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="card mb-3 p-4 rounded-5">
                <div className="card-body">
                  <div className="pb-2 mb-4">
                    <h2 className="card-title text-center pb-3 mt-0">Forgot Password</h2>
                    <p className="text-center text-black-50">
                      Enter your email address you’re using for your account below, and we will send you a password reset link.
                    </p>
                  </div>
                  <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-lg-12">
                      <label htmlFor="user_email" className="form-label">
                        Email Address
                      </label>
                      <div className="input-group input-group-lg">
                        <span className="input-group-text bg-white border-end-0">
                          <i className="ri-mail-line text-blue"></i>
                        </span>
                        <input
                          type="email"
                          name="user_email"
                          id="user_email"
                          value={userEmail}
                          onChange={(e) => {
                            console.log("Email input changed to:", e.target.value);
                            setUserEmail(e.target.value);
                          }}
                          className="form-control border-start-0 ps-0 rounded-end"
                          placeholder="Enter your email address"
                        />
                      </div>
                      {errors.emailRequired && (
                        <div className="invalid-feedback d-block">{errors.emailRequired}</div>
                      )}
                      {errors.invalidEmail && (
                        <div className="invalid-feedback d-block">{errors.invalidEmail}</div>
                      )}
                    </div>

                    <div className="col-lg-12 mt-5 mb-3">
                      <div className="d-grid gap-2">
                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-lg bg-blue"
                          style={{
                            backgroundColor: "blue",
                            border: "none",
                            cursor: "pointer",
                            color: "white",
                          }}
                        >
                          {isSubmitting ? "Sending..." : "Send me a link"}
                        </button>
                      </div>
                    </div>

                    <div className="col-12 text-center mb-3">
                      <p className="mb-0 text-black-50">
                        Back to{" "}
                        <a
                          onClick={() => {
                            console.log("Navigating to login page...");
                            navigate("/login");
                          }}
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
