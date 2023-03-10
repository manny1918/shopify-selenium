const BasePage = require('../../../components/base-page-helper');
const expectationHerlper = require('../../../components/expectation.herlper');
const waitHelper = require('../../../components/wait-helper');
const productEditor = require('./product-editor.po');

class ProductEditorPageHelper extends BasePage {
	async getTitle() {
		await waitHelper.waitElementDisplayed(productEditor.textboxes.title.selector);
		return await productEditor.textboxes.title.element.getAttribute('value');
	}

	async waitForThePageToBeDisplayed() {
		await waitHelper.waitElementDisplayed(productEditor.headers.productEditorTitle);
	}

	async getPrice() {
		await waitHelper.waitElementDisplayed(productEditor.textboxes.price.selector);
		return await productEditor.textboxes.price.element.getAttribute('value');
	}

	async verifyPageDisplayed() {
		await waitHelper.waitForElementPresent(productEditor.headers.productEditorTitle.selector);
		await expectationHerlper.verifyElementDisplayed(productEditor.headers.productEditorTitle.selector);
	}
}
module.exports = new ProductEditorPageHelper();
