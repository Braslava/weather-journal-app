/* Global Variables */
const genereteButton = document.querySelector('#generate');
const apiKey = '44752acdd691f1a75d1d2edfa1146f32&units=imperial';

// Create a new date instance dynamically with JS
let date = new Date();
const options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};
let currentDate = date.toLocaleDateString('en-EN', options);
//date.getMonth() + 1 + '.' + date.getDate() + '.' + date.getFullYear();

/* Function called by event listener */
const generateWeatherInfo = async () => {
	// get the zip code value
	const zip = document.querySelector('#zip').value.trim();
	const feeling = document.querySelector('#feelings').value;
	// display an error alert if no weather data has been received
	if (!zip) {
		alert('Please enter a zip code!');
		return;
	}
	// display an error alert if the zip code is not the right length or contains non-numeric characters
	if (zip.length !== 5 || zip != zip.match(/^\d+$/)) {
		alert('Please make sure the zip code is valid!');
		return;
	}
	getWebApiData(zip)
		.then((data) => {
			console.log(data);
			postData('/add', {
				city: data.name,
				date: currentDate,
				temp: data.main.temp,
				content: feeling,
			});
		})
		.then(() => retrieveData('/all'));
};

/* Function to GET Web API Data*/
// Write an async function that uses fetch() to make a GET request to the OpenWeatherMap API
const getWebApiData = async (zipCode, countryCode = 'us') => {
	url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`;
	const response = await fetch(url);
	try {
		const data = await response.json();
		return data;
	} catch (error) {
		// appropriately handle the error
		console.log('error', error);
	}
};

/* Function to POST data */
const postData = async (url = '', data = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		// Body data type must match "Content-Type" header
		body: JSON.stringify(data),
	});

	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
};

/* Function to GET Project Data */
const retrieveData = async (url = '') => {
	const request = await fetch(url);
	try {
		// Transform into JSON
		const allData = await request.json();
		console.log(allData);
		// Write updated data to DOM elements
		// prettier-ignore
		document.querySelector('#temp').innerHTML = `Temperature: ${Math.round(allData.temp)}\xB0F`;
		// prettier-ignore
		document.querySelector('#content').innerHTML = `Feeling: ${allData.content}`;
		document.querySelector('#date').innerHTML = `Date: ${allData.date}`;
	} catch (error) {
		console.log('error', error);
		// appropriately handle the error
	}
};

// Event listener to add function to existing HTML DOM element
genereteButton.addEventListener('click', generateWeatherInfo);
