const BasePage = require('../../components/base-page-helper');
const elementHelper = require('../../components/element.helper');

class ShopifyProductConnectionPage extends BasePage {
	get textboxes() {
		return {
			get shopifyProduct() {
				return elementHelper.webElement('(//label[.="Shopify Product"]//parent::div//input)[1]', 'xpath');
			},
			get shopifyRecurringProduct() {
				return elementHelper.webElement('(//label[.="Shopify Product"]//parent::div//input)[2]', 'xpath');
			},
		};
	}
}
module.exports = new ShopifyProductConnectionPage();
