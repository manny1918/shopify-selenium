const BasePage = require('../../components/base-page-helper');
const waitHelper = require('../../components/wait-helper');
const shopifyProductConnection = require('./shopify-product-connection.po');

class ShopifyProductConnectionPageHelper extends BasePage {
	async getShopifyProduct() {
		await waitHelper.waitElementDisplayed(
			shopifyProductConnection.textboxes.shopifyProduct.selector,
			undefined,
			'xpath'
		);
		return await shopifyProductConnection.textboxes.shopifyProduct.element.getAttribute('value');
	}

	async getShopifyRecurringProduct() {
		await waitHelper.waitElementDisplayed(
			shopifyProductConnection.textboxes.shopifyRecurringProduct.selector,
			undefined,
			'xpath'
		);
		return await shopifyProductConnection.textboxes.shopifyRecurringProduct.element.getAttribute('value');
	}
}
module.exports = new ShopifyProductConnectionPageHelper();
