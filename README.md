---
runme:
  id: 01HRYZ8CC5QPRRHPG4CF3P8Z2H
  version: v3
---

# Playwright Template for API Automation Framework using JavaScript by Walter Rojas

This repository contains a template project for API testing using Playwright. It is designed to provide a robust and flexible framework for testing RESTful APIs, including features for sending various types of HTTP requests, handling responses

## Features

- Support for GET, POST, PUT, and DELETE HTTP methods.
- Reusable request utility functions.
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
```

## Running Tests

To run the tests, use the following command:

```sh {"id":"01HRYZ8CC4QXFHXBWG2XN4MZQM"}
npm run test:api
```

To show the web report, use the following command:

```sh {"id":"01HRZZGK5N62FJVFXDVVCBYS6J"}
npm run report
```

## Project Structure

- `baseAPI.js`: Contains functions for making HTTP requests.
- `tests/`: Directory containing test files.
- `.env`: Environment variables for API token and base URL.

## Writing Tests

- Create test files in the `tests/` directory.
- Use the functions from `baseAPI.js ` to send API requests.
- For dynamic data, modify JSON files as needed before sending requests.