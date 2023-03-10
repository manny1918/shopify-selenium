const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class ProductEditorPage extends BasePage {
	get textboxes() {
		return {
			title: elementHelper.webElement('[name="title"]'),
			price: elementHelper.webElement('[name="price"]'),
		};
	}

	get headers() {
		return {
			productEditorTitle: elementHelper.webElement('#root-product-editor h1'),
		};
	}
}
module.exports = new ProductEditorPage();
