import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "manager", // Default role
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:4200/users/login", formData);

            // Extract user role information from the response
            const { isDriver, username } = response.data.user;

            // Save the username in localStorage
            localStorage.setItem("username", username);

            // Reset the form
            setFormData({ username: "", password: "", role: "" });

            // Navigate based on the user's role
            if (isDriver) {
                navigate("/driver"); // Replace with the actual route for drivers
            } else {
                navigate("/manager"); // Replace with the actual route for managers or other users
            }
        } catch (err) {
            console.error(err.response || err.message);
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-title">Login</h2>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input-field" required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="input-field" required />
                {/* <div className="role-selection">
                    <label htmlFor="role">Role:</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} className="input-field" required>
                        <option value="manager">Manager</option>
                        <option value="driver">Driver</option>
                    </select>
                </div> */}
                <button type="submit" className="login-button">
                    Login
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
