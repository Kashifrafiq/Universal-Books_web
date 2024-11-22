import React, { useState, useEffect } from 'react';
import './Popup.css';

const Popup = ({ closePopup, gotoCheckout, channelsListData, userActiveSubscriptions }) => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);

  // Simulating fetching plan details
  useEffect(() => {
    const fetchPlanDetails = () => {
      setTimeout(() => {
        setPlanDetails({ price: 10 }); // Example: Replace with API logic
      }, 1000);
    };
    fetchPlanDetails();
  }, []);

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };

  return (
    <div className="popup-content">
      <div className="purchase-album-popup">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="fs-3 fw-bold mb-0">Select Your Plan</p>
          <div className="close-icon" onClick={closePopup}>
            <i className="ri-close-line"></i>
          </div>
        </div>

        {/* Loader */}
        {!planDetails?.price && (
          <div className="loader d-flex justify-content-center">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        )}

        {/* Channels List */}
        {channelsListData?.length > 0 && planDetails?.price ? (
          channelsListData.map((channel, index) => (
            <div key={index} className="channel-container">
              <p className="plan-desc mb-3">Please select a plan below:</p>
              <ul className="monthlist">
                {channel.plans?.map((plan) => (
                  <li
                    key={plan.id}
                    className={selectedPlanId === plan.id ? 'active' : ''}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    <div className="plans-subdata d-flex align-items-center">
                      <input
                        type="radio"
                        className="radio-input"
                        id={`radio${plan.id}`}
                        name="radioGroup"
                        checked={selectedPlanId === plan.id}
                        onChange={() => handlePlanSelect(plan.id)}
                      />
                      <label className="radio-label" htmlFor={`radio${plan.id}`}></label>
                      <p className="text-uppercase fs-6 fw-bold ms-3 mb-0">
                        {plan.name} Plan
                      </p>
                      {selectedPlanId === plan.id && (
                        <span className="active-label text-uppercase text-light ms-3 ng-purple">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="fs-4 price-size lh-normal">
                      <span>$</span> {plan.price.toFixed(2)}{' '}
                      {plan.name === 'Monthly'
                        ? '/ month'
                        : plan.name === 'Yearly'
                        ? '/ year'
                        : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          planDetails?.price && (
            <h4 className="card-title pb-3 fs-2 text-center">No channels found!</h4>
          )
        )}

        {/* Payment and Cancel Buttons */}
        {!userActiveSubscriptions && planDetails?.price && (
          <div className="d-flex justify-content-center mt-4">
            <button
              onClick={gotoCheckout}
              className="btn popup-btn text-white fs-6 bg-blue me-3"
            >
              Pay
            </button>
            <button
              onClick={closePopup}
              className="btn btn-cancel text-black fs-6"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
