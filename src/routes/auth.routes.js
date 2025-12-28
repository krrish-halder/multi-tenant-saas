const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.get("/verify-email", authController.verifyEmail);
router.post("/login", authController.login);
router.post("/switch-tenant", authMiddleware, authController.switchTenant);

module.exports = router;
