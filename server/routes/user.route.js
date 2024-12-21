const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Import User model
const Driver = require("../models/Driver"); // Import Driver model

// Registration Route
router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ error: "Both fields are required" });
        }

        // Create a new user
        const newUser = new User({ username, password });
        const savedUser = await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: savedUser });
    } catch (err) {
        console.error("Registration error:", err);
        if (err.code === 11000) {
            res.status(400).json({ error: "Username already exists" });
        } else {
            res.status(500).json({ error: "Failed to register user" });
        }
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Compare the password directly
        if (user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Check if the user is a driver
        const isDriver = await Driver.exists({ user: user._id });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                isDriver: !!isDriver, // Send whether the user is a driver
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
