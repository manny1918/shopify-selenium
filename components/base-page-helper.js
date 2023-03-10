const { expect } = require('chai');
const webdriver = require('selenium-webdriver');
const expectationHerlper = require('../components/expectation.herlper');
const ExpectationHelper = require('../components/expectation.herlper');
const WaitHelper = require('../components/wait-helper');
const commonContants = require('../page-object/common/common.contants');

class BasePage {
	async startBrowser(url, newDriver = true) {
		const chrome = require('selenium-webdriver/chrome');
		const driver = new webdriver.Builder().forBrowser('chrome').build();
		// const driver = new webdriver.Builder()
		// 	.forBrowser('chrome')
		// 	.usingServer('http://localhost:4444/wd/hub')
		// 	.build();
		global.driver = driver;
	}

	async navigateTo(url, newDriver = true) {
		if (newDriver) {
			await this.startBrowser();
		}
		await driver.manage().deleteAllCookies();
		await driver.get(url);
		await this.closeAlert();
	}

	async closeAlert() {
		try {
			await driver.switchTo().alert().accept();
			await driver.switchTo().alert().accept();
		} catch (e) {}
	}

	async navigateToClickbank(newDriver = true, closeAlert = false) {
		const url = commonContants.commonData.clickbankUrl;
		await this.navigateTo(url, newDriver);
		if (closeAlert) {
			await this.closeAlert();
		}
		await expectationHerlper.verifyUrl(url);
	}

	async navigateToUrl(url) {
		await driver.get(url);
	}

	async click(element) {
		await WaitHelper.implicitWait(CommonConstant.commonData.implicitWaitDefaultTimeout);
		await element.click();
	}

	async sendText(element, text) {
		await WaitHelper.waitElementDisplayed(element);
		await element.sendKeys(text);
	}

	async pressKey(key) {
		const element = driver.switchTo().activeElement();
		await element.sendKeys(key);
	}

	async verifyUrl(url) {
		Logger.subVerification(`The current URL should contain ${url}`);
		await ExpectationHelper.verifyTextContainedInUrl(url);
	}

	async getElementValue(element) {
		let elementValue;
		await WaitHelper.waitElementDisplayed(element);
		await element.getAttribute('data-initial-value').then(function (currentValue) {
			elementValue = currentValue;
		});
		return elementValue;
	}

	async sendTextWithoutPassingElement(text) {
		const element = driver.switchTo().activeElement();
		await element.sendKeys(text);
	}

	async executeScript(script) {
		var exec = require('child_process').execSync;
		exec(script);
	}

	async getOrdersDate() {
		let date = new Date().toISOString();
		const hour = date.substring(14, 16);
		if (hour <= 30) {
			date = `${date.substring(0, 13)}:00:00`;
		} else {
			date = `${date.substring(0, 13)}:30:00`;
		}
		return date;
	}

	async forPageToLoad() {
		await window.addEventListener('load', function () {
			console.log('loaded');
		});
	}

	async clearCookies() {
		await driver.manage().deleteAllCookies();
		await driver.navigate().refresh();
	}

	async switchToWindow(number = 1) {
		await driver.getAllWindowHandles().then(async function (handles) {
			await driver
				.switchTo()
				.window(handles[number])
				.then(function () {});
		});
	}

	async generateRandomString(length = 10) {
		var result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
}
module.exports = BasePage;
