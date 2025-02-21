const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const user_id = "TejasGoyal_22082004";  
const email = "22bcs10652@cuchd.in";  
const roll_number = "22BCS10652";  

// POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: "Invalid input format" });
        }

        let numbers = [];
        let alphabets = [];
        
        // Separate numbers and alphabets
        data.forEach(item => {
            if (!isNaN(item)) {
                numbers.push(item);
            } else if (/^[A-Za-z]$/.test(item)) {
                alphabets.push(item);
            }
        });

        // Find highest alphabet (case insensitive)
        let highest_alphabet = alphabets.length ? [alphabets.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1).pop()] : [];

        res.json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_alphabet
        });

    } catch (error) {
        res.status(500).json({ is_success: false, error: "Internal Server Error" });
    }
});

// GET endpoint for /bfhl
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
