const {Router} = require('express');
const controller = require('./controller');
const { authMiddleware } = require('./middleware');

const router = Router();
router.use(authMiddleware);


router.get("/", controller.getEmployees);
router.post("/", controller.addEmployee);
router.get("/:id", controller.getEmployeeById);
router.put("/:id", controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);


module.exports = router;