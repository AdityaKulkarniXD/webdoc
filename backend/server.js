// app.js or your main server file
const express = require('express');
const http = require('http');
const { initSocket } = require('./utils/socket'); // Adjust path as needed
const routes = require('./route/routes'); // Import all routes
const app = express();
const server = http.createServer(app);
const cors = require('cors');
const connectDB = require('./utils/mongodb'); // Adjust path as needed

// Initialize Socket.IO
initSocket(server);

// Middleware
app.use(express.json());
app.use(cors({
    origin: '*',
    credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

// Import routes
const debugRoutes = require('./route/callRoutes'); // Adjust path as needed
const callRoutes = require('./route/callRoutes'); // Your existing call routes

// Use routes
app.use('/api/debug', debugRoutes); // Debug endpoints with /api/debug prefix
app.use('/api/calls', callRoutes); // Your existing call routes


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    connectDB(); // Connect to MongoDB

    app.get("/api/v1", (req, res) => {
        res.json({ message: "Welcome to Medlynk" });
    });

    for (let route of routes) {
        app.use('/api/v1', route);
    }
    console.log(`🚀 Server running on port ${PORT}`);
    // console.log(`📊 Debug endpoints available at:`);
    // console.log(`   GET  /api/debug/doctors - List registered doctors`);
    // console.log(`   POST /api/debug/test-call - Test call request`);
    // console.log(`   GET  /api/debug/recordings - List active recordings`);
    // console.log(`   POST /api/debug/recording/start - Start recording`);
    // console.log(`   POST /api/debug/recording/stop - Stop recording`);
    // console.log(`   GET  /api/debug/status - Server status`);
});