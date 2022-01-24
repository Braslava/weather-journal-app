// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');

const apiKey = process.env.API_KEY;
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 3000;
const server = app.listen(port, () => {
	// Callback to debug
	console.log(`server running`);
	console.log(`running on localhost: ${port}`);
});

// Initialize all route with a callback function
app.get('/all', sendData);
// Callback function to complete GET '/all'
function sendData(req, res) {
	res.send(projectData);
}
// Post Route
app.post('/add', addData);
function addData(req, res) {
	// projectData = req.body;
	Object.assign(projectData, req.body);
	res.send(projectData);
}

app.get('/weather/:zipAndCountry', async (request, response) => {
	console.log(request.params);
	const zipAndCountry = request.params.zipAndCountry.split(',');
	console.log(zipAndCountry);
	const zipCode = zipAndCountry[0];
	const countryCode = zipAndCountry[1];
	console.log(zipCode, countryCode);

	url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=imperial`;
	//url = `https://api.openweathermap.org/data/2.5/weather?zip=90210,us&appid=${apiKey}&units=imperial`;
	const fetchResponse = await fetch(url);
	try {
		const data = await fetchResponse.json();
		console.log(data);
		response.json(data);
	} catch (error) {
		// appropriately handle the error
		console.log('error', error);
	}
});
