// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// require cors and bodyParser
const cors = require("cors");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8080;

app.listen(port , () =>{
    console.log(`server running in the port of ${port}`);
});

app.get("/sendData",(req , res)=>{
    res.send(projectData);
});

app.post("/addData",(req , res) =>{
    const data = req.body;
    // add the data
    projectData.temp = data.temp;
    projectData.date = data.date;
    projectData.feelings = data.feelings;
})

