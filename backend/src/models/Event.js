const mongoose = require("mongoose");

// Event Schema
// Every CAN message received from the ESP32 is stored as one Event document.
const eventSchema = new mongoose.Schema(
    {
        // Unique identifier of the edge device sending the event.
        deviceId: {
            type: String,
            required: true,
            trim: true,
        },

        // CAN Message Identifier (Example: 0x101 for Engine ECU)
        canId: {
            type: String,
            required: true,
            uppercase: true,
            trim: true,
        },

        // Data Length Code (0–8 bytes for Classical CAN)
        dlc: {
            type: Number,
            required: true,
            min: 0,
            max: 8,
        },

        // Raw CAN payload stored as an array of bytes.
        // Example: [12, 55, 89, 11, 4, 0, 1, 200]
        data: {
            type: [Number],
            required: true,
            validate: {
                validator: function (value) {
                    return value.length === this.dlc;
                },
                message: "Data length must match the DLC value.",
            },
        },

        // Output produced by our Hybrid Detection Engine
        // (Rule-Based + TinyML)
        status: {
            type: String,
            enum: ["Normal", "Suspicious", "Attack"],
            default: "Normal",
        },

        // TinyML confidence score (percentage)
        confidence: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },

        // Attack category (only applicable when status = Attack)
        attackType: {
            type: String,
            enum: ["Spoofing", "Replay", "DoS", "None"],
            default: "None",
        },

        // Severity assigned by the backend
        severity: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "Low",
        },
    },
    {
        // Automatically creates:
        // createdAt
        // updatedAt
        timestamps: true,
    }
);

module.exports = mongoose.model("Event", eventSchema);