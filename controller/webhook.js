// webhook.js
const sendDefaultMenu = require("./sendDefaultMenu");
const sendProduct = require("./sendProduct");
const sendOrderStatus = require("./sendOrderStatus");

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

const webhook = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // ❗ Ignore status updates
    if (!value?.messages) {
      return res.sendStatus(200);
    }

    const message = value.messages[0];
    const from = message.from;

    console.log("📩 MESSAGE RECEIVED:", message);

    // ✅ Button reply handling
    if (
      message.type === "interactive" &&
      message.interactive?.type === "button_reply"
    ) {
      const buttonId = message.interactive.button_reply.id;
      console.log("✅ BUTTON CLICKED:", buttonId);

      if (buttonId === "PRODUCT") {
        await sendProduct(from, WHATSAPP_TOKEN, PHONE_NUMBER_ID);
      } else if (buttonId === "ORDER") {
        await sendOrderStatus(from, WHATSAPP_TOKEN, PHONE_NUMBER_ID);
      } else if (buttonId === "MENU") {
        await sendDefaultMenu(from, WHATSAPP_TOKEN, PHONE_NUMBER_ID);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ WEBHOOK ERROR:", err);
    res.sendStatus(500);
  }
};


const getWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};

module.exports = {
  webhook,
  getWebhook,
};
