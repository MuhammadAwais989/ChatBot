const axios = require("axios");

const sendProduct = async (to, token, phoneId) => {
  return axios.post(
    `https://graph.facebook.com/v18.0/${phoneId}/messages`,
    {
      messaging_product: "whatsapp",
      to,
      type: "image",
      image: {
        link: "https://via.placeholder.com/500", // product image URL
        caption: "🛍 Product Name\n💰 Price: Rs. 2500\n⭐ High quality product",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

module.exports = sendProduct;
