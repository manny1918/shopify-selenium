const BasePage = require('../../components/base-page-helper');
const expectationHerlper = require('../../components/expectation.herlper');
const waitHelper = require('../../components/wait-helper');
const mailhogPage = require('./mailhog-page.po');

class MailhogPageHelper extends BasePage {
	async navigateToMailhog(newDriver = false) {
		await this.navigateTo('http://mailhog.clickbank-tst.com:8025/', newDriver);
	}

	async searchText(text) {
		await mailhogPage.elements.searchbox.element.sendKeys(`${text}\n`);
	}

	async clickOnCustomerReceiptNotification() {
		await waitHelper.waitForElementPresent(mailhogPage.elements.customerReceipt.selector);
		await mailhogPage.elements.customerReceipt.element.click();
	}

	async clickOnClientReceiptNotification() {
		await waitHelper.waitForElementPresent(mailhogPage.elements.clientReceipt.selector);
		await mailhogPage.elements.clientReceipt.element.click();
	}

	async clickOnBackToInboxButton() {
		await mailhogPage.elements.backToInboxButton.element.click();
	}

	async verifyProductTitle(title, backToInbox = false) {
		await driver.switchTo().frame('preview-html');
		await waitHelper.waitForElementPresent(mailhogPage.elements.productTitle(title).selector);
		await expectationHerlper.verifyElementDisplayed(mailhogPage.elements.productTitle(title).selector);
		await driver.switchTo().defaultContent();

		if (backToInbox) {
			await this.clickOnBackToInboxButton();
		}
	}

	async openFirstShippingNotification() {
		await waitHelper.waitForElementPresent(mailhogPage.elements.firstShippingNotification.selector);
		await mailhogPage.elements.firstShippingNotification.element.click();
	}

	async openSecondShippingNotification() {
		await waitHelper.waitForElementPresent(mailhogPage.elements.secondShippingNotification.selector);
		await mailhogPage.elements.secondShippingNotification.element.click();
	}
}

module.exports = new MailhogPageHelper();
