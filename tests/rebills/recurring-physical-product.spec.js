const logger = require('../../components/logger-helper');
const pageHelper = require('../../components/page.helper.js');
const OrderFormPageHelper = require('../../page-object/clickbank-pages/order-form/order-form.helper.js');
const orderReceivedHelper = require('../../page-object/clickbank-pages/order-received/order-received.helper');
const commonContants = require('../../page-object/common/common.contants');
const ShopifyCommonPageHelper = require('../../page-object/shopify-pages/common-page/common-page.helper');
const ShopifyLoginPageHelper = require('../../page-object/shopify-pages/login/shopify-login.helper');
const ShopifyOrdersHelper = require('../../page-object/shopify-pages/orders/shopify-orders.helper');
const ClickbankLoginPageHelper = require('../../page-object/clickbank-pages/login/login.helper');
const MyProductsHelper = require('../../page-object/clickbank-pages/my-products/my-products.helper');
const ProductEditorPageHelper = require('../../page-object/clickbank-pages/product-editor/product-editor.helper');
const shopifyProductConnectionHelper = require('../../page-object/shopify-product-connection/shopify-product-connection.helper');
const transactionManagementPageHelper = require('../../page-object/clickbank-pages/transaction-management/transaction-management-page.helper');
const quartzScheduleManagementPageHelper = require('../../page-object/clickbank-pages/quartz-schedule-management/quartz-schedule-management-page.helper');
const productSku = 'recurring-physical-';

const orderUrl = `http://cyshopify.pay.clickbank-tst.net/?cbitems=${productSku}`;
const { credentials, testSuites } = commonContants;

after(async () => {
	await logger.takePhoto();
	await pageHelper.closeBrowser();
});

describe(testSuites.rebills, async () => {
	it(`${testSuites.rebills} | Recurring physical product rebill`, async () => {
		logger.stepNumber(1);
		logger.step('Place an order');
		await OrderFormPageHelper.placeRecurringPhysicalProductOrder(orderUrl);
		logger.subStep('Get order number');
		const initialOrderNumber = await orderReceivedHelper.getOrderNumber();

		logger.stepNumber(2);
		logger.step('Sync the orders');
		await OrderFormPageHelper.syncOrdersWithGraphQl();
		logger.subStep('Get the rebill order number');
		const orderNumber = `${initialOrderNumber}-B002`;

		logger.stepNumber(3);
		logger.step('Navigate to the order receipt and get the next billing date');
		const billingDate = await transactionManagementPageHelper.getNextBillingDate(initialOrderNumber, true);
		await pageHelper.closeBrowser();

		logger.stepNumber(4);
		logger.step(`Trigger the  rebill for "${initialOrderNumber}" order`);
		await quartzScheduleManagementPageHelper.triggerRebill(billingDate);

		logger.stepNumber(5);
		logger.step('Sync orders');
		await OrderFormPageHelper.syncOrdersWithGraphQl();

		logger.stepNumber(6);
		logger.step('Navigate to Clickbank and login');
		await ShopifyLoginPageHelper.navigateToClickbank(false);
		await ClickbankLoginPageHelper.login('cyshopify', 'PAssword11!!');

		logger.stepNumber(7);
		logger.step(`Navigate to My Products and open "${productSku}"`);
		await MyProductsHelper.openProduct(productSku);
		const price = await ProductEditorPageHelper.getPrice();

		logger.stepNumber(8);
		logger.step(`Open Shopify Connection for "${productSku}"`);
		await MyProductsHelper.openShopifyConnection(productSku);
		const shopifyProductName = await shopifyProductConnectionHelper.getShopifyRecurringProduct();

		logger.stepNumber(9);
		logger.step('Navigate to Shopify');
		await ShopifyLoginPageHelper.navigateToShopify(false, true);

		logger.stepNumber(10);
		logger.step('Login to Shopify');
		await ShopifyLoginPageHelper.loginToShopify(credentials.email, credentials.password);

		logger.stepNumber(11);
		logger.step('Click on Orders option');
		await ShopifyCommonPageHelper.clickOnOrdersOption();

		logger.stepNumber(12);
		logger.step('Search the order');
		await ShopifyOrdersHelper.searchOrder(orderNumber);

		logger.stepNumber(13);
		logger.step(`Open order "${orderNumber}"`);
		await ShopifyOrdersHelper.clickOnOrderNumberCell(orderNumber);

		logger.stepNumber(14);
		logger.verification('Verify product information from Shopify');
		logger.subVerification('Verify product name');
		await ShopifyOrdersHelper.verifyProductNameLink(shopifyProductName);
		logger.subVerification('Verify product item number');
		await ShopifyOrdersHelper.verifySku(productSku);
		logger.subVerification('Verify product price');
		await ShopifyOrdersHelper.verifyItemPrice(productSku, price);
		logger.subVerification('Verify Clickbank tag');
		await ShopifyOrdersHelper.verifyClickbankTag();
		logger.subVerification('Verify "Shipping" label is displayed');
		await ShopifyOrdersHelper.verifyShippingLabelDisplayed(shopifyProductName);

		logger.postCondition('Delete orders');
		logger.subStep('Delete the recurring prpduct order')
		await ShopifyOrdersHelper.deleteOrder();
		logger.subStep('Search the inital purchase order')
		await ShopifyOrdersHelper.searchOrder(initialOrderNumber);
		logger.subStep('Open the inital purchase order')
		await ShopifyOrdersHelper.clickOnOrderNumberCell(initialOrderNumber);
		logger.subStep('Delete the inital purchase order')
		await ShopifyOrdersHelper.deleteOrder();
	});
});
