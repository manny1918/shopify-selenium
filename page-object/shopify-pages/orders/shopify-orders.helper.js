const BasePage = require('../../../components/base-page-helper');
const expectationHerlper = require('../../../components/expectation.herlper');
const loggerHelper = require('../../../components/logger-helper');
const logger = require('../../../components/logger-helper');
const waitHelper = require('../../../components/wait-helper');
const ShopifyOrdersPage = require('../../shopify-pages/orders/shopify-orders.po');

class ShopifyOrdersPageHelper extends BasePage {
	async searchOrder(order) {
		await ShopifyOrdersPage.elements.ordersFilter.element.click();
		await ShopifyOrdersPage.elements.searchInput.element.sendKeys(order);
	}

	async clickOnOrderNumberCell(order) {
		await waitHelper.wait(2000);
		await waitHelper.waitForElementPresent(
			await ShopifyOrdersPage.elements.orderNumberCell(order).selector,
			'xpath'
		);
		await ShopifyOrdersPage.elements.orderNumberCell(order).element.click();
	}

	async verifyProductNameLink(name) {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.productNameLink(name).selector, 'xpath');
		await expectationHerlper.verifyElementDisplayed(
			ShopifyOrdersPage.elements.productNameLink(name).selector,
			'xpath'
		);
	}

	async clickOnFirstOrderCell() {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.orderFistCell.selector);
		await ShopifyOrdersPage.elements.orderFistCell.element.click();
	}

	async verifySku(sku) {
		await waitHelper.waitElementDisplayed(
			ShopifyOrdersPage.elements.clickbankSku(sku).selector,
			undefined,
			'xpath'
		);
		await expectationHerlper.verifyElementDisplayed(ShopifyOrdersPage.elements.clickbankSku(sku).selector, 'xpath');
	}

	async verifyItemPrice(name, price) {
		await expectationHerlper.verifyElementDisplayed(
			ShopifyOrdersPage.elements.clickbankSku(name, price).selector,
			'xpath'
		);
	}

	async verifyItemQuantity(name, price, quantity) {
		await expectationHerlper.verifyElementDisplayed(
			ShopifyOrdersPage.elements.itemQuantity(name, price, quantity).selector,
			'xpath'
		);
	}

	async verifyShippingLabelDisplayed() {
		await expectationHerlper.verifyElementDisplayed(ShopifyOrdersPage.elements.shippingLabel.selector, 'xpath');
	}

	async verifyShippingNotRequiredLabelDisplayed(item) {
		await expectationHerlper.verifyElementDisplayed(
			ShopifyOrdersPage.elements.shippingNoRequiredLabel(item).selector,
			'xpath'
		);
	}

	async archiveOrder() {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.moreActionsDropdown.selector);
		await ShopifyOrdersPage.elements.moreActionsDropdown.element.click();
		await ShopifyOrdersPage.elements.archiveButton.element.click();
	}

	async verifyClickbankTag() {
		await expectationHerlper.verifyElementDisplayed(ShopifyOrdersPage.elements.clickbankTag.selector);
	}

	async deleteOrder(archive = true) {
		if (archive) {
			loggerHelper.subStep('Archive order');
			await this.archiveOrder();
		}
		loggerHelper.subStep('Click on Delete Order button');
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.deleteOrderButton.selector);
		await ShopifyOrdersPage.elements.deleteOrderButton.element.click();
		loggerHelper.subStep('Click on Confirm Delete button');
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.confirmDeleteOrderButton.selector, 'xpath');
		await ShopifyOrdersPage.elements.confirmDeleteOrderButton.element.click();
	}

	async clickOnFulfillButton() {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.fulfillButton.selector);
		await ShopifyOrdersPage.elements.fulfillButton.element.click();
	}

	async insertTrackingUrl(url = 'https://www.google.com/') {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.trackingUrl.selector);
		await ShopifyOrdersPage.elements.trackingUrl.element.sendKeys(url);
	}

	async insertTranckingNumber(number) {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.trackingNumberField.selector);
		await ShopifyOrdersPage.elements.trackingNumberField.element.sendKeys(number);
	}

	async insertShippingCarrier(carrier) {
		await waitHelper.waitForElementPresent(ShopifyOrdersPage.elements.shippingCarrier.selector);
		await ShopifyOrdersPage.elements.shippingCarrier.element.sendKeys(carrier);
	}

	async triggerShippingNotice(trackingNumber, shippingCarrier, trackingUrl) {
		logger.subStep('Click on Fulfill button');
		await this.clickOnFulfillButton();
		logger.subStep(`Insert "${trackingNumber}" as tracking number`);
		await this.insertTranckingNumber(trackingNumber);
		logger.subStep(`Insert "${shippingCarrier}" as shipping carrier`);
		await this.insertShippingCarrier(shippingCarrier);
		logger.subStep(`Insert "${trackingUrl}" as tracking URL`);
		await this.insertTrackingUrl(trackingUrl);
		logger.subStep('Click on Fulfill button');
		await this.clickOnFulfillButton();
	}

	async formatUsPhone(phone) {
		var phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
		phone = phone.trim();
		var results = phoneTest.exec(phone);
		if (results !== null && results.length > 8) {
			console.log(
				'+1 ' +
					results[3] +
					'-' +
					results[4] +
					'-' +
					results[5] +
					(typeof results[8] !== 'undefined' ? ' x' + results[8] : '')
			);
			return (
				'+1 ' +
				results[3] +
				'-' +
				results[4] +
				'-' +
				results[5] +
				(typeof results[8] !== 'undefined' ? ' x' + results[8] : '')
			);
		} else {
			console.log(ph);
			return phone;
		}
	}

	async verifyContactInformationPhoneNumber(phoneNumber, formatPhoneNumber = false) {
		if (formatPhoneNumber) {
			const phone = await this.formatUsPhone(phoneNumber);
			await waitHelper.waitForElementPresent(
				ShopifyOrdersPage.elements.contactInformationPhoneNumber(phone).selector
			);
			await expectationHerlper.verifyElementDisplayed(
				ShopifyOrdersPage.elements.contactInformationPhoneNumber(phone).selector
			);
		} else {
			await waitHelper.waitForElementPresent(
				ShopifyOrdersPage.elements.contactInformationPhoneNumber(phoneNumber).selector
			);
			await expectationHerlper.verifyElementDisplayed(
				ShopifyOrdersPage.elements.contactInformationPhoneNumber(phoneNumber).selector
			);
		}
	}

	async verifyShippingAddressPhoneNumber(phoneNumber) {
		await waitHelper.waitForElementPresent(
			ShopifyOrdersPage.elements.shippingAddresPhoneNumber(phoneNumber).selector
		);
		await expectationHerlper.verifyElementDisplayed(
			ShopifyOrdersPage.elements.shippingAddresPhoneNumber(phoneNumber).selector
		);
	}
}

module.exports = new ShopifyOrdersPageHelper();
