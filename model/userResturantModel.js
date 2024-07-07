const mongoose = require("mongoose");

const userRestaurantSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userMobileNumber: { type: String, required: true },
    restaurantName: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    numberOfSeats: { type: Number, required: true },
    checkInDate: { type: Date, required: true },
    checkInTime: { type: String, required: true },
    checkOutDate: { type: Date, required: true },
    checkOutTime: { type: String, required: true }
}, {
    collection: "UserRestaurant" 
});

module.exports = mongoose.model("UserRestaurantSchema", userRestaurantSchema);
