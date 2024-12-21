import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import Navbar from "../components/Navbar_landing"; // Ensure this import is correct

const LandingPage = () => {
    const [activeFAQ, setActiveFAQ] = useState(null); // Track the active FAQ

    // Toggle the active FAQ
    const toggleFAQ = (index) => {
        if (activeFAQ === index) {
            setActiveFAQ(null); // Close the FAQ if it's already open
        } else {
            setActiveFAQ(index); // Open the clicked FAQ
        }
    };

    return (
        <div className="landing-page">
            <Navbar /> {/* Add Navbar here */}
            <div className="landing-content">
                {/* Features and Image Section */}
                <div className="features-and-image">
                    <div className="image-section">
                        <img
                            src={require("../styles/tapay.png")}
                            alt="Payment Illustration"
                            className="landing-image"
                        />
                    </div>
                    <div className="text-content">
                        <header className="landing-header">
                            <h1 className="landing-title">Welcome to Tapay</h1>
                            <p className="landing-subtitle">
                                Your trusted platform for seamless payments.
                            </p>
                        </header>
                        <section className="landing-features">
                            <h2 className="features-title">Features</h2>
                            <ul className="features-list">
                                <li className="feature-item">
                                    <Link to="/features/secure-transactions">
                                        Secure Transactions
                                    </Link>
                                </li>
                                <li className="feature-item">
                                    <Link to="/features/user-friendly-interface">
                                        User-Friendly Interface
                                    </Link>
                                </li>
                                <li className="feature-item">
                                    <Link to="/features/global-access">
                                        Global Access
                                    </Link>
                                </li>
                            </ul>
                        </section>
                    </div>
                </div>

                {/* FAQ and Reviews Section */}
                <div className="faq-and-reviews">
                    <section className="faq-section">
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <div className="faq-item">
                            <div
                                className="faq-header"
                                onClick={() => toggleFAQ(0)}
                            >
                                <h3>What is Tapay?</h3>
                                <span>{activeFAQ === 0 ? '-' : '+'}</span>
                            </div>
                            {activeFAQ === 0 && (
                                <p className="faq-content">
                                    Tapay is a platform that turns your smartphone into a secure point of sale (POS) terminal for small and medium-sized businesses.
                                </p>
                            )}
                        </div>
                        <div className="faq-item">
                            <div
                                className="faq-header"
                                onClick={() => toggleFAQ(1)}
                            >
                                <h3>How secure is Tapay?</h3>
                                <span>{activeFAQ === 1 ? '-' : '+'}</span>
                            </div>
                            {activeFAQ === 1 && (
                                <p className="faq-content">
                                    Tapay uses encryption and advanced security measures to ensure your transactions are safe and secure.
                                </p>
                            )}
                        </div>
                        <div className="faq-item">
                            <div
                                className="faq-header"
                                onClick={() => toggleFAQ(2)}
                            >
                                <h3>Can I use Tapay on my existing device?</h3>
                                <span>{activeFAQ === 2 ? '-' : '+'}</span>
                            </div>
                            {activeFAQ === 2 && (
                                <p className="faq-content">
                                    Yes, you can use Tapay on any compatible smartphone without needing additional hardware.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Reviews Section */}
                    <section className="reviews-section">
                        <h2 className="reviews-title">What Our Users Say</h2>
                        <div className="reviews-box">
                            <div className="review-item">
                                <p>"Tapay has transformed the way we handle payments. Easy, fast, and secure!"</p>
                                <span>- Ahmed, Delivery Driver</span>
                            </div>
                            <div className="review-item">
                                <p>"I love how easy it is to use Tapay for my business. The interface is super user-friendly."</p>
                                <span>- Mariam, Business Owner</span>
                            </div>
                            <div className="review-item">
                                <p>"No more bulky POS systems. Tapay is a game-changer for my delivery service."</p>
                                <span>- Youssef, Courier</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <footer className="landing-footer">
                Contact us: {" "}
                <a href="mailto:support@tapay.com" className="footer-link">
                    support@tapay.com
                </a>
            </footer>
        </div>
    );
};

export default LandingPage;