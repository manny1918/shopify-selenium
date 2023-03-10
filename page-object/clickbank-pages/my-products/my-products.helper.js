const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');
const logger = require('../../../components/logger-helper');
const waitHelper = require('../../../components/wait-helper');
const clickbankCommonPageHelper = require('../clickbank-common-page/clickbank-common-page.helper');
const MyProducts = require('./my-products.po');

class ClickbankMyProducts extends BasePage {
	async navigateToMyProducts() {
		logger.subStep('Click on My Settings menu');
		await clickbankCommonPageHelper.clickOnSettingsMenu();
		logger.subStep('Click on My Products option');
		await clickbankCommonPageHelper.clickOnMyProductsOption();
		await waitHelper.waitForElementPresent(MyProducts.buttons.addProduct.selector, 'xpath');
	}

	async insertTextInSearchbox(text) {
		await waitHelper.waitElementDisplayed(MyProducts.otherElements.searchbox.selector);
		await MyProducts.otherElements.searchbox.element.sendKeys(text);
	}

	async searchProduct(text) {
		await this.insertTextInSearchbox(text);
		await waitHelper.waitForElementPresent(MyProducts.otherElements.itemNumberCell(text).selector, 'xpath');
		await elementHelper.moveToElement(MyProducts.otherElements.itemNumberCell(text).element);
	}

	async clickOnMoreIcon(itemNumber) {
		await waitHelper.waitElementDisplayed(
			await MyProducts.otherElements.moreIcon(itemNumber).selector,
			undefined,
			'xpath'
		);
		await MyProducts.otherElements.moreIcon(itemNumber).element.click();
	}

	async clickOnEditOption() {
		await elementHelper.moveToElement(MyProducts.icons.edit.element);
		await MyProducts.icons.edit.element.click();
	}

	async clickOnShopifyIcon() {
		await elementHelper.moveToElement(MyProducts.icons.shopify.element);
		await MyProducts.icons.shopify.element.click();
	}

	async openProduct(itemNumber) {
		logger.subStep('Navigate to My Products');
		await this.navigateToMyProducts();
		logger.subStep(`Search product "${itemNumber}"`);
		await this.searchProduct(itemNumber);
		logger.subStep(`Click on More icon corresponding to "${itemNumber}"`);
		await this.clickOnMoreIcon(itemNumber);
		logger.subStep('Click on Edit option');
		await this.clickOnEditOption();
	}

	async openShopifyConnection(itemNumber) {
		logger.subStep('Navigate to My Products');
		await this.navigateToMyProducts();
		logger.subStep(`Search product "${itemNumber}"`);
		await this.searchProduct(itemNumber);
		logger.subStep(`Click on More icon corresponding to "${itemNumber}"`);
		await this.clickOnMoreIcon(itemNumber);
		logger.subStep('Click on Edit option');
		await this.clickOnShopifyIcon();
	}
}

module.exports = new ClickbankMyProducts();
