import React, { useState, useEffect } from 'react';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./dashboard.css"
import { createCheckOutSession } from '../../stripe/createCheckoutSession';
import { auth } from '../../firebase/FirebaseConfig';

// import Popup from '../../component/Poupup/Poupup';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userActiveSubscriptions, setUserActiveSubscriptions] = useState(false);
  const [featuredAlbums, setFeaturedAlbums] = useState([]);
  const [notFeaturedAlbums, setNotFeaturedAlbums] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);


  // Simulated data fetching
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setFeaturedAlbums([/* Featured Albums Data */]);
      setNotFeaturedAlbums([/* Not Featured Albums Data */]);
    }, 1000);
  }, []);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const peymentHandle = async (selectedPlan) => {
    if (!selectedPlan) {
      alert("Please select a plan first.");
      return;
    }
  
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("Please log in first.");
      return;
    }
  
    const uid = currentUser.uid; // User's unique ID
  
    // Disable the button and show loader
    setLoading(true);
  
    try {
      // Pass the selected plan to the checkout session
      await createCheckOutSession(uid, selectedPlan, setIsLoading);
  
      // Show loader until checkout screen loads
      const interval = setInterval(() => {
        const stripeCheckoutElement = document.querySelector('.StripeElement');
        if (stripeCheckoutElement) {
          clearInterval(interval); // Stop the interval when checkout screen is detected
          setLoading(false); // Hide loader
        }
      }, 500);
    } catch (error) {
      console.error("Error during checkout:", error);
      setLoading(false); // Hide loader in case of error
      alert("There was an issue processing your payment. Please try again.");
    }
  };
  
  return (
    <div style={{ backgroundColor: 'white', position: 'relative' }}>
    {isPopupVisible && (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            width: '500px',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
            }}
            aria-label="Close"
          >
            &#10006; {/* Unicode for "X" icon */}
          </button>

          <h2 style={{ marginBottom: '20px', color: '#333' }}>Select Your Plan</h2>
          <p style={{ marginBottom: '30px', color: '#666' }}>
            Please select a plan below
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* Monthly Plan */}
            <div
              onClick={() => setSelectedPlan("monthly")}
              style={{
                padding: '20px',
                border: selectedPlan === "monthly" ? '2px solid lightblue' : '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '45%',
                textAlign: 'center',
              }}
            >
              <h5 style={{ marginBottom: '10px' }}>MONTHLY PLAN</h5>
              <p style={{ marginBottom: '10px' }}>$10.00 / month</p>
            </div>

            {/* Yearly Plan */}
            <div
              onClick={() => setSelectedPlan("yearly")}
              style={{
                padding: '20px',
                border: selectedPlan === "yearly" ? '2px solid lightblue' : '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer',
                width: '45%',
                textAlign: 'center',
              }}
            >
              <h5 style={{ marginBottom: '10px' }}>YEARLY PLAN</h5>
              <p style={{ marginBottom: '10px' }}>$99.00 / year</p>
            </div>
          </div>
{/* Payment Button */}
<button
  style={{
    all: 'unset',
    marginLeft: '10px',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#44c8f5',
    width: '100px',
    textAlign: 'center',
    borderRadius: '30px',
    cursor: 'pointer',
  }}
  onClick={() => peymentHandle(selectedPlan)} // Pass the selected plan
  disabled={loading || !selectedPlan}
>
  {loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  ) : (
    'Pay Now'
  )}
</button>


          {/* Cancel Button */}
          <button
            style={{
              all: 'unset',
              cursor: 'pointer',
              marginLeft: '10px',
              marginTop: '20px',
              padding: '10px',
              width: '100px',
              textAlign: 'center',
              borderRadius: '30px',
            }}
            onClick={closePopup}
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    {!isPopupVisible && (
      <>
        {isLoading ? (
          <div className="col-lg-12 d-flex justify-content-center align-items-center main-loader">
            <div className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        ) : (
          <div className="container pb-5">
              {/* Banner */}
              {!userActiveSubscriptions && (
  <div className="custom-banner mt-5 d-flex align-items-center">
    {/* Left Side Text */}
    <div className="banner-text p-2">
      <div className="banner-head">
        <p className="main-head">
          Tune in to the Ultimate Experience: Subscribe & Explore
        </p>
        <p className="sub-head my-4">What you will unlock:</p>
        <div className="tick-list mb-3">
          <div className="tick-item mb-3">
            <img
              src="https://universalsounds.world/assets/images/charm_square-tick.png"
              alt="tick"
              className="tick-icon"
            />
            <p className="tick-text">500+ unique songs & albums</p>
          </div>
          <div className="tick-item mb-3">
            <img
              src="https://universalsounds.world/assets/images/charm_square-tick.png"
              alt="tick"
              className="tick-icon"
            />
            <p className="tick-text">Buy & access additional individual albums</p>
          </div>
          <div className="tick-item">
            <img
              src="https://universalsounds.world/assets/images/charm_square-tick.png"
              alt="tick"
              className="tick-icon"
            />
            <p className="tick-text">Exclusive premium content</p>
          </div>
        </div>
        <button onClick={showPopup} className="btn browse-btn">
          Browse Plans
        </button>
      </div>
    </div>

    {/* Right Side Image */}
    <div className="banner-image">
      <img
        src="https://universalsounds.world/assets/images/banner-image.png"
        alt="Banner"
        className="img-fluid"
      />
    </div>
  </div>
)}



            <div className="row mt-5">
              <div className="col-xxl-10 col-xl-10 col-lg-10 offset-lg-1">
                <div className="text-center py-4">
                  <p className="fw-bold text-blue pb-2 pb-lg-3 music-with-img text-center justify-content-center align-items-center">
                    
                    <span className="px-3 lh-1 mobile-head">Universal Book</span>
                  </p>
                  <p className="text-muted">Click below to go to subscription detail page</p>
                  <button
                    onClick={showPopup}
                    className="btn home-btn btn-block text-white bg-blue fs-6 text-white my-3"
                  >
                    Browser Plan
                  </button>

                  <div className="row pt-4 pb-4 d-xl-flex d-lg-flex d-md-flex d-sm-none d-none">
                    <div className="col-xl-3 col-lg-3 col-md-6">
                      <img
                        src="https://universalsounds.world/assets/images/mobile-image-1.png"
                        className="img-fluid mobile-image"
                        alt="mobile-screens"
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                      <img
                        src="https://universalsounds.world/assets/images/mobile-image-2.png"
                        className="img-fluid mobile-image"
                        alt="mobile-screens"
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                      <img
                        src="https://universalsounds.world/assets/images/mobile-image-3.png"
                        className="img-fluid mobile-image"
                        alt="mobile-screens"
                      />
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6">
                      <img
                        src="https://universalsounds.world/assets/images/mobile-image-4.png"
                        className="img-fluid mobile-image"
                        alt="mobile-screens"
                      />
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
        

              {/* Albums Section */}
              <div className="container albums-list">
                <div className="row">
                  <div className="d-flex justify-content-between px-0 featured-head border-bottom align-items-center pb-2">
                    <p className="fs-3 mb-0 head-title">Books</p>
                    <Link
                      to="/album-details"
                      className="text-decoration-none text-black fs-6 d-flex align-items-center"
                    >
                      Browse All
                      <BiRightArrowAlt size={20} />
                    </Link>
                  </div>
                </div>

                <div className="row album-card-block">
                  <div className="px-0 featured-card">
                    <Link
                      style={{ all: 'unset', cursor: 'pointer' }}
                      to="/album-details"
                      className="cursor-pointer"
                    >
                      <div className="image-container">
                        <img
                          src="https://djb5n3ph6rt61.cloudfront.net/images/album-cover-images/album-cover-image-05-06-2024-033456.jpg"
                          className="img-fluid list-img"
                          alt="Album 1"
                        />
                      </div>
                      <div className="mt-2 featured-subdata">
                        <p className="title fs-6 my-2">Only To the Call</p>
                        <p> 1 Track</p>
                        <h4>$5.00</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
