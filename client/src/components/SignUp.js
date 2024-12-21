import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SignUpPage.css"; // Import the CSS for styling

const SignUp = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post("http://localhost:4200/users/register", formData);
            setSuccess(response.data.message);
            setFormData({ username: "", password: "" }); // Reset form
            navigate("/login"); // Navigate to the LandingPage
        } catch (err) {
            console.error("Registration error:", err.response || err.message);
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="signup-container"> {/* Added container for proper layout */}
            <form className="signup-form" onSubmit={handleSubmit}> {/* Added form styling */}
                <h2 className="signup-title">Sign Up</h2>
                {error && <p className="signup-error">{error}</p>} {/* Error styling */}
                {success && <p className="signup-success">{success}</p>} {/* Success styling */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="signup-input"
                    required
                />
                <button type="submit" className="signup-button">Sign Up</button> {/* Button styling */}
            </form>
        </div>
    );
};

export default SignUp;
