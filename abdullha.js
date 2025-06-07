const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());       // JSON পার্স করার জন্য
app.use(express.urlencoded({ extended: true })); // form-urlencoded পার্স করার জন্য

app.post('/send-request', async (req, res) => {
  const phone = req.body.phone;

  if (!phone) {
    return res.json({ error: "Phone number is required" });
  }

  try {
    const api_url = `https://bomber-lyart.vercel.app/api/free-palestine?phone=${encodeURIComponent(phone)}`;

    const response = await axios.get(api_url, {
      // Optional SSL verify skip is not usually recommended in axios,
      // Node.js by default verifies SSL, if you want to skip:
      // httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });

    if (response.status === 200) {
      res.json({ success: "Request sent successfully" });
    } else {
      res.json({ error: "Failed to send request" });
    }
  } catch (error) {
    res.json({ error: "Failed to send request" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
