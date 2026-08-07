const mqtt = require("mqtt");

const clientId =
    process.env.MQTT_CLIENT_ID || `astrashield-backend-${Date.now()}`;

const client = mqtt.connect(process.env.MQTT_BROKER, {
    clientId,
    reconnectPeriod: 5000,
});

client.on("connect", () => {
    console.log("✅ Connected to MQTT Broker");

    client.subscribe(process.env.MQTT_TOPIC, (err) => {
        if (err) {
            console.error("❌ Failed to subscribe:", err.message);
            return;
        }

        console.log(`📡 Subscribed to topic: ${process.env.MQTT_TOPIC}`);
    });
});

client.on("message", (topic, message) => {
    // MQTT payload arrives as a Buffer, so convert it before processing.
    console.log(message.toString());
});

client.on("error", (error) => {
    console.error("❌ MQTT Error:", error.message);
});

module.exports = client;