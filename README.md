# Playwright Template for API Automation Framework using JavaScript by Walter Rojas

This repository contains a template project for API testing using Playwright. It is designed to provide a robust and flexible framework for testing RESTful APIs, including features for sending various types of HTTP requests, handling responses

## Features

- Support for GET, POST, PUT, and DELETE HTTP methods.
- Users API tests to be executed in parallel and serial
- Reusable request utility functions (getTimeStamp, getRandomValue, generateDynamicEmail, etc)
- Environment configuration using `.env` files for secure token management.
- Dynamic data handling using external JSON files.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v12 or higher)
- npm (usually comes with Node.js)

## Installation

1. **Install Dependencies:**

```sh {"id":"01HRYZ8CC4QXFHXBWG2S7AYG5Z"}
npm install
```

Note: The fs module is a part of Node.js and does not require separate installation.

2. **Set Up Environment Variables:**

- Create a `.env` file in the project root.
- Copy the variables from '.envexample'
- Add the following values to variables:

```yaml {"id":"01HRYZ8CC4QXFHXBWG2WMHPZ6R"}
GOREST_API_TOKEN=YOUR_API_TOKEN
BASE_URL=https://gorest.co.in/public/v2
PRINT_CONSOLE_LOG=true
```

## Running Tests

To run the tests, use the following command:

```sh {"id":"01HRYZ8CC4QXFHXBWG2XN4MZQM"}
npm run api
```

To run the smoke tests, use the following command:

```sh {"id":"01HT16E6JRAQAMCEKV330NP7RT"}
npm run api:smoke
```

To run the regression tests, use the following command:

```sh {"id":"01HT16EVK3J2YDCC7VNECRG8B3"}
npm run api:regression
```

To show the web report, use the following command:

```sh {"id":"01HRZZGK5N62FJVFXDVVCBYS6J"}
npm run open-web-report
```

## Project Structure

- `tests/`: Directory containing test files.
    - `users/`: Directory containing Users specs and json files.
    - `utils/`: Directory containing the utils.js file.
    - `baseAPI.js`: Contains functions for making HTTP requests.
- `.env`: Environment variables for API token, base URL, etc.

## Writing Tests

- Create test files in the `tests/` directory.
- Use the functions from `baseAPI.js ` to send API requests.
- For dynamic data, modify JSON files as needed before sending requests.
