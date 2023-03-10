const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class TransactionManagementPage extends BasePage {
	get textboxes() {
		return {
			receipt: elementHelper.webElement('#receipt'),
		};
	}

	get buttons() {
		return {
			search: elementHelper.webElement('#find'),
			createticket: elementHelper.webElement('input.create_ticket'),
			save: elementHelper.webElement('#submit'),
		};
	}

	get links() {
		return {
			receiptNumber(receipt) {
				return elementHelper.webElement(`//a[contains(., "${receipt}")]`, 'xpath');
			},
		};
	}

	get radioButtons() {
		return {
			refund: elementHelper.webElement('label[for="ticket_type_r"]'),
		};
	}

	get dropdown() {
		return {
			reason: elementHelper.webElement('select#ticket_reason'),
		};
	}

	get otherElements() {
		return {
			ticketReason(reason) {
				return elementHelper.webElement(`//select[@id="ticket_reason"]/option[.="${reason}"]`, 'xpath');
			},
		};
	}
}
module.exports = new TransactionManagementPage();
