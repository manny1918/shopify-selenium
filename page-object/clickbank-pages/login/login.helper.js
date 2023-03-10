const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');
const expectationHerlper = require('../../../components/expectation.herlper');
const logger = require('../../../components/logger-helper');
const waitHelper = require('../../../components/wait-helper');
const ClickbankLoginPage = require('../../clickbank-pages/login/login.po');
const wamCommonPagePo = require('../wam-common-page/wam-common-page.po');

class ClickbankLoginPageHelper extends BasePage {
	async insertUsername(username) {
		await waitHelper.waitForElementPresent(ClickbankLoginPage.textboxes.username.selector);
		const element = await elementHelper.getWebElement(ClickbankLoginPage.textboxes.username);
		await element.sendKeys(username);
	}

	async insertPassword(password) {
		const element = await elementHelper.getWebElement(ClickbankLoginPage.textboxes.password);
		await element.sendKeys(password);
	}

	async clickOnLoginButton() {
		const element = await elementHelper.getWebElement(ClickbankLoginPage.buttons.login);
		await element.click();
	}

	async login(username, password) {
		logger.subStep('Insert username');
		await this.insertUsername(username);
		logger.subStep('Insert passwrd');
		await this.insertPassword(password);
		logger.subStep('Click on Login button');
		await this.clickOnLoginButton();
	}

	async loginWithAnOwnerAccount() {
		await this.login('yomara.mora@clickbank.com', 'PAssword11!!');
		await waitHelper.waitForElementPresent(wamCommonPagePo.leftMenu.transactions.selector);
		await expectationHerlper.verifyElementDisplayed(wamCommonPagePo.leftMenu.transactions.selector);
	}

	async loginWithVendorAccount() {
		await this.login('cyshopify', 'PAssword11!!');
	}
}
module.exports = new ClickbankLoginPageHelper();
