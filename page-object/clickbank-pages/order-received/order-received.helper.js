const webdriver = require('selenium-webdriver');
const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');
const expectationHerlper = require('../../../components/expectation.herlper');
const waitHelper = require('../../../components/wait-helper');
const WaitHelper = require('../../../components/wait-helper');
const OrderReceivedPage = require('./order-received.po');

class OrderReceivedPageHelper extends BasePage {
	async getOrderNumber() {
		await WaitHelper.waitForElementPresent(OrderReceivedPage.elements.orderNumber.selector);
		const element = await elementHelper.getWebElement(OrderReceivedPage.elements.orderNumber);
		const oNumber = await element.getText();
		return oNumber.slice(-9).trim();
	}

	async verifyReceiptPageDisplayed() {
		await waitHelper.waitForElementPresent(OrderReceivedPage.elements.orderNumber.selector);
		await expectationHerlper.verifyElementDisplayed(OrderReceivedPage.elements.orderNumber.selector);
	}
}

module.exports = new OrderReceivedPageHelper();
