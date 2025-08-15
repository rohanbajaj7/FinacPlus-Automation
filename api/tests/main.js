const { execSync } = require("child_process");

console.log("🚀 Running Create User...");
execSync("node createUser.js", { stdio: "inherit" });

console.log("\n🚀 Running Get User...");
execSync("node getUser.js", { stdio: "inherit" });

console.log("\n🚀 Running Patch User...");
execSync("node updateUser.js", { stdio: "inherit" });

console.log("\n✅ All API tasks completed!");
