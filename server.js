const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const employeeRoutes = require("./routes/employeeRoutes");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.use(cors({
  origin: "https://ems-frontend-project.onrender.com",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));

app.options("*", cors());

app.use(express.json());

connectDB();

app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});