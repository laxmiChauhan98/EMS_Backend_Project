const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoutes");


dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

app.use("/api/employees", employeeRoutes);
console.log(employeeRoutes);
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});