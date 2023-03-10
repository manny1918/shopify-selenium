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
const mailhogPageHelper = require('../../page-object/mailhog/mailhog-page.helper');
const { testSuites } = require('../../page-object/common/common.contants');
const shippingReportHelper = require('../../page-object/clickbank-pages/shipping-report/shipping-report.helper');
const productSku = 'physical-rec-digital-c-1';

const orderUrl = `http://cyshopify.pay.clickbank-tst.net/?cbitems=${productSku}`;
const credentials = commonContants.credentials;

after(async () => {
	await logger.takePhoto();
	await pageHelper.closeBrowser();
});

describe(testSuites.shippingNotice, () => {
	it(`${testSuites.shippingNotice} | Recurring physical product`, async () => {
		logger.stepNumber(1);
		logger.step('Place order');
		await OrderFormPageHelper.placeRecurringPhysicalProductOrder(orderUrl);
		logger.subStep('Get the receipt number');
		const orderNumber = await orderReceivedHelper.getOrderNumber();

		logger.stepNumber(2);
		logger.step('Sync shopify orders');
		await OrderFormPageHelper.syncOrdersWithGraphQl(orderNumber);

		logger.stepNumber(3);
		logger.step('Get product information from Clickbank page');
		logger.subStep('Navigate to clickbank');
		await ShopifyLoginPageHelper.navigateToClickbank(false);
		logger.subStep('Login with a vendor account');
		await ClickbankLoginPageHelper.loginWithVendorAccount();
		logger.subStep(`Open "${productSku}}" product`);
		await MyProductsHelper.openProduct(productSku);
		logger.subStep('get product title');
		const title = await ProductEditorPageHelper.getTitle();

		logger.stepNumber(4);
		logger.step('Trigger shipping notice');
		logger.subStep('Navigate to Shopify');
		await ShopifyLoginPageHelper.navigateToShopify(false, true);
		logger.subStep('Login to Shopify');
		await ShopifyLoginPageHelper.loginToShopify(credentials.email, credentials.password);
		logger.subStep('Click on Orders option');
		await ShopifyCommonPageHelper.clickOnOrdersOption();
		// logger.subStep('Search the order');
		// await ShopifyOrdersHelper.searchOrder(orderNumber);
		logger.subStep(`Open order "${orderNumber}"`);
		await ShopifyOrdersHelper.clickOnOrderNumberCell(orderNumber);
		const trackingNumber = await ShopifyOrdersHelper.generateRandomString();
		const shippingCarrier = await ShopifyOrdersHelper.generateRandomString();
		const trackingUrl = `https://${await ShopifyOrdersHelper.generateRandomString()}.com`;
		await ShopifyOrdersHelper.triggerShippingNotice(trackingNumber, shippingCarrier, trackingUrl);

		logger.stepNumber(5);
		logger.step('Review shipping notice from Clickbank page');
		await ShopifyLoginPageHelper.navigateToClickbank(false);
		await ClickbankLoginPageHelper.loginWithVendorAccount();
		await shippingReportHelper.navigateToShippingReport();
		await shippingReportHelper.findAndOptionReceiptRecord(orderNumber);
		logger.subStep('Wait for shipping notice to be updated');
		await shippingReportHelper.waitForShippingNoticeToBeUpdated();
		logger.verification('Verify tracking number');
		await shippingReportHelper.verifyTrackingNumber(trackingNumber);

		logger.stepNumber(6);
		logger.step('Verify Shipping Notification for customer');
		await mailhogPageHelper.navigateToMailhog();
		await mailhogPageHelper.searchText(orderNumber);
		await mailhogPageHelper.openFirstShippingNotification();
		await mailhogPageHelper.verifyProductTitle(title);

		logger.postCondition('Delete order');
		await ShopifyLoginPageHelper.navigateToShopify(false, true);
		await ShopifyLoginPageHelper.loginToShopify(credentials.email, credentials.password);
		await ShopifyCommonPageHelper.clickOnOrdersOption();
		// await ShopifyOrdersHelper.searchOrder(orderNumber);
		await ShopifyOrdersHelper.clickOnOrderNumberCell(orderNumber);
		await ShopifyOrdersHelper.deleteOrder(false);
	});
});
