const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// כאן את מדביקה את ה-API Key שלך מ-Render
const API_KEY = process.env.RENDER_API_KEY;
app.get('/services', async (req, res) => {
  try {
    const response = await axios.get('https://api.render.com/v1/services', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });
    
    // מחזיר רק את הנתונים שקיבלנו מ-Render
    res.json(response.data);
  } catch (err) {
    console.error("Error details:", err.response ? err.response.data : err.message);
    res.status(500).json({ error: "נכשל בשליפת הנתונים מהשרת של Render" });
  }
});

app.get('/', (req, res) => {
    res.send('Server is up! Go to /services to see your apps.');
});

app.listen(port, () => {
  console.log(`השרת רץ בכתובת http://localhost:${port}`);
});