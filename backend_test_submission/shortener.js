const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 4000;

app.use(express.json());

const urlMap = {};

// Shorten URL endpoint
app.post('/shorten', (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // Generate a short code
    const code = crypto.randomBytes(3).toString('hex');
    urlMap[code] = url;

    res.json({ shortUrl: `http://localhost:${PORT}/${code}` });
});

// Redirect endpoint
app.get('/:code', (req, res) => {
    const url = urlMap[req.params.code];
    if (url) {
        res.redirect(url);
    } else {
        res.status(404).send('URL not found');
    }
});

app.listen(PORT, () => {
    console.log(`URL Shortener running at http://localhost:${PORT}`);
});