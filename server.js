const express = require('express')
const employeeRoutes = require('./src/Employee/routes')
const app = express();
const port = 3000;

app.use(express.json());

// app.use(employeeRoutes);
app.get("/", (req, res) => res.send("Testing app deployment!"));

app.use('/api/v1/employees', employeeRoutes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
