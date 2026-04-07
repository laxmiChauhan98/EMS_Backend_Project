const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

// GET all employees
exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

// POST new employee
// exports.createEmployee = async (req, res) => {
//   const employee = new Employee(req.body);
//   const savedEmployee = await employee.save();
//   res.status(201).json(savedEmployee);
// };
exports.createEmployee = async (req, res) => {

try{

const { name, email, password, department, salary } = req.body;

// hash password
const hashedPassword = await bcrypt.hash(password, 10);

const employee = new Employee({
name,
email,
password: hashedPassword,
department,
salary
});

const savedEmployee = await employee.save();

res.status(201).json(savedEmployee);

}catch(error){

res.status(500).json({message:error.message});

}

};
//endpoint for employee login(hashed password)
exports.loginEmployee = async (req, res) => {

try {

const { email, password } = req.body;

// find employee by email
const employee = await Employee.findOne({ email });

if (!employee) {
return res.status(404).json({ message: "Email not found" });
}

// compare entered password with hashed password
const isMatch = await bcrypt.compare(password, employee.password);

if (!isMatch) {
return res.status(401).json({ message: "Invalid password" });
}

res.json({
message: "Login successful",
employee
});

} catch (error) {

res.status(500).json({ message: error.message });

}

};

//reset password
exports.resetPassword = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await Employee.findOneAndUpdate(
      { email: email },
      { password: password },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    res.json({ message: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

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

