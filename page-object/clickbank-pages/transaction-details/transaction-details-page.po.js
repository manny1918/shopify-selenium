const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class TransactionDetailsPage extends BasePage {
	get elements() {
		return {
			nextRebillDate: elementHelper.webElement('[id*="id_nextBillDate"]'),
		};
	}
}
module.exports = new TransactionDetailsPage();
