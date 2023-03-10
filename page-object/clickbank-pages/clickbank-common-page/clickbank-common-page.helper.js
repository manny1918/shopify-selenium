const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');
const expectationHerlper = require('../../../components/expectation.herlper');
const waitHelper = require('../../../components/wait-helper');
const ClickbankCommonPage = require('../clickbank-common-page/clickbank-common-page.po');

class ClickbankCommonPageHelper extends BasePage {
	async waitForThePageToBeDisplayed() {
		await waitHelper.waitElementDisplayed(ClickbankCommonPage.otherElements.pageLogo.selector);
	}

	async clickOnSettingsMenu() {
		await waitHelper.waitForElementPresent(ClickbankCommonPage.topGrayMenu.vendorSettings.selector);
		const element = await elementHelper.getWebElement(ClickbankCommonPage.topGrayMenu.vendorSettings);
		await element.click();
	}

	async clickOnMyProductsOption() {
		await ClickbankCommonPage.vendorSettingsMenu.myProducts.element.click();
	}

	async clickOnShippingOption(){
		await ClickbankCommonPage.reportingMenu.shipping.element.click();
	}

	async clickOnAdminToolsOption() {
		await waitHelper.waitForElementPresent(ClickbankCommonPage.administratorMenu.adminTools.selector);
		await ClickbankCommonPage.administratorMenu.adminTools.element.click();
	}

	async logout() {
		await ClickbankCommonPage.topBlueMenu.logout.element.click();
		await this.clearCookies();
	}

	async verifyPageDisplayed() {
		await waitHelper.waitForElementPresent(ClickbankCommonPage.topBlueMenu.logout.selector);
		await expectationHerlper.verifyElementDisplayed(ClickbankCommonPage.topBlueMenu.logout.selector);
	}

	async clickOnReporingMenu() {
		await waitHelper.waitForElementPresent(ClickbankCommonPage.topGrayMenu.reporting.selector);
		const element = await elementHelper.getWebElement(ClickbankCommonPage.topGrayMenu.reporting);
		await element.click();
	}
}
module.exports = new ClickbankCommonPageHelper();
