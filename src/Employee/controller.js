const pool = require('../../db');

const getEmployees = (req, res) => {
    console.log("getEmployees");
    pool.query("SELECT * FROM employees", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

module.exports = {
    getEmployees,
};