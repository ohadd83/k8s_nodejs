const express = require('express');

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Serve static files from public directory
app.use(express.static('public'));

// Import routes
const usersRoute = require('./routes/users');

app.use('/users', usersRoute);


// Health check endpoint
app.get('/healthz', (req, res) => {
    res.status(200).json({
        status: "UP"
    });
});


// Main endpoint
app.get('/api', (req, res) => {
    res.json({
        message: "Hello from Node.js Web Application"
    });
});


// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Node.js application running on port ${PORT}`);
});
