import React, { useState, useEffect } from "react";
import "./AlbumDetails.css";
import { auth } from "../../firebase/FirebaseConfig";
import { createCheckOutSession } from "../../stripe/createCheckoutSession";

const AlbumDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [albumDetail, setAlbumDetail] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSecondPopupVisible, setisSecondPopupVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock fetch request for album details
    setTimeout(() => {
      setIsLoading(false);
      setAlbumDetail({
        album_title: "Album Title",
        album_description: "By Timothy Robinson & Mary-Lou Reed",
        cover_image_host: "https://via.placeholder.com/",
        cover_image_url: "album_cover.jpg",
        cover_image_name: "Cover Image",
        tracks: 10,
        published_date: "2023-01-01",
        released_date: "2023-01-10",
        languages: "English",
        album_category: "Audio",
        album_price: 29.99,
        purchased: false,
        album_ratings: 4,
        contents: [
          {
            content_title: "Track 1",
            artists: [{ artist_name: "Artist 1" }],
            genres: [{ genre: "Pop" }],
            content_duration: "3:30",
          },
          {
            content_title: "Track 2",
            artists: [{ artist_name: "Artist 2" }],
            genres: [{ genre: "Rock" }],
            content_duration: "4:00",
          },
        ],
      });
    }, 2000); // Simulating a network request delay
  }, []);

  const checkPopup = () => {
    setIsPopupVisible(true);
    setPopupType("purchase");
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setisSecondPopupVisible(false);
  };

  const handle = () => {
    setisSecondPopupVisible(true);
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
    <div>
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
        <div className="container py-5">
          {albumDetail && (
            <>
              <div className="row">
                <div className="d-block px-0 featured-head border-bottom">
                  <p className="mt-3 fs-3">Only To the Call</p>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-12 col-sm-12 px-0 album-card">
                  <div>
                    <img
                      src="https://djb5n3ph6rt61.cloudfront.net/images/album-cover-images/album-cover-image-05-06-2024-033456.jpg"
                      className="img-fluid"
                      alt={albumDetail.cover_image_name}
                    />
                  </div>
                </div>

                <div className="col-xl-8 col-lg-7 col-md-12 col-sm-12 px-0 album-card">
                  <div>
                    <div className="featured-subdata">
                      <p className="title fs-4">{albumDetail.album_title}</p>
                      <p className="description fs-6">
                        {albumDetail.album_description}
                      </p>
                      <div className="d-flex align-items-center album-price-btn">
                        {!albumDetail.purchased && (
                          <div>
                            <div className="d-flex ">
                              <div className="table-responsive">
                                <div className="table-info">
                                  <table>
                                    <tr>
                                      <th>
                                        {albumDetail.album_category === "Audio"
                                          ? "Tracks"
                                          : "Videos"}
                                      </th>
                                      <th>Published Date</th>
                                      <th>Released Date</th>
                                      <th>Language</th>
                                      <th>Type</th>
                                      {albumDetail.album_ratings && (
                                        <th>Album Ratings</th>
                                      )}
                                    </tr>
                                    <tr>
                                      <td>{albumDetail.tracks}</td>
                                      <td>
                                        {new Date(
                                          albumDetail.published_date
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>
                                        {new Date(
                                          albumDetail.released_date
                                        ).toLocaleDateString()}
                                      </td>
                                      <td>{albumDetail.languages}</td>
                                      <td>{albumDetail.album_category}</td>
                                      {albumDetail.album_ratings && (
                                        <td>{albumDetail.album_ratings}+</td>
                                      )}
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="price mb-0 fs-3">
                                ${albumDetail.album_price.toFixed(2)}
                              </p>
                              <button
                                onClick={checkPopup}
                                className="btn banner-btn btn-block text-white bg-blue fs-7"
                              >
                                Buy Now
                              </button>
                            </div>
                          </div>
                        )}
                        {albumDetail.purchased && (
                          <div className="d-flex align-items-center purchased">
                            <img
                              src="assets/images/purchased-tick.png"
                              alt="tick"
                            />
                            <p className="mb-0 ms-2 text-blue">Purchased</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="d-block px-0 featured-head border-bottom">
                  <p className="fs-3">
                    {albumDetail.album_category === "Audio"
                      ? "Tracks"
                      : "Videos"}
                  </p>
                </div>
                <div className="album-tracks px-0">
                  <div className="table-responsive">
                    {" "}
                    <table className="table-tracks">
                      <tr className="fs-8">
                        <th>No.</th>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Genres</th>
                        <th>Time</th>
                      </tr>
                      {albumDetail.contents.length > 0 ? (
                        albumDetail.contents.map((track, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{track.content_title}</td>
                            <td>
                              {track.artists.map((artist, idx) => (
                                <span key={idx}>
                                  {artist.artist_name}
                                  {idx < track.artists.length - 1 && ", "}
                                </span>
                              ))}
                            </td>
                            <td>
                              {track.genres.map((genre, idx) => (
                                <span key={idx}>
                                  {genre.genre}
                                  {idx < track.genres.length - 1 && ", "}
                                </span>
                              ))}
                            </td>
                            <td>{track.content_duration}</td>
                          </tr>
                        ))
                      ) : (
                        <div className="mt-3 text-medium-gray">
                          No{" "}
                          {albumDetail.album_category === "Audio"
                            ? "Tracks"
                            : "Videos"}{" "}
                          Available
                        </div>
                      )}
                    </table>
                  </div>
                </div>
              </div>

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
                      Subscription Needed
                    </h2>
                    <p style={{ marginBottom: "30px", color: "#666" }}>
                      The purchase of this album requires an active
                      subscription. Please subscribe to a Monthly or Yearly
                      Plan!
                    </p>

                    <button
                      style={{
                        all: "unset",
                        marginLeft: "10px",
                        marginTop: "20px",
                        padding: "10px",
                        backgroundColor: "#44c8f5",
                        width: "130px",
                        textAlign: "center",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                      onClick={handle}
                    >
                      Browser Plan
                    </button>
                  </div>
                </div>
              )}

              {isSecondPopupVisible && (
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

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
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
                        "Pay Now"
                      )}
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
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AlbumDetails;
