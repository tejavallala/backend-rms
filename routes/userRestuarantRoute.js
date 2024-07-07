const express = require("express");
const UserRestaurant = require("../model/userResturantModel"); 
const userRestaurantRoute = new express.Router();

// Create a new user restaurant booking
userRestaurantRoute.post("/add", async (req, res) => {
    const { userName,  restaurantName,userMobileNumber, phoneNumber, email, numberOfSeats, checkInDate, checkInTime, checkOutDate, checkOutTime } = req.body;
    try {
        const newUserRestaurant = new UserRestaurant({
            userName,
            restaurantName,
            userMobileNumber,
            phoneNumber,
            email,
            numberOfSeats,
            checkInDate,
            checkInTime,
            checkOutDate,
            checkOutTime
        });
        await newUserRestaurant.save();
        res.status(201).json({ message: "User restaurant booking added successfully", newUserRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Retrieve all user restaurant bookings
userRestaurantRoute.get("/all", async (req, res) => {
    try {
        const userRestaurants = await UserRestaurant.find();
        res.status(200).json(userRestaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update user restaurant booking details
userRestaurantRoute.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { userName, userMobileNumber, phoneNumber, email, numberOfSeats, checkInDate, checkInTime, checkOutDate, checkOutTime } = req.body;
    try {
        const updatedUserRestaurant = await UserRestaurant.findByIdAndUpdate(id, {
            userName,
            userMobileNumber,
            phoneNumber,
            email,
            numberOfSeats,
            checkInDate,
            checkInTime,
            checkOutDate,
            checkOutTime
        }, { new: true });
        if (updatedUserRestaurant) {
            res.status(200).json({ message: "User restaurant booking updated successfully", updatedUserRestaurant });
        } else {
            res.status(404).json({ message: "User restaurant booking not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a user restaurant booking
userRestaurantRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUserRestaurant = await UserRestaurant.findByIdAndDelete(id);
        if (deletedUserRestaurant) {
            res.status(200).json({ message: "User restaurant booking deleted successfully", deletedUserRestaurant });
        } else {
            res.status(404).json({ message: "User restaurant booking not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = userRestaurantRoute;
