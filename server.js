const express = require('express');
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // This enables CORS for all origins, adjust as needed for production

app.get('/place-details', async (req, res) => {
    const { place_id } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Google Places:', error);
        res.status(500).send('Failed to fetch details');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
