const mongoose = require("mongoose");

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ["Completed", "Pending", "Cancelled"] },
});

// Export the Transaction model
module.exports = mongoose.model("Transaction", transactionSchema);
