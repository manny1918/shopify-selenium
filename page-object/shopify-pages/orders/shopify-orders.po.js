const BasePage = require('../../../components/base-page-helper');
const { webdriver, By } = require('selenium-webdriver');
const elementHelper = require('../../../components/element.helper');

class ShopifyOrders extends BasePage {
	get elements() {
		return {
			get ordersFilter() {
				return elementHelper.webElement('[class*="Search"]');
			},
			orderNumberCell(order) {
				return elementHelper.webElement(`//span[.="${order}"]`, 'xpath');
			},
			get orderFistCell() {
				return elementHelper.webElement('(//a[contains(@href, "admin/orders")])[8]/span', 'xpath');
			},
			productNameLink(name) {
				return elementHelper.webElement(`//a[.="${name}"]`, 'xpath');
			},
			clickbankSku(sku) {
				return elementHelper.webElement(
					`//*[text()="clickbank_sku:"]//ancestor::div[contains(@class, "Polaris-Stack--")]//p[.="${sku}"]`,
					'xpath'
				);
			},
			itemPrice(item, price) {
				return elementHelper.webElement(
					`//a[.="${item}"]//ancestor::div[contains(@class, "Polaris-Card__Sub")]//div[.="${price}"]`,
					'xpath'
				);
			},
			itemQuantity(item, price, quantity) {
				return elementHelper.webElement(
					`//a[.="${item}"]//ancestor::div[contains(@class, "Polaris-Card__Sub")]//div[.="${price} × ${quantity}"]`,
					xpath
				);
			},
			get shippingLabel() {
				return elementHelper.webElement(
					'//div[contains(@class, "Polaris-Card__Subsection")]//span[text()="Shipping"]',
					'xpath'
				);
			},
			shippingNoRequiredLabel(item) {
				return elementHelper.webElement(
					`//a[.="${item}"]//ancestor::div[contains(@class, "Polaris-Card__Section")]//div[.="Shipping not required."]`,
					'xpath'
				);
			},
			get moreActionsDropdown() {
				return elementHelper.webElement('//span[text()="More actions"]', 'xpath');
			},
			get archiveButton() {
				return elementHelper.webElement('#archive-unarchive');
			},
			get deleteOrderButton() {
				return elementHelper.webElement('div[class*="PageActions"] button');
			},
			get confirmDeleteOrderButton() {
				return elementHelper.webElement(
					'//div[@role="dialog"]//button[.="Delete order"]',
					'xpath'
				);
			},
			get clickbankTag() {
				return elementHelper.webElement('span[title="ClickBank"]');
			},
			get fulfillButton() {
				return elementHelper.webElement('//span[contains(text(), "Fulfill item")]', 'xpath');
			},
			get trackingNumberField() {
				return elementHelper.webElement(
					'//label[.="Tracking number"]//ancestor::div[contains(@class, "FormLayout__Item_")]//input',
					'xpath'
				);
			},
			get shippingCarrier() {
				return elementHelper.webElement(
					'//label[.="Shipping carrier"]//ancestor::div[contains(@class, "FormLayout__Item_")]//input',
					'xpath'
				);
			},
			get trackingUrl() {
				return elementHelper.webElement('input[placeholder*="tracking"]');
			},
			contactInformationPhoneNumber(phone) {
				return elementHelper.webElement(
					`//h3[.="Contact information"]//ancestor::div[contains(@class, "Polaris-Card__Section")]//p[contains(., "${phone}")]`,
					'xpath'
				);
			},
			shippingAddresPhoneNumber(phone) {
				return elementHelper.webElement(
					`//h3[.="Shipping address"]//ancestor::div[contains(@class, "Polaris-Card__Section")]//p[contains(., "${phone}")]`,
					'xpath'
				);
			},
			searchInput: elementHelper.webElement('[placeholder="Search"]'),
		};
	}
}
module.exports = new ShopifyOrders();
