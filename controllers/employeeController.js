const Employee = require("../models/Employee");

// GET all employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// POST new employee
exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  const savedEmployee = await employee.save();
  res.status(201).json(savedEmployee);
};

// UPDATE employee
exports.updateEmployee = async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedEmployee);
};

// DELETE employee
exports.deleteEmployee = async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Employee deleted successfully" });
};