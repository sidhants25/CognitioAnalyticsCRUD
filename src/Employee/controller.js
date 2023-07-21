const pool = require('../../db');
const queries = require('./queries');
const { generateToken, comparePasswords } = require('./auth');


const getEmployees = (req, res) => {
    console.log("getEmployees");
    pool.query(queries.getEmployees, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getEmployeeById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getEmployeeById,[id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows); 
    });
};

const addEmployee = async (req, res) => {
    const {name, email, age, dob} = req.body;
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userId = verifyToken(token);
        if (!userId) {
          return res.status(401).send('Unauthorized');
        }
        
        const user = await pool.query(queries.getUserById, [userId]);
        if (!user.rows.length) {
          return res.status(401).send('Unauthorized');
        }
    
        const isPasswordValid = await comparePasswords(password, user.rows[0].password);
        if (!isPasswordValid) {
          return res.status(401).send('Unauthorized');
        }

    pool.query(queries.checkEmailExists, [email], (error,results) => {
        if (results.rows.length) {
            res.send("Email in use.");
        }

        pool.query(queries.addEmployee, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send("Employee Added Successfully");

        }
        );
    });

    } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const deleteEmployee = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getEmployeeById,[id], (error, results) => {
        const noEmployeeFound = !results.rows.length;
        if (noEmployeeFound) {
            res.send("Employee does not exist, unable to delete.");
        }

        pool.query(queries.deleteEmployee, [id], (error, results) => {
            if (error) throw error;
            //line not working
            res.status(200).send("Employee deleted successfully.");
        });
    });

};

const updateEmployee = (req, res) => {
    const id = parseInt(req.params.id);
    const {name} = req.body;

    pool.query(queries.getEmployeeById,[id], (error, results) => {
        const noEmployeeFound = !results.rows.length;
        if (noEmployeeFound) {
            res.send("Employee does not exist, unable to update information.");
        }

        pool.query(queries.updateEmployee, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Employee information updated successfully");
        });

    });
};



module.exports = {
    getEmployees, getEmployeeById, addEmployee, deleteEmployee, updateEmployee,
};