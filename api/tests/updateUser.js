// Load environment variables from root .env file
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

// Read userId 
const userJsonPath = path.join(__dirname, '../../userId.json');
if (!fs.existsSync(userJsonPath)) {
  console.error('userId.json not found. Run createUser.js first.');
  process.exit(1);
}

const userData = JSON.parse(fs.readFileSync(userJsonPath, 'utf8'));
const userId = userData.id;
console.log("User ID:", userId);

//  output folder and file
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(__dirname, '../../outputs');
const outputFile = path.join(outputDir, `updateUser_${timestamp}.txt`);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

//  update user
async function updateUser() {
  try {
    const payload = { name: "Eve Patched" };

    const response = await fetch(`${BASE_URL}/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY
      },
      body: JSON.stringify(payload)
    });

    console.log("Update Status:", response.status);
    const data = await response.json();
    console.log("Update Response:", data);

    let log = `Update Status: ${response.status}\nUpdate Response: ${JSON.stringify(data, null, 2)}\n`;

    if (response.status === 200 && data.name === payload.name) {
      console.log(`User ${userId} updated successfully.`);
      log += `User ${userId} updated successfully.\n`;
    } else {
      console.error(`Failed to update user ${userId}.`);
      log += `Failed to update user ${userId}.\n`;
    }

    fs.writeFileSync(outputFile, log, 'utf8');
    console.log(`Output saved to ${outputFile}`);

  } catch (err) {
    console.error("Error:", err.message);
  }
}


updateUser();
