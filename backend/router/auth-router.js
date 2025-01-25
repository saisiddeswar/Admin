// auth-router.js
const express = require("express");
const router = express.Router();
const controllers = require("../controllers/auth-contoller");

// Authentication routes
router.route("/register").post(controllers.register);
router.route("/login").post(controllers.login);

// Health data routes
router.route("/health-data").post(controllers.saveHealthData);
router.route("/health-getdata").get(controllers.getHealthData);
router.route("/health-data/:userId").put(controllers.updateHealthData); // New route for updating health data

// Admin route to get all users
router.route("/users").get(controllers.getUsers);

module.exports = router;