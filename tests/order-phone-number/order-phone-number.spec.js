const logger = require('../../components/logger-helper');
const pageHelper = require('../../components/page.helper.js');
const OrderFormPageHelper = require('../../page-object/clickbank-pages/order-form/order-form.helper.js');
const orderReceivedHelper = require('../../page-object/clickbank-pages/order-received/order-received.helper');
const commonContants = require('../../page-object/common/common.contants');
const ShopifyCommonPageHelper = require('../../page-object/shopify-pages/common-page/common-page.helper');
const ShopifyLoginPageHelper = require('../../page-object/shopify-pages/login/shopify-login.helper');
const ShopifyOrdersHelper = require('../../page-object/shopify-pages/orders/shopify-orders.helper');
const { testSuites } = require('../../page-object/common/common.contants');
const orderFormConstants = require('../../page-object/clickbank-pages/order-form/order-form.constants');
const waitHelper = require('../../components/wait-helper');
const orderFormHelper = require('../../page-object/clickbank-pages/order-form/order-form.helper.js');
const { testData } = orderFormConstants;
const productSku = 'phone-test-physical';

const orderUrl = `http://cyshopify.pay.clickbank-tst.net/?cbitems=${productSku}`;
const credentials = commonContants.credentials;
const validPhoneNumber = '8882804331';

afterEach(async () => {
	await logger.takePhoto();
	await pageHelper.closeBrowser();
});

describe(testSuites.orderPhoneNumber, async () => {
	it(`${testSuites.orderPhoneNumber} | Valid phone number`, async () => {
		const firstName = await OrderFormPageHelper.generateRandomString();
		const lastName = await OrderFormPageHelper.generateRandomString();

		logger.stepNumber(1);
		logger.step('Navigate to Order form');
		await OrderFormPageHelper.navigateToOrderForm(orderUrl);

		logger.stepNumber(2);
		logger.step('Insert emaill address');
		await OrderFormPageHelper.insertEmailAddress(testData.emailAddress);

		logger.stepNumber(3);
		logger.step('Insert emaill address');
		await OrderFormPageHelper.insertPhoneNumber(validPhoneNumber);

		logger.stepNumber(4);
		logger.step('Inser card number');
		await OrderFormPageHelper.insertCardNumber(testData.cardNumber);

		logger.stepNumber(5);
		logger.step('Insert cardholder name');
		await OrderFormPageHelper.insertCardholderName(`${firstName} ${lastName}`);

		logger.stepNumber(6);
		logger.step('Insert secutity code');
		await OrderFormPageHelper.insertSecurityCode(testData.securityCode);

		logger.stepNumber(7);
		logger.step('Insert Expiration Date');
		await OrderFormPageHelper.insertExpirationDate(testData.expirationDate);

		logger.stepNumber(8);
		logger.step('Insert full name');
		await OrderFormPageHelper.insertFullName(`${firstName} ${lastName}`);

		logger.stepNumber(9);
		logger.step('Insert Street address');
		await OrderFormPageHelper.insertStreetAddress(testData.streetAddress);

		logger.stepNumber(10);
		logger.step('Insert Zip code');
		await OrderFormPageHelper.insertZipCode(testData.zipCode);

		logger.stepNumber(11);
		logger.step('Click on Pay button');
		await OrderFormPageHelper.clickOnPayButton();

		logger.stepNumber(12);
		logger.step('Get the receipt number');
		const orderNumber = await orderReceivedHelper.getOrderNumber();

		logger.stepNumber(13);
		logger.step('Sync shopify orders');
		await OrderFormPageHelper.syncOrdersWithGraphQl(orderNumber);

		logger.stepNumber(14);
		logger.step('Navigate to Shopify');
		await ShopifyLoginPageHelper.navigateToShopify(false);

		logger.stepNumber(15);
		logger.step('Login to Shopify');
		await ShopifyLoginPageHelper.loginToShopify(credentials.email, credentials.password);

		logger.stepNumber(16);
		logger.step('Click on Orders option');
		await ShopifyCommonPageHelper.clickOnOrdersOption();

		logger.stepNumber(17);
		logger.step(`Open order "${orderNumber}"`);
		await ShopifyOrdersHelper.clickOnOrderNumberCell(orderNumber);

		logger.stepNumber(18);
		logger.subVerification('Verify Contact Information phone number');
		await ShopifyOrdersHelper.verifyContactInformationPhoneNumber(validPhoneNumber, true);

		logger.stepNumber(19);
		logger.subVerification('Verify Shipping Address phone number');
		await ShopifyOrdersHelper.verifyShippingAddressPhoneNumber(validPhoneNumber);

		logger.postCondition('Delete order');
		await ShopifyOrdersHelper.deleteOrder();
	});

	it(`${testSuites.orderPhoneNumber} | Invalid phone number`, async () => {
		const firstName = await OrderFormPageHelper.generateRandomString();
		const lastName = await OrderFormPageHelper.generateRandomString();
		const invalidPhoneNumber = '43267';
		logger.preCondition('Place an order with a valid phone number');
		const orderOne = await orderFormHelper.placeOrderWithPhoneNumber(
			testData.email,
			testData.fullName,
			validPhoneNumber,
			orderUrl
		);
		await OrderFormPageHelper.syncOrdersWithGraphQl(orderOne);
		await waitHelper.wait(35000);

		logger.stepNumber(1);
		logger.step('Navigate to Order form');
		await OrderFormPageHelper.navigateToOrderForm(orderUrl);

		logger.stepNumber(2);
		logger.step('Insert emaill address');
		await OrderFormPageHelper.insertEmailAddress(testData.emailAddress);

		logger.stepNumber(3);
		logger.step('Insert emaill address');
		await OrderFormPageHelper.insertPhoneNumber(invalidPhoneNumber);

		logger.stepNumber(4);
		logger.step('Inser card number');
		await OrderFormPageHelper.insertCardNumber(testData.cardNumber);

		logger.stepNumber(5);
		logger.step('Insert cardholder name');
		await OrderFormPageHelper.insertCardholderName(testData.fullName);

		logger.stepNumber(6);
		logger.step('Insert secutity code');
		await OrderFormPageHelper.insertSecurityCode(testData.securityCode);

		logger.stepNumber(7);
		logger.step('Insert Expiration Date');
		await OrderFormPageHelper.insertExpirationDate(testData.expirationDate);

		logger.stepNumber(8);
		logger.step('Insert full name');
		await OrderFormPageHelper.insertFullName(testData.fullName);

		logger.stepNumber(9);
		logger.step('Insert Street address');
		await OrderFormPageHelper.insertStreetAddress(testData.streetAddress);

		logger.stepNumber(10);
		logger.step('Insert Zip code');
		await OrderFormPageHelper.insertZipCode(testData.zipCode);

		logger.stepNumber(11);
		logger.step('Click on Pay button');
		await OrderFormPageHelper.clickOnPayButton();

		logger.stepNumber(12);
		logger.step('Get the receipt number');
		const orderNumber = await orderReceivedHelper.getOrderNumber();

		logger.stepNumber(13);
		logger.step('Sync shopify orders');
		await OrderFormPageHelper.syncOrdersWithGraphQl(orderNumber);

		logger.stepNumber(14);
		logger.step('Navigate to Shopify');
		await ShopifyLoginPageHelper.navigateToShopify(false);

		logger.stepNumber(15);
		logger.step('Login to Shopify');
		await ShopifyLoginPageHelper.loginToShopify(credentials.email, credentials.password);

		logger.stepNumber(16);
		logger.step('Click on Orders option');
		await ShopifyCommonPageHelper.clickOnOrdersOption();

		logger.stepNumber(17);
		logger.step(`Open order "${orderNumber}"`);
		await ShopifyOrdersHelper.clickOnOrderNumberCell(orderNumber);

		logger.stepNumber(18);
		logger.subVerification('Verify Contact Information phone number');
		await ShopifyOrdersHelper.verifyContactInformationPhoneNumber('No phone number');

		logger.stepNumber(19);
		logger.subVerification('Verify Shipping Address phone number');
		await ShopifyOrdersHelper.verifyShippingAddressPhoneNumber(invalidPhoneNumber);

		logger.postCondition('Delete order');
		await ShopifyOrdersHelper.deleteOrder();
	});
});
