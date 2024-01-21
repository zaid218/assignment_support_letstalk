const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const empController = require("../Controllers/empController");
const razorPay = require("../Controllers/razorPay");

//=======================> User <====================

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.loginUser);
router.post("/api/user/logout", userController.logout);
router.put("/api/user/:id", userController.updateUser);
router.delete("/api/user/:id", userController.deleteUser);

//=======================> Employ <====================

router.post("/api/user/empAll", empController.getEmp)
router.put("/api/user/empput/:id", empController.getEmpById)
router.post("/api/user/emp", empController.addEmp)
router.put("/api/user/emp/:userId/:empId", empController.updateEmp)
router.post("/api/user/emp/:userId/:empId", empController.deleteEmp)

//=======================> payment <====================
router.post("/api/payment", razorPay.payment)
router.post("/api/payment/verify", razorPay.verifyPaymnet)

module.exports = router;