const getEmployees = "SELECT * FROM employees";
const getEmployeeById = "SELECT * FROM employees WHERE id = $1";
const checkEmailExists = "SELECT e FROM employees e WHERE e.email = $1"
const addEmployee = "INSERT INTO employees (name, email, age, dob) VALUES ($1, $2, $3, $4)";
const deleteEmployee =  "DELETE FROM employees WHERE id = $1";
const updateEmployee = "UPDATE employees SET name = $1 where id = $2";

module.exports = {
    getEmployees, getEmployeeById, checkEmailExists, addEmployee, deleteEmployee, updateEmployee, 
};