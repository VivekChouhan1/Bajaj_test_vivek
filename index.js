const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());


// Serve the HTML testing page at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// The main API endpoint as per the requirements
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                user_id: "vivek_chouhan_25122004", 
                message: "The 'data' key with an array is required."
            });
        }
        const user_details = {
            full_name: "vivek_chouhan",
            dob: "25122004",
            email: "vivekchouhan2512@gmail.com",
            roll_number: "22BSA10006"
        };
        // ------------------------------------------

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alphabet_string = "";

        data.forEach(item => {
            if (!isNaN(parseFloat(item)) && isFinite(item)) {
                const num = Number(item);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(String(num));
                } else {
                    odd_numbers.push(String(num));
                }
            } else if (typeof item === 'string' && /^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                alphabet_string += item;
            } else {
                special_characters.push(item);
            }
        });

        const reversed_alphabets = alphabet_string.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            concat_string += (i % 2 !== 0) ? reversed_alphabets[i].toLowerCase() : reversed_alphabets[i].toUpperCase();
        }

        const response = {
            is_success: true,
            user_id: `${user_details.full_name}_${user_details.dob}`,
            email: user_details.email,
            roll_number: user_details.roll_number,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters,
            sum: String(sum),
            concat_string
        };

        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            is_success: false,
            user_id: "vivek_chouhan_25122004",
            message: `An error occurred: ${error.message}`
        });
    }
});

// Start the server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the app for serverless environments like Vercel
module.exports = app;