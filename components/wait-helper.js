const { assert } = require('chai');
const { By } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const CommonConstants = require('../page-object/common/common.contants');
const expectationHerlper = require('./expectation.herlper');

class WaitHelper {
	async waitElementDisplayed(locator, timeout = CommonConstants.commonData.defaultTimeout, strategy = 'css') {
		if (strategy === 'css') {
			await driver.wait(webdriver.until.elementLocated(By.css(locator)));
		} else {
			await driver.wait(webdriver.until.elementLocated(By.xpath(locator)));
		}
	}

	async waitElementEnabled(element, timeout = CommonConstants.commonData.defaultTimeout) {
		let timer = 500;
		while (timer < timeout) {
			if (!(await element.isEnabled())) {
				await driver.sleep(500);
				timer += 500;
			} else {
				await driver.sleep(500);
				timer = timeout + 1;
			}
		}
	}

	async wait(ms) {
		await driver.sleep(ms);
	}

	async implicitWait(ms) {
		await driver.manage().setTimeouts({ implicit: ms });
	}

	async waitForPageToLoad() {
		while (true) {
			const result = driver.executeScript("return document.readyState == 'complete'");
			if (result) {
				return;
			}
		}
	}

	async waitForElementVisible(selector, strategy = 'css', timeout = CommonConstants.timeouts.l) {
		if (strategy === 'css') {
			await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.css(selector))), timeout);
		} else {
			await driver.wait(webdriver.until.elementIsVisible(driver.findElement(By.xpath(selector))), timeout);
		}
	}

	async adjustTimeout() {
		const TIMEOUT = 120000;
		const capabilities = await driver.getCapabilities();
		await capabilities['map_'].set('timeouts', { implicit: TIMEOUT, pageLoad: TIMEOUT, script: TIMEOUT });
	}

	async isElementPresent(selector) {
		let elements;
		if (selector.includes('//')) {
			elements = await driver.findElements(By.xpath(selector));
		} else {
			elements = await driver.findElements(By.css(selector));
		}
		if (elements.length > 0) {
			return true;
		} else {
			return false;
		}
	}

	async waitForElementPresent(selector, strategy = 'css', timeout = 20000) {
		let time = 0;
		while (time < timeout) {
			if (!(await this.isElementPresent(selector))) {
				await this.wait(500);
				time += 500;
			} else {
				return true;
			}
		}
		assert.isTrue(false, `Element: <<${selector}>> not found`);
	}
}
module.exports = new WaitHelper();
