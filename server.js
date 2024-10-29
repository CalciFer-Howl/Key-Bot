// Save this as `server.js`
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

let isActive = false; // Key status (Activate/Deactivate)
const SECRET_KEY = 'open-tell'; // Set your secret key here

// Route to toggle key status
app.get('/toggle', (req, res) => {
    isActive = !isActive;
    res.send(`Key is now ${isActive ? 'Activated' : 'Deactivated'}`);
});

// Route for bot to check key status
app.get('/check-key', (req, res) => {
    if (isActive) {
        res.json({ status: 'active', key: SECRET_KEY });
    } else {
        res.json({ status: 'inactive' });
    }
});

// Frontend route with Activate/Deactivate button
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Key Activation</title></head>
            <body>
                <h1>Key Status: ${isActive ? 'Activated' : 'Deactivated'}</h1>
                <button onclick="toggleKey()">Toggle Key</button>
                <script>
                    async function toggleKey() {
                        await fetch('/toggle');
                        location.reload();
                    }
                </script>
            </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
