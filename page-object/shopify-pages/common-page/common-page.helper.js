const BasePage = require('../../../components/base-page-helper.js');
const ShopifyCommonPage = require('../../shopify-pages/common-page/common-page.po');
const waitHelper = require('../../../components/wait-helper.js');

class ShopifyCommonPageHelper extends BasePage {
	async clickOnOrdersOption() {
		await waitHelper.wait(10000)
		await waitHelper.waitForElementPresent(ShopifyCommonPage.otherElements.shopifyIcon.selector);
		await waitHelper.waitElementEnabled(ShopifyCommonPage.otherElements.shopifyIcon.element);
		await ShopifyCommonPage.letfMenu.orders.element.click();
	}
}

module.exports = new ShopifyCommonPageHelper();
