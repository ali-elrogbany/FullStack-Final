let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

// Import the Driver schema
let driverSchema = require("../models/Driver");
let userSchema = require("../models/User");

// Route to create a new driver
router.route("/create-driver").post((req, res, next) => {
    driverSchema
        .create(req.body)
        .then((data) => {
            console.log("Driver created:", data);
            res.json(data);
        })
        .catch((error) => next(error));
});

// Route to get all drivers
router.route("/").get((req, res, next) => {
    driverSchema
        .find()
        .then((data) => {
            res.json(data);
        })
        .catch((error) => next(error));
});

// Route to change driver status (Active or Inactive)
router.route("/change-status/:id").put((req, res, next) => {
    const driverId = req.params.id;
    const { status } = req.body;

    // Validate that status is either "Active" or "Inactive"
    if (status !== "Active" && status !== "Inactive") {
        return res.status(400).json({ error: "Status must be 'Active' or 'Inactive'" });
    }

    // Find driver by ID and update the status
    driverSchema
        .findByIdAndUpdate(driverId, { status }, { new: true })
        .then((updatedDriver) => {
            if (!updatedDriver) {
                return res.status(404).json({ error: "Driver not found" });
            }
            res.json(updatedDriver);
        })
        .catch((error) => next(error));
});

// Route to get a driver's information based on their username
router.route("/driver-by-username/:username").get((req, res, next) => {
    const { username } = req.params;

    // Find the user by username
    userSchema
        .findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            // Find the driver by the user's _id
            driverSchema
                .findOne({ user: user._id })
                .then((driver) => {
                    if (!driver) {
                        return res.status(404).json({ error: "Driver not found for this user" });
                    }
                    res.json(driver);
                })
                .catch((error) => next(error));
        })
        .catch((error) => next(error));
});

module.exports = router;
