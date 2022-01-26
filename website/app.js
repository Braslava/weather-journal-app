/* Global Variables */
const genereteButton = document.querySelector('#generate');

// Create a new date instance dynamically with JS
let date = new Date();
const options = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};
let currentDate = date.toLocaleDateString('en-EN', options);

function handleError(error) {
	alert(
		`Something went wrong. Please chack if you have enetered a valid Zip Code!`
	);
}

/* Function called by event listener */
const generateWeatherInfo = async () => {
	let zip = document.querySelector('#zip').value.trim();
	let feeling = document.querySelector('#feelings').value;
	// display an error alert if no weather data has been received of the zip code is not the right length or contains non-numeric characters
	if (!zip) {
		alert('Please enter a zip code!');
		return;
	}
	if (zip.length !== 5 || zip != zip.match(/^\d+$/)) {
		alert(
			'Could not get weather data. Please make sure the zip code is valid!'
		);
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
		.then(() => retrieveData('/all'))
		.catch(handleError);
};

/* Function to GET Web API Data*/
// Write an async function that uses fetch() to make a GET request to the server to fetch data from the OpenWeatherMap API
const getWebApiData = async (zipCode, countryCode = 'us') => {
	const url = `/weather/${zipCode},${countryCode}`;
	// url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}&units=imperial`;
	const response = await fetch(url);
	try {
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
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
		updateUi(allData.temp, allData.content, allData.date);
	} catch (error) {
		console.log('error', error);
		// appropriately handle the error
	}
};

function updateUi(temp, content, date) {
	// prettier-ignore
	document.querySelector('#temp').innerHTML = `Temperature: ${Math.round(temp)}\xB0F`;
	// prettier-ignore
	document.querySelector('#content').innerHTML = `Feeling: ${content}`;
	document.querySelector('#date').innerHTML = `Date: ${date}`;
}

// function resetForm(){
// 	document.querySelector('.form').reset();
// }

// Event listener to add function to existing HTML DOM element
genereteButton.addEventListener('click', generateWeatherInfo);
