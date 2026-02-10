// webhook.js
const sendDefaultMenu = require("./sendDefaultMenu");
const sendProduct = require("./sendProduct");
const sendOrderStatus = require("./sendOrderStatus");

const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;

const webhook = async (req, res) => {
  try {
    const entry = req.body.entry?.[0];
    console.log(entry);

    const change = entry?.changes?.[0];
    console.log(change);
    const message = change?.value?.messages?.[0];
    console.log(message);

    if (!message) return res.sendStatus(200);
    const from = message.from;

    // Button reply
    if (message.type === "interactive") {
      const buttonId = message.interactive.button_reply.id;
      if (buttonId === "PRODUCT") {
        await sendProduct(from, WHATSAPP_TOKEN, PHONE_NUMBER_ID);
      }

      if (buttonId === "ORDER") {
        await sendOrderStatus(from, WHATSAPP_TOKEN, PHONE_NUMBER_ID);
      }

      if (buttonId === "MENU") {
        await sendDefaultMenu(from, WHATSAPP_TOKEN, PHONE_NUMBER_ID);
      }
    }

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = webhook;
