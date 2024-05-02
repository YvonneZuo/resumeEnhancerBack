// app.js

const express = require('express');
const app = express();
const resumeRouter = require('./routes/resume');

// Middleware to parse JSON bodies
app.use(express.json());

// Use the resume router for /api routes
app.use('/api', resumeRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
