import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { RiMailLine, RiLockPasswordLine, RiEyeLine, RiEyeOffLine } from "react-icons/ri"; // Importing icons
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (email && password) {
      setIsSubmitting(true);
  
      // Simulating an API call
      setTimeout(() => {
        // Save email and password to localStorage
        const userData = { email, password };
        localStorage.setItem("userData", JSON.stringify(userData));
  
        // Dispatch a custom event
        const loginEvent = new Event("userLoggedIn");
        window.dispatchEvent(loginEvent);
  
        setIsSubmitting(false);
  
        // Redirect to dashboard
        navigate("/dashboard");
      }, 2000);
    }
  };
  

  return (
    <section className="pt-0 pb-3 pt-lg-5 pb-lg-5" style={{backgroundColor:"black"}}>
      <div className="container">
        <div className="row justify-content-center pb-2 pb-lg-5">
          <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-8 d-flex flex-column align-items-center justify-content-center">
            <div className="d-flex justify-content-center">
              <div className="card mb-3 p-4 rounded-5">
                <div className="card-body">
                  <div className="pb-2 mb-4">
                    <h2 className="card-title text-center pb-3 mt-0">Login</h2>
                    <p className="text-center text-black-50">
                      Enter your credentials to access your account.
                    </p>
                  </div>

                  <form className="row g-3 loginform" onSubmit={handleSubmit}>
                    <div className="col-lg-12">
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
                        />
                      </div>
                    </div>

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
                          placeholder="Enter your password"
                          required
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

                    <div className="col-lg-12 text-right d-flex justify-content-end">
                      <a href="/forgot-password" className="black">
                        Forgot password?
                      </a>
                    </div>

                    <div className="col-lg-12 mt-5 mb-3">
                      <div className="d-grid gap-2">
                        <button
                          type="submit"
                          className="btn login-btn btn-lg bg-blue"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="loading">
                              <div className="circle"></div>
                              <div className="circle"></div>
                              <div className="circle"></div>
                              <div className="circle"></div>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="col-12 text-center mb-3">
                      <p className="mb-0 text-black-50">
                        New to Universal Sounds?{" "}
                        <a href="/signup" className="black">
                          Sign up
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

export default Login;
