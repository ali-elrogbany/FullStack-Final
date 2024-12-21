const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const questionRoutes = require("./routes/question.route");
const userRoutes = require("./routes/user.route");
const driverRoutes = require("./routes/driver.route");
const transactionRoutes = require("./routes/transaction.route");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
    .connect("mongodb+srv://alielrogbany:A12345678@aloush.4y2l93d.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Register question routes
app.use("/questions", questionRoutes);
app.use("/users", userRoutes);
app.use("/drivers", driverRoutes);
app.use("/transactions", transactionRoutes);

// Test route (Optional)
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
