// Express to run server and routes
const express = require('express');

// Start up an app instance
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */
// Configuring express to use dependencies as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance to enable communication between browser and Express server without security interruptions
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Start server
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}