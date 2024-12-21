import React from "react";
import "../styles/Navbar_landing.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="navbar-logo">
                Tapay
            </Link>
            <ul className="navbar-menu">
                <li>
                    <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/questionnaire">Questions</Link>
                </li>

            </ul>
        </nav>
    );
};

export default Navbar;
