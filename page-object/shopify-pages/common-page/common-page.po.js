const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class ShopifyCommonPage extends BasePage {
	get elements() {
		return {};
	}

	get letfMenu() {
		return {
			get orders() {
				return elementHelper.webElement('//span[.="Orders"]', 'xpath');
			},
		};
	}

	get locators() {
		return {
			orders: `//span[.="Orders"]`,
		};
	}

	get otherElements() {
		return {
			shopifyIcon: elementHelper.webElement('(//img[@alt="Shopify Editions"])[1]', 'xpath'),
			shopifySpinner: elementHelper.webElement('span[class*="Spinner"]'),
		};
	}
}

module.exports = new ShopifyCommonPage();
