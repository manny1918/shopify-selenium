const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class MyProductsPage extends BasePage {
	get icons() {
		return {
			edit: elementHelper.webElement('[name="edit"] svg'),
			shopify: elementHelper.webElement('[data-testid="StoreIcon"]'),
		};
	}

	get otherElements() {
		return {
			searchbox: elementHelper.webElement('#searchInput'),
			itemNumberCell(itemNumber) {
				return elementHelper.webElement(`//mark[.="${itemNumber}"]`, 'xpath');
			},
			moreIcon(itemNumber) {
				return elementHelper.webElement(
					`//span[.="${itemNumber}"]//ancestor::tr//button[@aria-label="More..."]`,
					'xpath'
				);
			},
		};
	}

	get buttons() {
		return {
			get addProduct() {
				return elementHelper.webElement('//button[.="Add Product"]', 'xpath');
			},
		};
	}
}
module.exports = new MyProductsPage();
