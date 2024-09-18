# **Project Name**

## **Description**

This project is a multi-language application with a dashboard for managing projects and estimates. It is built using React, Material UI, and integrates with a JSON server for managing API data.

---

## **Prerequisites**

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (version >= 14.x)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/getting-started/install)
- [JSON Server](https://github.com/typicode/json-server) (for mock API)

---

## **Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/sagarpanchal0055/test-task.git
cd test-task
```

### **2. Install Dependencies**

Install the necessary dependencies using npm or yarn.

```bash
# For npm
npm install

# For yarn
yarn install
```

### **3. Environment Variables**

Create a `.env` file in the root of your project and add the following environment variable:

```env
VITE_API_BASE_URL="http://localhost:5000/"
```

This will configure your API base URL for the JSON server.

---

### **4. Start the React Application**

To run the React app in development mode, use the following command:

```bash
# For npm
npm run dev

# For yarn
yarn dev
```

This will start the app at http://localhost:5173/ (or a similar port).

### **5. Running the JSON Server**

To mock the backend API, you'll need to run the JSON server.

#### **Setting up the JSON Server:**

1. Create a `db.json` file in the root of the project with the appropriate structure.
2. Install JSON Server globally (if you haven't already):

```bash
npm install -g json-server
```

3. Start the JSON server with the following command:

```bash
# Using npm script
npm run json-server

# Or directly
json-server --watch db.json --port 5000
```

This will run the mock API at http://localhost:5000/ with the /projects endpoint.

### **6. Running the Application with JSON Server**

Ensure both the React app and JSON server are running. The app should now be connected to the mock API. You can interact with the projects endpoint using axios for actions like creating, updating, and listing projects.

---

## **i18n Setup (Multi-Language Support)**

This project uses i18next for multi-language support.

### **Adding New Languages**

Add translations in the `public/locales` directory (for example, `en.json` and `fr.json`). To switch languages, use the language switcher in the UI or update the language in the i18n config file.

---

## **Available Scripts**

In the project directory, you can run:

```bash
# Run the app in development mode
npm run dev or yarn dev

# Build the app for production
npm run build or yarn build

# Start the JSON server for mocking API requests
json-server --watch db.json
```

---

## **Learn More**

To learn more about the tools used in this project, check out the following resources:

- [React documentation](https://reactjs.org/docs/getting-started.html)
- [Material UI documentation](https://mui.com/getting-started/installation/)
- [JSON Server documentation](https://github.com/typicode/json-server)
- [i18next documentation](https://www.i18next.com/)