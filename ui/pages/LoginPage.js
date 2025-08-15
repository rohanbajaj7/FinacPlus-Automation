class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginButtonBooksPage = "#login"; // Login button 
        this.usernameInput = "#userName";     // Username 
        this.passwordInput = "#password";     // Password 
        this.loginButtonLoginPage = "#login"; // Login button 
    }

    // Click the Login button 
    async clickLoginOnBooksPage() {
        console.log("Clicking Login on Books page...");
        await this.page.locator(this.loginButtonBooksPage).click();
    }

    // Enter the username 
    async enterUsername(username) {
        console.log(`Entering username: ${username}`);
        await this.page.locator(this.usernameInput).fill(username);
    }

    // Enter the password 
    async enterPassword(password) {
        console.log(`Entering password: ${'*'.repeat(password.length)}`);
        await this.page.locator(this.passwordInput).fill(password);
    }

    // Click the Login button 
    async clickLoginOnLoginPage() {
        console.log("Clicking Login on Login page...");
        await this.page.locator(this.loginButtonLoginPage).click();
    }
}

module.exports = { LoginPage };
