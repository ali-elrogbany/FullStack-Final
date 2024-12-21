const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    content: { type: String, required: true },
    email: { type: String, required: true },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Question", questionSchema);
