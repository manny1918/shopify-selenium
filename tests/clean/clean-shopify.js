const logger = require('../../components/logger-helper');
const pageHelper = require('../../components/page.helper.js');
const commonContants = require('../../page-object/common/common.contants');
const ShopifyCommonPageHelper = require('../../page-object/shopify-pages/common-page/common-page.helper');
const ShopifyLoginPageHelper = require('../../page-object/shopify-pages/login/shopify-login.helper');
const ShopifyOrdersHelper = require('../../page-object/shopify-pages/orders/shopify-orders.helper');
const waitHelper = require('../../components/wait-helper');
const credentials = commonContants.credentials;

after(async () => {
	await logger.takePhoto();
	await pageHelper.closeBrowser();
});

describe('Clean orders', () => {
	it('Sync digital product with physical component order', async () => {
		logger.stepNumber(1);
		logger.step('Navigate to Shopify');
		await ShopifyLoginPageHelper.navigateToShopify();

		logger.stepNumber(2);
		logger.step('Login to Shopify');
		await ShopifyLoginPageHelper.loginToShopify(credentials.email, credentials.password);

		logger.stepNumber(3);
		logger.step('Click on Orders option');
		await waitHelper.wait(4000);
		await ShopifyCommonPageHelper.clickOnOrdersOption();
		await waitHelper.wait(4000);

		logger.stepNumber(4);
		logger.step('Delete the first 50 shopify orders');
		for (let i = 0; i < 50; i++) {
			logger.subStep('Click on the fist cell');
			await ShopifyOrdersHelper.clickOnFirstOrderCell();
			try {
				logger.subStep('Click on fulfill button');
				await ShopifyOrdersHelper.clickOnFulfillButton();
			} catch (e) {}
			try {
				logger.subStep('Insert a random tracking number');
				await ShopifyOrdersHelper.insertTranckingNumber('1234');
				logger.subStep('Insert a random shipping carrier');
				await ShopifyOrdersHelper.insertShippingCarrier('something');
				logger.subStep('Insert a random url');
				await ShopifyOrdersHelper.insertTrackingUrl();
			} catch (e) {}
			try {
				logger.subStep('Click on fulfill button');
				await ShopifyOrdersHelper.clickOnFulfillButton();
			} catch (e) {}
			await waitHelper.wait(5000);

			logger.stepNumber(5);
			logger.step('Delete order');
			await ShopifyOrdersHelper.deleteOrder(false);
			await waitHelper.wait(5000);
		}
	});
});
