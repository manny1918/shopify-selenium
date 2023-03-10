const BasePage = require('../../../components/base-page-helper');
const logger = require('../../../components/logger-helper');
const waitHelper = require('../../../components/wait-helper');
const transactionManagementPage = require('./transaction-management-page.po');
const ShopifyLoginPageHelper = require('../../shopify-pages/login/shopify-login.helper');
const ClickbankLoginPageHelper = require('../../clickbank-pages/login/login.helper');
const wamCommonPageHelper = require('../wam-common-page/wam-common-page.helper');
const transactionDetailsPageHelper = require('../transaction-details/transaction-details-page.helper');
const pageHelper = require('../../../components/page.helper');

class TransactionManagementPageHelper extends BasePage {
	async insertReceiptNumber(receipt) {
		await waitHelper.waitForElementPresent(transactionManagementPage.textboxes.receipt.selector);
		await transactionManagementPage.textboxes.receipt.element.sendKeys(receipt);
	}

	async clickOnSearchButton() {
		await transactionManagementPage.buttons.search.element.click();
	}

	async clickOnReceiptNumberLink(receipt) {
		await transactionManagementPage.links.receiptNumber(receipt).element.click();
	}

	async navigateToTransactionManagementPage(orderNumber) {
		logger.subStep('Navigate to Clickbank');
		await ShopifyLoginPageHelper.navigateToClickbank(false);
		logger.subStep('Login with an owner account');
		await ClickbankLoginPageHelper.loginWithAnOwnerAccount();
		logger.subStep('Click on Transactions option from the left menu');
		await wamCommonPageHelper.clickOnTransactionsOption();
		logger.subStep(`Insert the Receipt number: ${orderNumber}`);
		await this.insertReceiptNumber(orderNumber);
		logger.subStep('Click on Search button');
		await this.clickOnSearchButton();
		logger.subStep(`Open the "${orderNumber}" link`);
		await this.clickOnReceiptNumberLink(orderNumber);
	}

	async getNextBillingDate(orderNumber, closePopUp = false) {
		await this.navigateToTransactionManagementPage(orderNumber);
		await this.switchToWindow();
		const billingDate = await transactionDetailsPageHelper.getNextRebillDate();
		logger.subStep(`Get the next billing date: "${billingDate}"`);
		if (closePopUp) {
			await pageHelper.closeCurrentWindow();
		}
		return billingDate;
	}

	async clickOnCreateTicketButton(switchToPopUp = false) {
		if (switchToPopUp) {
			await this.switchToWindow();
		}
		await waitHelper.waitForElementPresent(transactionManagementPage.buttons.createticket.selector);
		await transactionManagementPage.buttons.createticket.element.click();
	}

	async selectRefundRadioButton() {
		await waitHelper.waitForElementPresent(transactionManagementPage.radioButtons.refund.selector);
		await transactionManagementPage.radioButtons.refund.element.click();
	}

	async selectTicketReason(reason) {
		await waitHelper.waitForElementPresent(transactionManagementPage.dropdown.reason.selector);
		await transactionManagementPage.dropdown.reason.element.click();
		await transactionManagementPage.otherElements.ticketReason(reason).element.click();
	}

	async clickOnSaveButton() {
		await transactionManagementPage.buttons.save.element.click();
	}
}
module.exports = new TransactionManagementPageHelper();
