import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Driver.css"; // Ensure you have the correct CSS file

const Driver = () => {
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState(""); // Initialize status as empty
    const [transactions, setTransactions] = useState([]);
    const [driverDetails, setDriverDetails] = useState(null); // To store driver details
    const navigate = useNavigate(); // Hook to navigate to different routes

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);

            // Fetch the driver details by username
            axios
                .get(`http://localhost:4200/drivers/driver-by-username/${storedUsername}`)
                .then((response) => {
                    const driver = response.data;
                    if (driver) {
                        // Set driver details and status
                        setDriverDetails(driver);
                        setStatus(driver.status);

                        // Fetch the transactions (replace with real API call)
                        axios
                            .get(`http://localhost:4200/transactions/driver/${driver._id}`) // Assuming there's an endpoint for transactions by driver ID
                            .then((transactionResponse) => {
                                setTransactions(transactionResponse.data);
                            })
                            .catch((error) => {
                                console.error("Error fetching transactions:", error);
                            });
                    } else {
                        // Redirect to /manager if no driver found
                        navigate("/manager");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching driver details:", error);
                    navigate("/manager"); // Redirect to /manager if there's an error
                });
        } else {
            // Redirect to /manager if username is not found in localStorage
            navigate("/manager");
        }
    }, [navigate]);

    // Function to handle transaction status update
    const handleCompleteTransaction = (transactionId) => {
        // Find the transaction and update its status
        const transaction = transactions.find((t) => t._id === transactionId);
        if (!transaction || transaction.status !== "Pending") return;

        // Update the status to "Completed"
        axios
            .put(`http://localhost:4200/transactions/update-status/${transactionId}`, { status: "Completed" })
            .then((response) => {
                // Update the status locally after successful API call
                // Fetch the transactions (replace with real API call)
                axios
                    .get(`http://localhost:4200/transactions/driver/${driverDetails._id}`) // Assuming there's an endpoint for transactions by driver ID
                    .then((transactionResponse) => {
                        setTransactions(transactionResponse.data);
                    })
                    .catch((error) => {
                        console.error("Error fetching transactions:", error);
                    });
            })
            .catch((error) => {
                console.error("Error updating transaction status:", error);
            });
    };

    // Render loading state or driver details only when driverDetails is available
    if (!driverDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="driver-dashboard">
            <h1>Welcome Back!</h1>
            <p>This is your Driver dashboard.</p>

            <section className="driver-details">
                <h2>Your Details</h2>
                <p>
                    <strong>Vehicle:</strong> {driverDetails.vehicle}
                </p>
                <p>
                    <strong>Status:</strong> {status}
                </p>
            </section>

            <section className="transaction-history">
                <h2>Your Transaction History</h2>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.amount}</td>
                                <td>{new Date(transaction.date).toISOString().split("T")[0]}</td>
                                <td>{transaction.status}</td>
                                <td>
                                    {transaction.status === "Pending" && (
                                        <button className="update-btn" onClick={() => handleCompleteTransaction(transaction._id)}>
                                            Mark as Completed
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Driver;
