const express = require("express");
const Restaurant = require("../model/restuarantModel");
const restaurantRoute = new express.Router();

// Add a new restaurant
restaurantRoute.post("/add", async (req, res) => {
    const { restaurantName, restaurantArea, phoneNumber, seatsAvailable } = req.body;
    try {
        const newRestaurant = new Restaurant({ restaurantName, restaurantArea, phoneNumber, seatsAvailable });
        await newRestaurant.save();
        res.status(201).json({ message: "Restaurant added successfully", newRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Retrieve all restaurants
restaurantRoute.get("/all", async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(200).json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update a restaurant
restaurantRoute.put("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { restaurantName, restaurantArea, phoneNumber, seatsAvailable } = req.body;
    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(
            id,
            { restaurantName, restaurantArea, phoneNumber, seatsAvailable },
            { new: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant updated successfully", updatedRestaurant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Delete a restaurant
restaurantRoute.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);

        if (!deletedRestaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = restaurantRoute;
