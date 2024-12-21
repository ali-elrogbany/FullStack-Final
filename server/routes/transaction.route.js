let mongoose = require("mongoose"),
    express = require("express"),
    router = express.Router();

let transactionSchema = require("../models/Transaction");

// Route to create a new transaction
router.route("/create-transaction").post((req, res, next) => {
    transactionSchema
        .create(req.body)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((error) => next(error));
});

// Route to get all transactions, including driver data
router.route("/").get((req, res, next) => {
    transactionSchema
        .find()
        .populate("driver") // This will populate the 'driver' field with the related driver data
        .then((data) => {
            res.json(data);
        })
        .catch((error) => next(error));
});

// Route to get all transactions for a specific driver
router.route("/driver/:driverId").get((req, res, next) => {
    const { driverId } = req.params; // Extract the driver ID from the route parameter

    transactionSchema
        .find({ driver: driverId }) // Filter transactions by the driver's ID
        .populate("driver") // Populates the 'driver' field with data from the 'Driver' collection
        .then((data) => {
            if (data.length === 0) {
                return res.status(404).json({ message: "No transactions found for this driver" });
            }
            res.json(data);
        })
        .catch((error) => next(error));
});

// Route to update the status of a specific transaction
router.route("/update-status/:transactionId").put((req, res, next) => {
    const { transactionId } = req.params;
    const { status } = req.body; // Extract the new status from the request body

    // Check if the status is valid
    if (!["Pending", "Completed", "Cancelled"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    // Update the transaction status
    transactionSchema
        .findByIdAndUpdate(transactionId, { status: status }, { new: true }) // { new: true } returns the updated document
        .then((updatedTransaction) => {
            if (!updatedTransaction) {
                return res.status(404).json({ message: "Transaction not found" });
            }
            res.json(updatedTransaction);
        })
        .catch((error) => next(error));
});

module.exports = router;
