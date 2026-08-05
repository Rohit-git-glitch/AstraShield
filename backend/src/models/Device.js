const mongoose = require("mongoose");

// Stores information about each registered edge device (ESP32).
const deviceSchema = new mongoose.Schema(
    {
        // Unique identifier of the ESP32 device.
        deviceId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        // Friendly name displayed on the dashboard.
        name: {
            type: String,
            required: true,
            trim: true,
        },

        // Current connectivity status.
        status: {
            type: String,
            enum: ["Online", "Offline"],
            default: "Offline",
        },

        // Timestamp of the last message received from this device.
        lastSeen: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Device", deviceSchema);