// src/index.js
const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve signup page
app.get('/signup', (req, res) => {
    const signupPath = path.join(__dirname, 'public', 'signup.html');
    // Check if signup.html exists
    if (fs.existsSync(signupPath)) {
        res.sendFile(signupPath);
    } else {
        // Handle missing file error
        res.status(404).send('Signup page not found.');
    }
});

// Error handling middleware for 404 errors
app.use((req, res, next) => {
    res.status(404).send('Page not found.');
});

// Docker configuration
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});
