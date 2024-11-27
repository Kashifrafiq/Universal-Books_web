import React from 'react';
import "./Home.css"

const Home = () => {
  return (
    <div style={{backgroundColor:"black"}}>
      {/* <link rel="canonical" href="https://universalsounds.world/" /> */}

      <section className="">
        <div className="row main-banner">
          <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-0">
            <div className="float-start main-banner-head">
              <p className="text-light banner-main-head">
                Subscribe to Your Premier Destination for{' '}
                <span className="text-blue">Music</span> and{' '}
                <span className="text-blue">Video</span> Streaming
              </p>
              <p className="banner-sub-head my-4 fs-6">
                Unlock a world of music for every occasion!
              </p>
              <p className="banner-sub-head my-4 fs-6">
                Immerse yourself in a curated collection of music and videos in
                a variety of Genres from your favorite artists and presenters. Music
                to connect, relax, dance, party, entertainment and much more.
              </p>

              <div className="main-head-btn d-flex">
                <a
                  className="btn main-banner-btn btn-block text-black fw-bold bg-blue fs-7 my-3"
                  href="/signup"
                >
                  Sign up
                </a>
                <a
                  className="btn main-banner-btn signin-btn btn-block text-blue fs-7 my-3 ms-4"
                  href="/login"
                >
                  Login
                </a>
              </div>

              <hr className="main-banner-line mt-5" />

              <div className="text-light main-tick-class my-5 fs-6">
                <div className="d-flex my-3">
                  <a
                    className="text-decoration-none d-flex text-white cursor-pointer"
                    href="#partnerSection"
                  >
                    <p className="ms-2 mb-0 fw-bold">Partner with Universal Sounds</p>
                    <img src='https://universalsounds.world/assets/images/right-side-up.png' alt="tick" height="24px" />
                  </a>
                </div>
                <div className="d-flex">
                  <p className="ms-2 mb-0 banner-sub-head">
                    Collaborate with Universal Sounds to expand your audience and showcase your content to a global audience.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{backgroundColor:"black"}} className="col-xl-6 col-lg-6 col-md-12 col-sm-12 p-0 banner-slider overflow-hidden">
      <div className="gallery">
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-1.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-2.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-3.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-4.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-5.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-6.png" alt="slider-images" />
      </div>
      <div className="gallery">
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-7.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-8.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-9.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-10.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-11.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-1.png" alt="slider-images" />
      </div>
      <div className="gallery">
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-2.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-3.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-4.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-5.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-6.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-7.png" alt="slider-images" />
      </div>
      <div className="gallery">
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-8.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-9.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-10.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-11.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-1.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-2.png" alt="slider-images" />
      </div>
      <div className="gallery">
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-3.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-4.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-5.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-6.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-7.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-8.png" alt="slider-images" />
      </div>
      {/* <div className="gallery">
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-9.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-10.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-11.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-1.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-2.png" alt="slider-images" />
        <img src="https://universalsounds.world/assets/images/slider-images/slider-img-3.png" alt="slider-images" />
      </div> */}
    </div>


        </div>
      </section>

      <section style={{backgroundColor:"#121212" , zIndex:"-moz-initial"}} className="pt-5 mt- -5 pb-3 pb-lg-5">
      <div className="row mt-5">
        <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="app-div text-center py-4">
            <div className="mx-auto mobile-section w-50">
              <p className="fw-bold text-white pb-2 text-center justify-content-center align-items-center">
                <span className="px-3 banner-mobile-head">Experience the Versatility of Universal Sounds</span>
              </p>
              <p className="banner-sub-head">
                Enter a realm of endless possibilities and elevate your music and video streaming experience with
                Universal Sounds App.
              </p>
              <div className="my-5 justify-content-center d-flex">
                <a
                  title="App Store Download"
                  href="https://apps.apple.com/story/id6470642223"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://universalsounds.world/assets/images/app-store.webp"
                    alt="Universal Sounds Apple Download"
                    className="store-img me-lg-3 me-sm-3 mb-2 mb-lg-0"
                  />
                </a>
                <a
                  target="_blank"
                  title="Google Play Download"
                  href="https://play.google.com/store/apps/details?id=com.streaming.universalsounds"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://universalsounds.world/assets/images/google-pay.webp"
                    alt="Google Pay"
                    className="store-img mb-2 mb-lg-0 ms-2"
                  />
                </a>
              </div>
            </div>
          </div>

          <div
            id="scroll-section"
            className="row py-xxl-5 py-xl-5 py-lg-5 py-md-5 py-sm-2 d-flex justify-content-center align-items-end"
          >
            <div className="col-xl-4 col-lg-4 col-md-4 w-auto px-0" data-animation="fadeInBehindFirst">
              <img
                src="https://universalsounds.world/assets/images/Home-1.png"
                className="mobile-image behind-first"
                alt="mobile-screens"
              />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 w-auto px-0" data-animation="fadeInSecond">
              <img src="https://universalsounds.world/assets/images/Home-2.png" className="main-image-mobile" alt="mobile-screens" />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 w-auto px-0" data-animation="fadeInBehindLast">
              <img
                src="https://universalsounds.world/assets/images/Home-3.png"
                className="mobile-image behind-last"
                alt="mobile-screens"
              />
            </div>
          </div>

          <div className="mt-xxl-0 mt-xl-0 mt-lg-0 mt-md-5 mt-sm-5 four-sec-one">
            <div className="row m-5 four-section">
              <div className="col-12 col-md-6 mb-5 left-side-panel">
                <p className="four-section-title">Seamless Streaming</p>
                <p className="banner-sub-head">
                  Experience the seamless streaming of audios and videos from your favorite artists, whether you're at
                  home or on the go.
                </p>
              </div>
              <div className="col-12 col-md-6 mb-5 right-side-panel">
                <p className="four-section-title">Albums for Sale</p>
                <p className="banner-sub-head">
                  Discover, purchase and support your favorite artists and presenters by purchasing albums and adding to
                  your collection.
                </p>
              </div>
            </div>
            <div className="row m-5 four-section">
              <div className="col-12 col-md-6 mb-5 left-side-panel">
                <p className="four-section-title">Custom Playlists</p>
                <p className="banner-sub-head">
                  Create your own unique playlists tailored to your mood and preferences with freedom to curate your
                  listening experience that reflect your unique taste.
                </p>
              </div>
              <div className="col-12 col-md-6 mb-5 right-side-panel">
                <p className="four-section-title">Offline Downloads</p>
                <p className="banner-sub-head">
                  Download your favourite music to play offline. Enjoy your downloaded music tracks even when you're not
                  connected to the internet!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="pt-0 bg-black" id="partnerSection">
      <div className="row">
        {/* Left Column */}
        <div className="col-xl-5 col-lg-12 col-md-12 col-sm-12 p-0">
          <div className="four-section-head">
            <p className="text-light banner-mobile-head">
              Share your expression on Universal Sounds and partner with us
            </p>
            <p className="banner-sub-head partner-desc my-4 fs-6">
              Collaborate with Universal Sounds to share your expression and expand your reach to a global audience.
            </p>
            <a
              className="btn main-banner-btn btn-block text-black bg-blue fs-7 my-3 fw-bold"
              href="/signup"
            >
              Become a Partner
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-xl-7 col-lg-12 col-md-12 col-sm-12 p-0">
          <div className="mt-xxl-0 mt-xl-0 mt-lg-0 four-sec-second">
            {/* Feature Rows */}
            <div className="row mx-5 four-section">
              <div className="col-12 col-md-6 mb-5">
                <div className="d-flex align-items-baseline">
                  <img src="https://universalsounds.world/assets/images/tick-mark.png" alt="tick" height="20px" />
                  <p className="four-section-title fs-5 mb-0 ms-3">Expand Your Reach</p>
                </div>
                <p className="banner-sub-head four-section-desc fs-7">
                  Share your expression via music and videos by partnering with us. Limitless access to diverse and
                  global audience.
                </p>
              </div>
              <div className="col-12 col-md-6 mb-5">
                <div className="d-flex align-items-baseline">
                  <img src="https://universalsounds.world/assets/images/tick-mark.png" alt="tick" height="20px" />
                  <p className="four-section-title fs-5 mb-0 ms-3">Mutual Growth and Revenue Share</p>
                </div>
                <p className="banner-sub-head four-section-desc fs-7">
                  Foster growth and success of your brand and Universal Sounds. Ask how we share the revenue generated
                  from streaming of your content.
                </p>
              </div>
            </div>
            <div className="row mx-5 four-section">
              <div className="col-12 col-md-6 mb-5">
                <div className="d-flex align-items-baseline">
                  <img src="https://universalsounds.world/assets/images/tick-mark.png" alt="tick" height="20px" />
                  <p className="four-section-title fs-5 mb-0 ms-3">Seamless Integration</p>
                </div>
                <p className="banner-sub-head four-section-desc fs-7">
                  Effortless integration of your content reaching subscribers on various devices and platforms.
                </p>
              </div>
              <div className="col-12 col-md-6 mb-5">
                <div className="d-flex align-items-baseline">
                  <img src="https://universalsounds.world/assets/images/tick-mark.png" alt="tick" height="20px" />
                  <p className="four-section-title fs-5 mb-0 ms-3">Dedicated Support</p>
                </div>
                <p className="banner-sub-head four-section-desc fs-7">
                  Personal assistance and support from the Universal Sounds team to maximize impact of the partnership
                  with You.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
  );
};

export default Home;
