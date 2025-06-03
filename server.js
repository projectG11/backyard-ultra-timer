const express = require('express');
const app = express();
const PORT = 3000;

// Middleware do CORS – pozwala frontendowi łączyć się z backendem
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Prosty testowy endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Działa! Serwer backendowy odpowiada!' });
});

// Start serwera
app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
