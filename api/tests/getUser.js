// Load environment variables from .env file
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

console.log("BASE_URL:", BASE_URL);

// Read userId from file
const userJsonPath = path.join(__dirname, '../../userId.json');
if (!fs.existsSync(userJsonPath)) {
  console.error('userId.json not found. Please make sure createUser.js ran successfully.');
  process.exit(1);
}

const userData = JSON.parse(fs.readFileSync(userJsonPath, 'utf8'));
const userId = userData.id;
console.log("User ID:", userId);

// Prepare output folder and file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(__dirname, '../../outputs');
const outputFile = path.join(outputDir, `getUser_${timestamp}.txt`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Fetch user data from API
fetch(`${BASE_URL}/api/users/${userId}`, {
  method: "GET",
  headers: {
    "Accept": "application/json",
    "x-api-key": API_KEY
  }
})
  .then(response => {
    console.log("Status Code:", response.status);
    return response.json().then(data => ({ status: response.status, body: data }));
  })
  .then(result => {
    console.log("Response Body:", result.body);
    let log = `Status Code: ${result.status}\nResponse Body: ${JSON.stringify(result.body, null, 2)}\n`;

    if (result.status === 200) {
      console.log(`User ${userId} fetched successfully.`);
      log += `User ${userId} fetched successfully.\n`;
    } else {
      console.error(`Failed to fetch user ${userId}.`);
      log += `Failed to fetch user ${userId}.\n`;
    }

    fs.writeFileSync(outputFile, log, 'utf8');
    console.log(`Output saved to ${outputFile}`);
  })
  .catch(error => console.error("Error:", error));
