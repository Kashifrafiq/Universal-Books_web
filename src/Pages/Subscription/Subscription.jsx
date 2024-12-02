import React, { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "../../component/Poupup/Poupup";
import { auth } from "../../firebase/FirebaseConfig";
import { createCheckOutSession } from "../../stripe/createCheckoutSession";

const SubscriptionPage = () => {
  // Mock state for demonstration
  const [userActiveSubscriptions, setUserActiveSubscriptions] = useState(false);
  const [isPopupVisible, setisPopupVisible] = useState(false);
  const [purchasedAlbums, setPurchasedAlbums] = useState([]);
  const [subscriptionPaymentsListData, setSubscriptionPaymentsListData] =
    useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const totalNoSubscriptionPayments = subscriptionPaymentsListData.length;

  const showPlansPopup = () => {
    setisPopupVisible(true);
  };

  const closePopup = () => {
    setisPopupVisible(false);
  };

  const findInvoice = (transactionId) => {
    console.log(`Download invoice for transaction ID: ${transactionId}`);
  };

  const startCustomerStripeSession = () => {
    console.log("Stripe session started.");
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

    // Pass the selected plan to the checkout session
    await createCheckOutSession(uid, selectedPlan, setIsLoading);

    // After successful payment processing, re-enable the button
    setLoading(false);
  };

  return (
    <div className="container pt-5">
      {/* Heading */}
      <div className="row">
        <div className="d-block px-0 featured-head border-bottom">
          <Link
            to="/home"
            className="d-inline-flex align-items-center text-decoration-none btn-back text-medium-gray"
          >
            <i className="ri-arrow-left-circle-line pe-2 fs-4 text-medium-gray"></i>
            {/* <span className="text-medium-gray fs-7">Back to main</span> */}
          </Link>
          <p className="mt-3 account-head">Subscription</p>
        </div>
      </div>

      {/* Plan Details Section */}
      <div className="row plan-details-section">
        <div className="col-xxl-12 col-xl-6 col-lg-6 col-md-12 col-sm-12 px-0">
          <div className="pt-4 d-flex justify-content-between">
            <p className="title fs-4 mb-0">Plan Details</p>
          </div>
          {!userActiveSubscriptions && (
            <>
              <p className="description mb-0 mt-1 pb-4 text-medium-gray">
                You’re currently not subscribed to any plan
              </p>
              <div className="d-flex align-items-center">
                <button
                  onClick={showPlansPopup}
                  className="btn popup-btn btn-block text-white bg-blue fs-7"
                >
                  Browse Plans
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Popup for Plans */}
      {isPopupVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
              // textAlign: 'center',
              width: "500px",
              position: "relative",
            }}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "none",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              &#10006; {/* Unicode for "X" icon */}
            </button>

            <h2 style={{ marginBottom: "20px", color: "#333" }}>
              Select Your Plan
            </h2>
            <p style={{ marginBottom: "30px", color: "#666" }}>
              Please select a plan below
            </p>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {/* Plan 1 */}
              <div
                onClick={() => setSelectedPlan(1)}
                style={{
                  padding: "20px",
                  border:
                    selectedPlan === 1
                      ? "2px solid lightblue"
                      : "2px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "45%",
                  textAlign: "center",
                }}
              >
                <h5 style={{ marginBottom: "10px" }}> MONTHLY PLAN </h5>
                <p style={{ marginBottom: "10px" }}>$ 10.00 / month</p>
              </div>

              {/* Plan 2 */}
              <div
                onClick={() => setSelectedPlan(2)}
                style={{
                  padding: "20px",
                  border:
                    selectedPlan === 2
                      ? "2px solid lightblue"
                      : "2px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  width: "45%",
                  textAlign: "center",
                }}
              >
                <h5 style={{ marginBottom: "10px" }}>YEARLY PLAN</h5>
                <p style={{ marginBottom: "10px" }}>$ 99.00 / year</p>
              </div>
            </div>
            <div></div>
            <button
              style={{
                all: "unset",
                marginLeft: "10px",
                marginTop: "20px",
                padding: "10px",
                backgroundColor: "#44c8f5",
                width: "100px",
                textAlign: "center",
                borderRadius: "30px",
                cursor: "pointer",
              }}
              onClick={() => peymentHandle(selectedPlan)} // Pass the selected plan
              disabled={loading || !selectedPlan}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
            <button
              style={{
                all: "unset",
                cursor: "pointer",
                marginLeft: "10px",
                marginTop: "20px",
                padding: "10px",
                width: "100px",
                textAlign: "center",
                borderRadius: "30px",
              }}
              onClick={closePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Purchased Albums Section */}
      <div className="row purchased-albums-section">
        <div className="col-xxl-12 col-xl-12 col-lg-12 col-sm-12 px-0">
          <div className="py-4 d-flex justify-content-between">
            <div>
              <p className="title fs-4 mb-0">Purchased Albums</p>
              {purchasedAlbums.length === 0 ? (
                <p className="description mb-0 mt-1 text-medium-gray">
                  You’ve not purchased any Albums Yet
                </p>
              ) : (
                <p className="description mb-0 mt-1 text-medium-gray">
                  You have purchased the following albums
                </p>
              )}
            </div>
          </div>
          {purchasedAlbums.length === 0 ? (
            <div className="d-flex align-items-center">
              <Link
                to="/album-details"
                className="btn popup-btn btn-block text-white bg-blue fs-7"
              >
                Browse Albums
              </Link>
            </div>
          ) : (
            <div className="row">
              <div className="album-tracks px-0 table-responsive">
                <table className="purchased-albums-list">
                  <thead>
                    <tr className="fs-8">
                      <th>No.</th>
                      <th>Album Cover</th>
                      <th>Title</th>
                      <th>Items</th>
                      <th>Purchased Date</th>
                      <th>Type</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchasedAlbums.map((album, index) => (
                      <tr key={album.id}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`${album.cover_image_host}${album.cover_image_url}`}
                            alt={album.cover_image_name}
                            width="42"
                            height="42"
                          />
                        </td>
                        <td>{album.album_title}</td>
                        <td>{album.tracks}</td>
                        <td>
                          {new Date(
                            album.purchase_info.purchased_date
                          ).toLocaleDateString()}
                        </td>
                        <td>{album.album_category}</td>
                        <td>
                          <Link
                            to={`/album-details/${album.id}`}
                            className="text-decoration-none text-black view-title d-flex align-content-center"
                          >
                            View <i className="ri-arrow-right-s-line"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Section */}
      <div className="row account-section">
        <div className="col-xxl-12 col-xl-12 col-lg-12 col-sm-12 px-0">
          <div className="py-4 d-flex justify-content-between align-items-center">
            <div>
              <p className="title fs-4 mb-0">Accounts</p>
              <p className="description mb-0 mt-1 text-medium-gray">
                Your Subscription and Invoice details
              </p>
            </div>
            {totalNoSubscriptionPayments > 0 && (
              <div
                onClick={startCustomerStripeSession}
                className="d-flex text-decoration-none cursor-pointer align-items-center hoverable"
              >
                <i className="ri-wallet-line"></i>
                <span className="ms-2 fs-7 payment-head text-black">
                  Manage Payment Methods
                </span>
                <i className="ri-arrow-right-s-line fw-bold"></i>
              </div>
            )}
          </div>
          {totalNoSubscriptionPayments > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="table-light">
                    <th>Date</th>
                    <th>Name</th>
                    <th>Mode</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Transaction Id</th>
                    <th>Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptionPaymentsListData.map((payment) => (
                    <tr key={payment.payment_transaction_id}>
                      <td>
                        {new Date(payment.updated_at).toLocaleDateString()}
                      </td>
                      <td>{payment.album_title || "N/A"}</td>
                      <td>
                        {payment.plan_slug === "universal-sounds-monthly"
                          ? "Universal Sounds - 1 MONTH"
                          : "Universal Sounds - 1 YEAR"}
                      </td>
                      <td>{payment.payment_mode || "N/A"}</td>
                      <td>
                        {payment.transaction_total_amount ? (
                          <>AU$ {payment.transaction_total_amount.toFixed(2)}</>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td
                        className={
                          payment.transaction_status === "paid" ||
                          payment.transaction_status === "Success"
                            ? "text-success"
                            : "text-danger"
                        }
                      >
                        {payment.transaction_status === "paid" ||
                        payment.transaction_status === "Success"
                          ? "Success"
                          : "Failed"}
                      </td>
                      <td>{payment.payment_transaction_id || "N/A"}</td>
                      <td>
                        {payment.transaction_status === "Success" ||
                        payment.transaction_status === "paid" ? (
                          <button
                            onClick={() =>
                              findInvoice(payment.payment_transaction_id)
                            }
                            className="text-decoration-none text-black cursor-pointer"
                          >
                            Download
                          </button>
                        ) : (
                          <p className="text-black mb-0">N/A</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
