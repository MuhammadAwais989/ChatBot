// index.js
const express = require("express");
require("dotenv").config();

const sendDefaultMenu = require("./controller/sendDefaultMenu");
const webhook = require("./routes/webHook.routes");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Send default menu manually
app.get("/send", async (req, res) => {
  await sendDefaultMenu("923212068909", process.env.WHATSAPP_TOKEN, process.env.PHONE_NUMBER_ID);
  res.send("Menu sent");
});

// Webhook
app.post("/webhook", webhook);

// app.get("/webhook", (req, res) => {
//   res.send("Webhook is live");
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
