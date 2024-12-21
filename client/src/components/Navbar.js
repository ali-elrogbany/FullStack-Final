import React from "react";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the username from localStorage
        localStorage.removeItem("username");

        // Redirect the user to the login page or landing page
        navigate("/login"); // Replace with your desired page, e.g., "/landing"
    };

    // Check if the username is saved in localStorage
    const username = localStorage.getItem("username");

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Tapay
            </Link>
            <ul className="navbar-menu">
                {username ? (
                    // If username is found, show logout button
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                ) : (
                    // If username is not found, show signup and login links
                    <>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/questionnaire">Questions</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
