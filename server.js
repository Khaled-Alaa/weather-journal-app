// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
const port = 3000;
app.listen(port, listening);
function listening() {
  console.log(`running on localhost: ${port}`);
}

// Setup Server
// GET route
app.get("/all", sendData);

function sendData(request, response) {
  response.send(projectData);
}

// POST route
app.post("/addData", addData);

function addData(request, response) {
  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.city = request.body.city;
  projectData.feelings = request.body.feelings;
  response.end();
}