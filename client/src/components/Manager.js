import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Manager.css";

const Manager = () => {
    const [drivers, setDrivers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [username, setUsername] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [amount, setAmount] = useState(""); // State for the transaction amount
    const [selectedDriver, setSelectedDriver] = useState(""); // State for the selected driver
    const [newDriver, setNewDriver] = useState({
        id: "",
        name: "",
        vehicle: "",
        status: "Active",
        userUsername: "",
        userPassword: "",
    });
    const navigate = useNavigate(); // Hook to navigate to other routes

    const fetchTransactions = async () => {
        axios
            .get("http://localhost:4200/transactions/")
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.error("Error fetching transactions:", error);
            });
    };

    const fetchDrivers = async () => {
        axios
            .get("http://localhost:4200/drivers/")
            .then((response) => {
                setDrivers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching drivers:", error);
            });
    };

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (!storedUsername) {
            // If no username is found, redirect to the landing page
            navigate("/"); // Replace with the actual landing page route
            return; // Exit the effect early
        }

        setUsername(storedUsername);

        // Fetch drivers
        fetchDrivers();

        // Fetch transactions
        fetchTransactions();
    }, [navigate]); // Include navigate in dependency array to avoid missing updates

    const handleDriverStatusChange = (id) => {
        // Find the driver whose status needs to be toggled
        const driver = drivers.find((driver) => driver.id === id);
        if (!driver) return;

        // Determine the new status based on the current status
        const newStatus = driver.status === "Active" ? "Inactive" : "Active";

        // Send a PUT request to change the driver's status
        axios
            .put(`http://localhost:4200/drivers/change-status/${driver._id}`, { status: newStatus })
            .then((response) => {
                // Update the driver's status locally after successful API call
                setDrivers((prevDrivers) => prevDrivers.map((d) => (d.id === id ? { ...d, status: newStatus } : d)));
            })
            .catch((error) => {
                console.error("Error updating driver status:", error);
            });
    };

    const handleTransactionSubmit = (e) => {
        e.preventDefault();

        // Prepare the data to send
        const transactionData = {
            id: transactionId,
            driver: selectedDriver,
            amount: amount,
            date: new Date().toISOString().split("T")[0],
            status: "Pending",
        };

        console.log(transactionData);

        // Send a POST request to create the transaction
        axios
            .post("http://localhost:4200/transactions/create-transaction", transactionData)
            .then((response) => {
                // Add the new transaction to the list
                fetchTransactions();
                // Clear the form fields after successful submission
                setTransactionId("");
                setAmount("");
                setSelectedDriver("");
            })
            .catch((error) => {
                console.error("Error creating transaction:", error);
            });
    };

    const handleNewDriverSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Create a new user
            const userResponse = await axios.post("http://localhost:4200/users/register", {
                username: newDriver.userUsername,
                password: newDriver.userPassword,
            });

            const userId = userResponse.data.user._id;

            // Step 2: Create a new driver linked to the user
            await axios.post("http://localhost:4200/drivers/create-driver", {
                id: newDriver.id,
                name: newDriver.name,
                vehicle: newDriver.vehicle,
                status: newDriver.status,
                user: userId,
            });

            // Step 3: Fetch updated drivers list
            fetchDrivers();

            // Clear the form fields
            setNewDriver({
                id: "",
                name: "",
                vehicle: "",
                status: "Active",
                userUsername: "",
                userPassword: "",
            });
        } catch (error) {
            alert("Error adding new driver!");
            console.error("Error adding new driver:", error);
        }
    };

    return (
        <div className="manager-dashboard">
            <h1>Welcome Back!</h1>
            <p>This is the Manager dashboard.</p>

            {/* Driver Management */}
            <section className="driver-management">
                <h2>Driver Management</h2>
                <ul className="driver-list">
                    {drivers.map((driver) => (
                        <li key={driver.id} className="driver-item">
                            <strong>{driver.name}</strong> - {driver.vehicle} ({driver.status})
                            <button className={`status-button ${driver.status === "Active" ? "active" : "inactive"}`} onClick={() => handleDriverStatusChange(driver.id)}>
                                {driver.status === "Active" ? "Deactivate" : "Activate"}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Transaction History */}
            <section className="transaction-history">
                <h2>Transaction History</h2>
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Driver</th>
                            <th>Amount</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.driver.name}</td>
                                <td>{transaction.amount}</td>
                                <td>{new Date(transaction.date).toISOString().split("T")[0]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Add Transaction Form */}
            <section className="add-transaction">
                <h2>Create Transaction</h2>
                <form onSubmit={handleTransactionSubmit}>
                    <div className="form-group">
                        <label htmlFor="amount">Transaction ID</label>
                        <input type="number" id="transactionId" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="driver">Select Driver</label>
                        <select id="driver" value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)} required>
                            <option value="">Select a driver</option>
                            {drivers.map((driver) => (
                                <option key={driver.id} value={driver._id}>
                                    {driver.name} - {driver.vehicle}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    </div>
                    <button type="submit" className="submit-button">
                        Create Transaction
                    </button>
                </form>
            </section>

            {/* Add New Driver */}
            <section className="add-driver">
                <h2>Add New Driver</h2>
                <form onSubmit={handleNewDriverSubmit}>
                    <div className="form-group">
                        <label htmlFor="driverName">ID</label>
                        <input type="text" id="driverId" value={newDriver.id} onChange={(e) => setNewDriver({ ...newDriver, id: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="driverName">Driver Name</label>
                        <input type="text" id="driverName" value={newDriver.name} onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vehicle">Vehicle</label>
                        <input type="text" id="vehicle" value={newDriver.vehicle} onChange={(e) => setNewDriver({ ...newDriver, vehicle: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userUsername">Username</label>
                        <input type="text" id="userUsername" value={newDriver.userUsername} onChange={(e) => setNewDriver({ ...newDriver, userUsername: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userPassword">Password</label>
                        <input type="password" id="userPassword" value={newDriver.userPassword} onChange={(e) => setNewDriver({ ...newDriver, userPassword: e.target.value })} required />
                    </div>
                    <button type="submit" className="submit-button">
                        Add Driver
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Manager;
