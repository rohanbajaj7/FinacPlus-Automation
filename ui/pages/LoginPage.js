class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginButtonBooksPage = "#login"; // Books page ka Login button
        this.usernameInput = "#userName";     // Username field
        this.passwordInput = "#password";     // Password field
        this.loginButtonLoginPage = "#login"; // Login page ka Login button
    }

    async clickLoginOnBooksPage() {
        console.log("Clicking Login on Books page...");
        await this.page.locator(this.loginButtonBooksPage).click();
    }

    async enterUsername(username) {
        console.log(`Entering username: ${username}`);
        await this.page.locator(this.usernameInput).fill(username);
    }

    async enterPassword(password) {
        console.log(`Entering password: ${'*'.repeat(password.length)}`);
        await this.page.locator(this.passwordInput).fill(password);
    }

    async clickLoginOnLoginPage() {
        console.log("Clicking Login on Login page...");
        await this.page.locator(this.loginButtonLoginPage).click();
    }
}

module.exports = { LoginPage };
