markdown
Copy code
# Project Name

## Description

This project is a multi-language application with a dashboard for managing projects and estimates. It is built using React, Material UI, and integrates with a JSON server for managing API data.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version >= 14.x)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)
- [JSON Server](https://github.com/typicode/json-server) (for mock API)

## Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/your-project.git
cd your-project


### 2. Install dependencies
Install the necessary dependencies using npm or yarn.

# For npm
npm install

# For yarn
yarn install

### 3. Environment Variables
## Create a .env file in the root of your project and add the following environment variables:

VITE_API_BASE_URL="http://localhost:5000/"

# This will configure your API base URL for the JSON server.

### 4. Start the React Application
## To run the React app in development mode, use the following command:

# For npm
npm run dev

# For yarn
yarn dev

# This will start the app at http://localhost:5173/ (or a similar port).


### 5. Running the JSON Server
To mock the backend API, you'll need to run the JSON server.

## Setting up the JSON Server:
Create a db.json file in the root of the project with the following structure:

## Install JSON server globally (if you haven't already):
npm install -g json-server

## Start the JSON server with the following command:
json-server --watch db.json --port 5000

# This will run the mock API at http://localhost:5000/ with the /projects endpoint.

### 6. Running the Application with JSON Server
## Ensure both the React app and JSON server are running.

The app should now be connected to the mock API. You can interact with the projects endpoint using axios for actions like creating, updating, and listing projects.

i18n Setup (Multi-Language Support)
This project uses i18next for multi-language support.

Adding new languages:
Add translations in the public/locales directory (for example, en.json and fr.json).
To switch languages, use the language switcher in the UI or update the language in the i18n config file.


# Available Scripts
In the project directory, you can run:

# npm run dev or yarn dev
Runs the app in development mode. Open http://localhost:5173 to view it in the browser.

# npm run build or yarn build
Builds the app for production to the dist folder.

# json-server --watch db.json
Starts the JSON server for mocking API requests.

Learn More
To learn more about the tools used in this project, check out the following resources:

React documentation
Material UI documentation
JSON Server documentation
i18next documentation