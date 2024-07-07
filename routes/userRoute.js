const express = require("express");
const userModel = require("../model/userModel");
const userRoute = new express.Router();

userRoute.post("/create-user", async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
userRoute.put("/update-password", async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword;
    const updatedUser = await user.save();

    res
      .status(200)
      .json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = userRoute;
