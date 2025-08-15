const { test, expect } = require('@playwright/test');
const fs = require('fs');
const { HomePage } = require('../pages/homePage');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Book Store Application Navigation and Book Search', () => {
    test('Login, search for a book, save details, and logout', async ({ page }) => {
        const home = new HomePage(page);
        const loginPage = new LoginPage(page);

        // Step 1: Go to homepage
        await home.gotoHomePage();
        await page.waitForTimeout(1000);

        // Step 2: Scroll to Book Store card
        await home.scrollToBookStoreCard();
        await page.waitForTimeout(1000);

        // Step 3: Click Book Store card
        await home.clickBookStoreCard();
        await page.waitForTimeout(1000);

        // Step 4: Verify Books page opened
        await expect(page).toHaveURL(/.*books/);
        await page.waitForTimeout(1000);

        // Step 5: Click Login button 
        await loginPage.clickLoginOnBooksPage();
        await page.waitForTimeout(1000);

        // Step 6: Verify Login page opened
        await expect(page).toHaveURL(/.*login/);
        await page.waitForTimeout(1000);

        // Step 7: Enter username and password
        await loginPage.enterUsername('rohanbajaj');
        await page.waitForTimeout(1000);
        await loginPage.enterPassword('Roh@n12345');
        await page.waitForTimeout(1000);

        // Step 8: Click Login button on Login page
        await loginPage.clickLoginOnLoginPage();
        await page.waitForTimeout(1000);

        // Step 9: Verify username and logout button are visible
        const usernameLocator = page.locator('#userName-value');
        const logoutButtonLocator = page.locator('#submit');
        await expect(usernameLocator).toBeVisible();
        await page.waitForTimeout(1000);
        await expect(logoutButtonLocator).toBeVisible();
        console.log(" Username and Logout button are visible");
        await page.waitForTimeout(1000);

        // Step 10: Scroll down and click "Book Store" button
        await page.mouse.wheel(0, 300);
        await page.locator("//span[text()='Book Store']").click();
        await page.waitForTimeout(1000);

        // Step 11: Search for "Learning JavaScript Design Patterns"
        await page.locator('#searchBox').fill('Learning JavaScript Design Patterns');
        await page.waitForTimeout(1000);

        // Step 12: Validate search result contains the book
        const titleLocator = page.locator("//a[text()='Learning JavaScript Design Patterns']");
        await expect(titleLocator).toBeVisible();
        await page.waitForTimeout(1000);

        // Step 13: Get Title, Author, Publisher text
        const title = await titleLocator.textContent();
        const author = await page.locator("//div[text()='Addy Osmani']").textContent();
        const publisher = await page.locator("//div[text()=\"O'Reilly Media\"]").textContent();
        await page.waitForTimeout(1000);

        // Step 14: Save to file
        const fileContent = `Title: ${title.trim()}\nAuthor: ${author.trim()}\nPublisher: ${publisher.trim()}`;
        fs.writeFileSync('book_details.txt', fileContent);
        console.log("Book details saved to book_details.txt");
        await page.waitForTimeout(1000);

        // Step 15: Logout
        await page.locator('#submit').click();
        await page.waitForTimeout(1000);

        // Step 16: Confirm logout
        await expect(page).toHaveURL(/.*login/);
        console.log(" Successfully logged out");

        
        await page.waitForTimeout(2000);
    });
});
