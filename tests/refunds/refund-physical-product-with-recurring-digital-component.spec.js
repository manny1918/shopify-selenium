const logger = require('../../components/logger-helper');
const pageHelper = require('../../components/page.helper.js');
const OrderFormPageHelper = require('../../page-object/clickbank-pages/order-form/order-form.helper.js');
const orderReceivedHelper = require('../../page-object/clickbank-pages/order-received/order-received.helper');
const commonContants = require('../../page-object/common/common.contants');
const transactionManagementPageHelper = require('../../page-object/clickbank-pages/transaction-management/transaction-management-page.helper');
const quartzScheduleManagementPageHelper = require('../../page-object/clickbank-pages/quartz-schedule-management/quartz-schedule-management-page.helper');
const { testSuites } = require('../../page-object/common/common.contants');
const productSku = 'physical-rec-digital-c-1';

const orderUrl = `http://cyshopify.pay.clickbank-tst.net/?cbitems=${productSku}`;
const ticketReason = 'I never received my product.';

after(async () => {
	await logger.takePhoto();
	await pageHelper.closeBrowser();
});

describe(testSuites.refunds, async () => {
	it(`${testSuites.refunds} | Physical product with recurring digital component rebill`, async () => {
		logger.stepNumber(1);
		logger.step('Place an order');
		await OrderFormPageHelper.placeRecurringPhysicalProductOrder(orderUrl);
		logger.subStep('Get order number');
		const initialOrderNumber = await orderReceivedHelper.getOrderNumber();

		logger.stepNumber(2);
		logger.step('Sync the orders');
		await OrderFormPageHelper.syncOrdersWithGraphQl();
		logger.subStep('Get the rebill order number');

		logger.stepNumber(3);
		logger.step('Navigate to Transaction Management page');
		await transactionManagementPageHelper.navigateToTransactionManagementPage(initialOrderNumber);

		logger.stepNumber(4);
		logger.step('Click on Create Ticket button');
		await transactionManagementPageHelper.clickOnCreateTicketButton(true);

		logger.stepNumber(5);
		logger.step('Select refund radio button');
		await transactionManagementPageHelper.switchToWindow(2);
		await transactionManagementPageHelper.selectRefundRadioButton(true);

		logger.stepNumber(6);
		logger.step('Select ticket reason');
		await transactionManagementPageHelper.selectTicketReason(ticketReason);

		logger.stepNumber(7);
		logger.step('Click on Save button');
		await transactionManagementPageHelper.clickOnSaveButton();
		await pageHelper.closeBrowser();

		logger.stepNumber(4);
		logger.step('Trigger Ticket Expiration job');
		const todaysDate = new Date().toLocaleDateString('en-US');
		await quartzScheduleManagementPageHelper.triggerTicketExpirationJob(todaysDate);
	});
});
