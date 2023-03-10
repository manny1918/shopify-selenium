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
const mailhogPageHelper = require('../../page-object/mailhog/mailhog-page.helper');
const { testSuites } = require('../../page-object/common/common.contants');
const productSku = '1';
const bumpSku = 'bump-1';

const orderUrl = `http://cyshopify.pay.clickbank-tst.net/?cbitems=${productSku}`;
const credentials = commonContants.credentials;

after(async () => {
	await logger.takePhoto();
	await pageHelper.closeBrowser();
});

describe(testSuites.syncMultilineLineOrders, async () => {
	it(`${testSuites.syncMultilineLineOrders} | Physical product with recurring digital component`, async () => {
		logger.stepNumber(1);
		logger.step('Place order');
		await OrderFormPageHelper.placeRecurringDigitalOrderWithBump(orderUrl);
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
		logger.subStep('get product price');
		const price = await ProductEditorPageHelper.getPrice();
		logger.subStep('get product title');
		const title = await ProductEditorPageHelper.getTitle();

		logger.stepNumber(4);
		logger.step('Get bump information from Clickbank page');
		logger.subStep(`Open "${bumpSku}}" product`);
		await MyProductsHelper.openProduct(bumpSku);
		logger.subStep('get product price');
		const bumpPrice = await ProductEditorPageHelper.getPrice();
		logger.subStep('get product title');
		const bumpTitle = await ProductEditorPageHelper.getTitle();

		logger.stepNumber(4);
		logger.step('Verify client receipt notification');
		logger.subStep('Navigate to Mailhog');
		await mailhogPageHelper.navigateToMailhog();
		logger.subStep(`Search the text "${orderNumber}"`);
		await mailhogPageHelper.searchText(orderNumber);
		logger.subStep('Open the notification corresponding to the client');
		await mailhogPageHelper.clickOnClientReceiptNotification();
		logger.subStep('Verify the product title');
		await mailhogPageHelper.verifyProductTitle(title);
		logger.subStep('Verify the bump title');
		await mailhogPageHelper.verifyProductTitle(bumpTitle);

		logger.stepNumber(5);
		logger.step('Verify customer receipt notification');
		logger.subStep('Navigate to Mailhog');
		await mailhogPageHelper.navigateToMailhog();
		logger.subStep(`Search the text "${orderNumber}"`);
		await mailhogPageHelper.searchText(orderNumber);
		logger.subStep('Open the notification corresponding to the customer');
		await mailhogPageHelper.clickOnCustomerReceiptNotification();
		logger.subStep('Verify the product title');
		await mailhogPageHelper.verifyProductTitle(title);
		logger.subStep('Verify the bump title');
		await mailhogPageHelper.verifyProductTitle(bumpTitle);

		logger.stepNumber(6);
		logger.step('Get shopify connection information from Clickbank');
		logger.subStep('Navigate to clickbank');
		await ShopifyLoginPageHelper.navigateToClickbank(false);
		logger.subStep('Login with a vendor account');
		await ClickbankLoginPageHelper.loginWithVendorAccount();
		logger.subStep(`Open "${productSku}}" product`);
		await MyProductsHelper.openProduct(productSku);
		logger.subStep(`Open Shopify Connection for "${productSku}"`);
		await MyProductsHelper.openShopifyConnection(productSku);
		logger.subStep('Get the shopify product name');
		const shopifyProductName = await shopifyProductConnectionHelper.getShopifyProduct();

		logger.stepNumber(7);
		logger.step('Verify product information from Shopify');
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
		logger.subVerification('Verify product name');
		await ShopifyOrdersHelper.verifyProductNameLink(shopifyProductName);
		logger.subVerification('Verify product item number');
		await ShopifyOrdersHelper.verifySku(productSku);
		logger.subVerification('Verify product item number');
		await ShopifyOrdersHelper.verifySku(bumpSku);
		logger.subVerification('Verify product price');
		await ShopifyOrdersHelper.verifyItemPrice(productSku, price);
		logger.subVerification('Verify bump price');
		await ShopifyOrdersHelper.verifyItemPrice(bumpSku, bumpPrice);

		logger.subVerification('Verify Clickbank tag');
		await ShopifyOrdersHelper.verifyClickbankTag();
		logger.subVerification('Verify "Shipping not required" label is displayed');
		await ShopifyOrdersHelper.verifyShippingNotRequiredLabelDisplayed(shopifyProductName);

		logger.postCondition('Delete order');
		await ShopifyOrdersHelper.deleteOrder();
	});
});
