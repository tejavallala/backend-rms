const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    restaurantName: { type: String, required: true },
    restaurantArea: { type: String, required: true },
    phoneNumber: { type: String },
    seatsAvailable: { type: String }
}, {
    collection: "restaurant"
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
