import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container">
        <div className="row d-flex justify-content-center align-items-end gx-0 gy-0 gx-lg-0 gy-lg-0">
          {/* Support Links Section */}
          <div className="col-xl-4 col-lg-3 col-md-12">
            <p className="support-links d-flex justify-content-lg-center justify-content-center pt-lg-0 pt-2 mb-0">
              <a className="text-light-gray" href="/support">Support</a>
              <a className="text-light-gray" href="/terms-and-conditions">Terms of Use</a>
            </p>
          </div>

          {/* Available Now On Section */}
          <div className="col-xl-4 col-lg-5 col-md-12 d-flex justify-content-center flex-column">
            <div className="text-center">
              <h3 className="text-white letter-2 mb-2 mt-lg-0 mt-3">Available Now On</h3>
              <div>
                <a
                  title="App Store Download"
                  href="https://apps.apple.com/story/id6470642223"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://universalsounds.world/assets/images/app-store.webp"
                    alt="Universal Sounds Apple Download"
                    className="store-img me-3 me-md-3 me-lg-3 mb-2 mb-lg-0"
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
                    className="store-img mb-2 mb-lg-0"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="col-xl-4 col-lg-4 col-md-12">
            <p className="text-light-gray text-xxl-end text-xl-center text-lg-center text-center mb-0">
              © {currentYear} Universal Sounds. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
