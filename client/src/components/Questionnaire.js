import React, { useState } from "react";
import axios from "axios";
import "../styles/QuestionnairePage.css"; // Import the CSS file

const Questionnaire = () => {
    const [formData, setFormData] = useState({
        topic: "",
        content: "",
        email: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Submitting form data:", formData); // Debugging
            const response = await axios.post("http://localhost:4200/questions/create-question", formData);

            setMessage("Question submitted successfully!");
            console.log("Server response:", response.data);
            setFormData({ topic: "", content: "", email: "" }); // Clear form
        } catch (err) {
            console.error("Error submitting the question:", err.response || err.message);
            setError("Failed to submit the question. Please try again.");
        }
    };

    return (
        <div className="questionnaire-container">
            <div className="questionnaire-layout">
            <form className="questionnaire-form" onSubmit={handleSubmit}>
                {/* Image in the top-right corner */}
                <img src="/images/Red-Question-Mark.webp" alt="Decoration" className="form-image-top-right" />
                <h2 className="questionnaire-title">Submit Your Question</h2>
                {message && <p className="questionnaire-success">{message}</p>}
                {error && <p className="questionnaire-error">{error}</p>}
                <input
                    type="text"
                    name="topic"
                    placeholder="Topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="questionnaire-input"
                    required
                />
                <textarea
                    name="content"
                    placeholder="Question Content"
                    value={formData.content}
                    onChange={handleChange}
                    className="questionnaire-textarea"
                    required
                ></textarea>
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="questionnaire-input"
                    required
                />
                <button type="submit" className="questionnaire-button">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Questionnaire;
