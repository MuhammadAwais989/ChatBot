// sendOrderStatus.js
const axios = require("axios");

const sendOrderStatus = async (to, token, phoneId) => {
  return axios.post(
    `https://graph.facebook.com/v18.0/${phoneId}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      text: {
        body: "📦 Your order is being processed.\nExpected delivery in 2 days."
      }
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );
};

module.exports = sendOrderStatus;
