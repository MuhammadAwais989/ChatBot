const axios = require("axios");

const sendDefaultMenu = async (to, token, phoneId) => {
  return axios.post(
    `https://graph.facebook.com/v18.0/${phoneId}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: {
          text: "👋 Welcome!\nPlease choose an option:"
        },
        action: {
          buttons: [
            {
              type: "reply",
              reply: { id: "PRODUCT", title: "🛍 Product Detail" }
            },
            {
              type: "reply",
              reply: { id: "ORDER", title: "📦 Order Status" }
            },
            {
              type: "reply",
              reply: { id: "MENU", title: "🔙 Menu" }
            }
          ]
        }
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

module.exports = sendDefaultMenu;
