// auth-controller.js
const User = require("../models/usermodel");
const UserHealth = require("../models/UserHealth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    const token = jwt.sign({ userId: user._id }, "your_secret_key", { expiresIn: "1h" });
    res.status(201).json({ msg: "User registered successfully", token, userId: user._id.toString() });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ msg: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userExist.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    const token = jwt.sign({ userId: userExist._id }, "your_secret_key", { expiresIn: "1h" });
    res.status(200).json({ msg: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Save user health data
const saveHealthData = async (req, res) => {
  try {
    const {
      userId,
      gender,
      age,
      activityLevel,
      height,
      weight,
      medicalConditions,
      otherCondition,
      selectedGoals,
    } = req.body;

    // Create or update user health data
    const userHealth = await UserHealth.findOneAndUpdate(
      { userId },
      {
        gender,
        age,
        activityLevel,
        height,
        weight,
        medicalConditions,
        otherCondition,
        selectedGoals,
      },
      { new: true, upsert: true }
    );

    res.status(201).json({ msg: "User health data saved successfully", userHealth });
  } catch (error) {
    console.error("Error saving user health data:", error);
    res.status(500).json({ error: "Failed to save user health data" });
  }
};

// Get user health data
// Get user health data
// Get user health data
const getHealthData = async (req, res) => {
  try {
    const { userId } = req.query; // Use req.query for GET requests
    const userHealth = await UserHealth.findOne({ userId });

    if (!userHealth) {
      return res.status(404).json({ msg: "Health data not found" });
    }

    res.status(200).json({ userHealth });
  } catch (error) {
    console.error("Error fetching user health data:", error);
    res.status(500).json({ error: "Failed to fetch user health data" });
  }
};

// Get all users (for admin panel)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
    
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// auth-controller.js
const updateHealthData = async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // Find and update the user's health data
    const userHealth = await UserHealth.findOneAndUpdate(
      { userId },
      updatedData,
      { new: true }
    );

    if (!userHealth) {
      return res.status(404).json({ msg: "User health data not found" });
    }
    console.log(userHealth);

    res.status(200).json({ msg: "User health data updated successfully", userHealth });
  } catch (error) {
    console.error("Error updating user health data:", error);
    res.status(500).json({ error: "Failed to update user health data" });
  }
};

module.exports = { register, login, saveHealthData, getHealthData, getUsers, updateHealthData };