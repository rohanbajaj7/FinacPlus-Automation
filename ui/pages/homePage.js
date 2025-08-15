class HomePage {
    constructor(page) {
        this.page = page;
        this.bookStoreCard = "//h5[text()='Book Store Application']";
    }

    async gotoHomePage() {
        console.log("Navigating to DemoQA homepage...");
        await this.page.goto('https://demoqa.com');
    }

    async scrollToBookStoreCard() {
        console.log("Scrolling to Book Store card...");
        await this.page.locator(this.bookStoreCard).scrollIntoViewIfNeeded();
    }

    async clickBookStoreCard() {
        console.log("Clicking on Book Store card...");
        await this.page.locator(this.bookStoreCard).click();
    }
}

module.exports = { HomePage };
