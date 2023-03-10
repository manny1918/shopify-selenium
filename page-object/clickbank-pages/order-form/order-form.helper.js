const { assert } = require('chai');
const BasePage = require('../../../components/base-page-helper.js');
const elementHelper = require('../../../components/element.helper.js');
const logger = require('../../../components/logger-helper.js');
const waitHelper = require('../../../components/wait-helper');
const WaitHelper = require('../../../components/wait-helper');
const OrderFormPage = require('../../clickbank-pages/order-form/order-form.po');
const orderFormConstants = require('./order-form.constants.js');

const { testData } = orderFormConstants;
const axios = require('axios');
const expectationHerlper = require('../../../components/expectation.herlper.js');
const orderReceivedHelper = require('../order-received/order-received.helper.js');

class OrderFormPageHelper extends BasePage {
	async navigateToOrderForm(url) {
		await this.navigateTo(url);
		await WaitHelper.waitForElementPresent(OrderFormPage.buttons.payNow.selector);
		await WaitHelper.waitForElementVisible(OrderFormPage.textboxes.securityCode.selector);
	}

	async verifyOrderFormIsDisplayed() {
		await expectationHerlper.verifyElementDisplayed(OrderFormPage.textboxes.securityCode.selector);
	}

	async insertEmailAddress(email) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.emailAddress);
		await element.sendKeys(email);
	}

	async insertFullName(fullName) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.fullName);
		await element.sendKeys(fullName);
	}

	async insertStreetAddress(streetAddress) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.streetAddress);
		await element.sendKeys(streetAddress);
	}

	async insertCardholderName(cardholderName) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.cardholderName);
		await element.sendKeys(cardholderName);
	}

	async insertCardNumber(cardNumber) {
		await driver.switchTo().frame('tx_iframe_cardNumber');
		await WaitHelper.waitElementDisplayed(OrderFormPage.textboxes.cardNumber.selector);
		await WaitHelper.waitForElementVisible(OrderFormPage.textboxes.cardNumber.selector);
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.cardNumber);
		await element.sendKeys(cardNumber);
		await driver.switchTo().defaultContent();
	}

	async insertSecurityCode(securityCode) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.securityCode);
		await element.sendKeys(securityCode);
	}

	async insertExpirationDate(expirationDate) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.expirationDate);
		await element.sendKeys(expirationDate);
	}

	async inserAptSuiteOther(apt) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.aptSuiteOther);
		await element.sendKeys(apt);
	}

	async insertZipCode(zip) {
		const element = await elementHelper.getWebElement(OrderFormPage.textboxes.zipCode);
		await element.sendKeys(zip);
		await waitHelper.wait(2000);
	}

	async insertPhoneNumber(phone = '1-800-419-0157') {
		try {
			logger.subStep('Insert phone number');
			await OrderFormPage.textboxes.phone.element.sendKeys(phone);
		} catch (e) {
			console.log('No phone number field');
		}
	}

	async insertCity(city) {
		await WaitHelper.waitForElementPresent(OrderFormPage.textboxes.city.selector);
		try {
			const element = await elementHelper.getWebElement(OrderFormPage.textboxes.city);
			return await element.sendKeys(city);
		} catch (e) {
			const element = await elementHelper.getWebElement(OrderFormPage.textboxes.city);
			return await element.sendKeys(city);
		}
	}

	async clickOnPayButton() {
		await waitHelper.waitForElementPresent(OrderFormPage.buttons.payNow.selector);
		const element = await elementHelper.getWebElement(OrderFormPage.buttons.payNow);
		await element.click();
	}

	async syncOrders() {
		const ordersDate = await this.getOrdersDate();
		const { exec } = require('child_process');
		await exec('kubectl port-forward svc/shopify-orders -n rest 8001:8180 &', (err, stdout, stderr) => {
			if (err) {
				return;
			}
		});
		await WaitHelper.wait(6000);
		try {
			const script = `curl "http://localhost:8001/internal/cyshopify?date=${ordersDate}"`;
			await this.executeScript(script);
			await this.executeScript(`pkill -f "port-forward"`);
		} catch (e) {
			assert.isTrue(false, e.message);
		}
	}

	async getAccessToken(acct) {
		const res = await axios({
			url: 'https://new-im2.sexy-feynman.net/graphql',
			method: 'post',
			data: {
				query: `
				{
					authenticate(username: "${acct.username}", password: "${acct.password}") {
					  accessToken
					  refreshToken
					}
				  }
					 `,
			},
		});
		return res.data.data.authenticate.accessToken;
	}

	async syncOrdersWithGraphQl(receiptNumber, acct = { username: 'cyshopify', password: 'PAssword11!!' }) {
		const token = await this.getAccessToken(acct);
		const response = await axios({
			url: 'https://new-im2.sexy-feynman.net/graphql',
			headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
			method: 'post',
			data: {
				query: `
				mutation {
					repairShopifyOrderByReceipt( vendor: "${acct.username}", receipt: "${receiptNumber}" )
				  }
					 `,
			},
		});
		const result = response.data.data.repairShopifyOrderByReceipt;
		assert.equal(result, 'success', 'The order should be synced');
		console.log(response)
		return response;
	}

	async insertDigitalProductInformation(
		email = testData.emailAddress,
		cardNumber = testData.cardNumber,
		fullName = testData.fullName,
		securityCode = testData.securityCode,
		expirationDate = testData.expirationDate,
		zipCode = testData.zipCode
	) {
		logger.subStep('Insert emaill address');
		await this.insertEmailAddress(email);
		await this.insertPhoneNumber();
		logger.subStep('Inser card number');
		await this.insertCardNumber(cardNumber);
		logger.subStep('Insert cardholder name');
		await this.insertCardholderName(fullName);
		logger.subStep('Insert secutity code');
		await this.insertSecurityCode(securityCode);
		logger.subStep('Insert Expiration Date');
		await this.insertExpirationDate(expirationDate);
		logger.subStep('Insert Zip code');
		await this.insertZipCode(zipCode);
	}

	async placeOneTimeDigitalProductOrder(orderUrl) {
		logger.subStep('Navigate to Order form');
		await this.navigateToOrderForm(orderUrl);
		await this.insertDigitalProductInformation();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
	}

	async placePhysicalProductOrder(orderUrl) {
		logger.subStep('Navigate to Order form');
		await this.navigateToOrderForm(orderUrl);
		await this.verifyOrderFormIsDisplayed();
		await this.inserPhysicalProductInformation();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
	}

	async placeOrderWithPhoneNumber(email, name, phoneNumber, orderUrl) {
		logger.subStep('Navigate to Order form');
		await this.navigateToOrderForm(orderUrl);
		await this.verifyOrderFormIsDisplayed();
		await this.inserPhysicalProductInformation(email, undefined, name);
		await this.insertPhoneNumber(phoneNumber);
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
		return await orderReceivedHelper.getOrderNumber();
	}

	async placeRecurringDigitalProductOrder(orderUrl) {
		logger.subStep('Navigate to Order form');
		await this.navigateToOrderForm(orderUrl);
		await this.insertDigitalProductInformation();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
		logger.subStep('Accept terms of payment');
		await this.acceptRecurringTerms();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
	}

	async placeRecurringPhysicalProductOrder(orderUrl) {
		logger.subStep('Navigate to Order form');
		await this.navigateToOrderForm(orderUrl);
		await this.inserPhysicalProductInformation();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
		logger.subStep('Accept terms of payment');
		await this.acceptRecurringTerms();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
	}

	async addBump(product) {
		await OrderFormPage.otherElements.bump(product).element.click();
	}

	async placeRecurringDigitalOrderWithBump(orderUrl, bump = 'bump-1') {
		logger.subStep('Navigate to Order form');
		await this.navigateToOrderForm(orderUrl);
		logger.subStep('Add bump');
		await this.addBump(bump);
		await this.insertDigitalProductInformation();
		logger.subStep('Accept terms of payment');
		await this.acceptRecurringTerms();
		logger.subStep('Click on Pay button');
		await this.clickOnPayButton();
	}

	async acceptRecurringTerms() {
		const element = await elementHelper.getWebElement(OrderFormPage.checkboxes.recurringTerms);
		await element.click();
	}

	async inserPhysicalProductInformation(
		email = testData.emailAddress,
		cardNumber = testData.cardNumber,
		fullName = testData.fullName,
		securityCode = testData.securityCode,
		expirationDate = testData.expirationDate,
		streetAddress = testData.streetAddress,
		zipCode = testData.zipCode,
		city = testData.city
	) {
		logger.subStep('Insert emaill address');
		await this.insertEmailAddress(email);
		logger.subStep('Inser card number');
		await this.insertCardNumber(cardNumber);
		logger.subStep('Insert cardholder name');
		await this.insertCardholderName(fullName);
		logger.subStep('Insert secutity code');
		await this.insertSecurityCode(securityCode);
		logger.subStep('Insert Expiration Date');
		await this.insertExpirationDate(expirationDate);
		logger.subStep('Insert full name');
		await this.insertFullName(fullName);
		logger.subStep('Insert Street address');
		await this.insertStreetAddress(streetAddress);
		logger.subStep('Insert Zip code');
		await this.insertZipCode(zipCode);
		logger.subStep('Insert City');
		await this.insertCity(city);
	}
}
module.exports = new OrderFormPageHelper();
