const express = require("express");
const router = express.Router();

const {
  getEmployees,
  createEmployee,
  resetPassword,
  updateEmployee,
  deleteEmployee,
  loginEmployee
  
} = require("../controllers/employeeController");

router.get("/", getEmployees);
router.post("/", createEmployee);
router.put("/reset-password", resetPassword);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.post("/login", employeeController.loginEmployee);



module.exports = router;