import React, { useEffect, useState } from "react";
import axios from "axios";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState("");

    // Fetch questions from the backend
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("http://localhost:4200/questions");
                setQuestions(response.data); // Set the retrieved questions
            } catch (err) {
                console.error("Error fetching questions:", err.response || err.message);
                setError("Failed to fetch questions. Please try again later.");
            }
        };

        fetchQuestions();
    }, []); // Empty dependency array ensures this runs once when the component mounts

    return (
        <div>
            <h2>Question List</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {questions.length > 0 ? (
                <ul>
                    {questions.map((question) => (
                        <li key={question._id}>
                            <h3>{question.topic}</h3>
                            <p>{question.content}</p>
                            <small>Asked by: {question.email}</small>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p>No questions available.</p>
            )}
        </div>
    );
};

export default QuestionList;
