const mongoose = require("mongoose");

// Driver Schema
const driverSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    vehicle: { type: String, required: true },
    status: { type: String, required: true, enum: ["Active", "Inactive"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Driver", driverSchema);
