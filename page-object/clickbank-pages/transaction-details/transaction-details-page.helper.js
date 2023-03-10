const BasePage = require('../../../components/base-page-helper');
const waitHelper = require('../../../components/wait-helper');
const transactionDetailsPage = require('./transaction-details-page.po');

class TransactionDetailsPageHelper extends BasePage {
	async getNextRebillDate() {
		await waitHelper.waitForElementPresent(transactionDetailsPage.elements.nextRebillDate.selector);
		const date = await transactionDetailsPage.elements.nextRebillDate.element.getText();
		var cleanDate = new Date(date);
		return new Date(cleanDate.getTime() - 24 * 60 * 60 * 1000).toLocaleDateString('en-US');
	}
}
module.exports = new TransactionDetailsPageHelper();
