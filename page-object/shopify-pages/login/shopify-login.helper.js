const BasePage = require('../../../components/base-page-helper');
const loggerHelper = require('../../../components/logger-helper');
const pageHelper = require('../../../components/page.helper');
const waitHelper = require('../../../components/wait-helper');
const ShopifyLoginPage = require('../../shopify-pages/login/shopify-login.po');
const ShopifyCommonPage = require('../../shopify-pages/common-page/common-page.po');
const { By } = require('selenium-webdriver');

class ShopifyLoginPageHelper extends BasePage {
	async navigateToShopify(newDriver = true, closeAlert = true) {
		const url = 'https://cyshop11.myshopify.com/admin';
		await this.navigateTo(url, newDriver);
		await this.clearCookies();
		await this.navigateTo(url, newDriver);
		if (closeAlert) {
			await this.closeAlert();
		}
	}

	async insertEmailAddress(email) {
		await waitHelper.waitForElementVisible(ShopifyLoginPage.elements.email.selector);
		await ShopifyLoginPage.elements.email.element.sendKeys(email);
	}

	async clickOnNextButton() {
		await waitHelper.waitElementEnabled(ShopifyLoginPage.elements.nextButton.element);
		await ShopifyLoginPage.elements.nextButton.element.click();
	}

	async insertPassword(password) {
		await waitHelper.waitElementDisplayed(ShopifyLoginPage.elements.password.selector);
		try {
			await waitHelper.waitForElementVisible(ShopifyLoginPage.elements.password.selector, undefined, 120000);
			await ShopifyLoginPage.elements.password.element.sendKeys(password);
		} catch (e) {
			await waitHelper.waitForElementVisible(ShopifyLoginPage.elements.password.selector, undefined, 120000);
			await ShopifyLoginPage.elements.password.element.sendKeys(password);
		}
	}

	async loginToShopify(email, pass) {
		loggerHelper.subStep('Insert username');
		await this.insertEmailAddress(email);
		loggerHelper.subStep('Click on Next button');
		await this.clickOnNextButton();
		loggerHelper.subStep('Inser password');
		await this.insertPassword(pass);
		await this.acceptCaptcha();
		loggerHelper.subStep('Click on Next button');
		await this.clickOnNextButton();
		await waitHelper.waitForElementPresent(ShopifyCommonPage.letfMenu.orders.selector, 'xpath');
	}

	async acceptCaptcha() {
		try {
			await waitHelper.wait(5000);
			driver
				.switchTo()
				.frame(
					driver.findElement(
						By(
							"//iframe[starts-with(@name, 'a-') and starts-with(@src, 'https://www.google.com/recaptcha')]"
						)
					)
				);
			await waitHelper.wait(5000);
			By.cssSelector('div.recaptcha-checkbox-checkmark').click();
		} catch (e) {}
	}
}

module.exports = new ShopifyLoginPageHelper();
