const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

const payload = {
  email: "eve.holt@reqres.in",
  password: "pistol"
};

const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const outputDir = path.join(__dirname, '../../outputs');
const outputFile = path.join(outputDir, `createUser_${timestamp}.txt`);

// Ensure folder exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fetch(`${BASE_URL}/api/register`, {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "x-api-key": API_KEY
  },
  body: JSON.stringify(payload)
})
  .then(response => {
    console.log("Status Code:", response.status);
    return response.json().then(data => ({ status: response.status, body: data }));
  })
  .then(result => {
    console.log("Response Body:", result.body);

    let log = `Status Code: ${result.status}\nResponse Body: ${JSON.stringify(result.body, null, 2)}\n`;

    if (result.body.id) {
      console.log(`✅ Registration Successful! User ID: ${result.body.id}`);
      log += `✅ Registration Successful! User ID: ${result.body.id}\n`;
      fs.writeFileSync(path.join(__dirname, '../../userId.json'), JSON.stringify({ id: result.body.id }, null, 2));
    } else {
      console.error("❌ Registration Failed!");
      log += "❌ Registration Failed!\n";
    }

    fs.writeFileSync(outputFile, log, 'utf8');
    console.log(`📄 Output saved to ${outputFile}`);
  })
  .catch(error => console.error("Error:", error));
