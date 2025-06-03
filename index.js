const cors = require('cors');
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = 3000;
const WEATHER_API_KEY = 'bfe733a1fcb444d5a8684745250306'; // <-- Twój klucz API

app.use(express.json());

app.use(cors({
  origin: 'https://projectg11.github.io/backyard-ultra-timer/', // <- podmień na swój frontend z GitHub Pages
  methods: ['GET']
}));

// Endpoint: /weather?lat=...&lon=...
app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Brak parametru lat lub lon' });
  }

  try {
    const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=no`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: 'Błąd w API pogodowym' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Problem z pobraniem danych' });
  }
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});

