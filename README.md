# Weather-Journal App Project

## Overview

This project is an asynchronous web app that uses Web API and user data to dynamically update the UI. It fetches informtion from https://openweathermap.org/, sends it to the server and then requests it again to update the UI.
The application works only for zip codes from the USA only.

## Instructions

A server is set upp in `server.js` file using Express. The `website/app.js` file contains the app logic. You can see `index.html` for element references, and `style.css` contains the app styles. To run the app a .env file with openweathermap.org API key needs to be added.

## Dependencies

Instalation of node.js, Express, Dotenv, Node-fetch and Cors libraries is required.
