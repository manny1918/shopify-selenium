const BasePage = require('../../components/base-page-helper');
const elementHelper = require('../../components/element.helper');

class MailhogPage extends BasePage {
	get elements() {
		return {
			get searchbox() {
				return elementHelper.webElement('#search');
			},
			get customerReceipt() {
				return elementHelper.webElement('//span[contains(., "CLKBANK Receipt")]', 'xpath');
			},
			get clientReceipt() {
				return elementHelper.webElement('//span[contains(., "Sale:")]', 'xpath');
			},
			get backToInboxButton() {
				return elementHelper.webElement('button[title="Back to Inbox"]');
			},
			productTitle(title) {
				return elementHelper.webElement(`//*[.="${title}"]`);
			},
			get firstShippingNotification() {
				return elementHelper.webElement('(//span[.="ClickBank Shipping Notification"])[1]', 'xpath');
			},
			get secondShippingNotification() {
				return elementHelper.webElement('(//span[.="ClickBank Shipping Notification"])[2]', 'xpath');
			},
		};
	}
}

module.exports = new MailhogPage();
