const WaitHelper = require('../components/wait-helper');
const HTMLHelper = require('../components/html-helper');
const { By } = require('selenium-webdriver');
const { expect, assert } = require('chai');
const CommonConstant = require('../page-object/common/common.contants');
const waitHelper = require('../components/wait-helper');

class ExpectationHelper {
	async verifyTextContainedInUrl(text) {
		await WaitHelper.implicitWait(CommonConstant.commonData.implicitWaitDefaultTimeout);
		driver.getCurrentUrl().then(function (currentUrl) {
			expect(currentUrl).toContain(text);
		});
	}

	async verifyElementContainsText(element, text) {
		await WaitHelper.implicitWait(CommonConstant.commonData.implicitWaitDefaultTimeout);
		element.getText().then(function (currentText) {
			expect(currentText).toContain(text);
		});
	}

	async verifyElementContainsValue(element, val) {
		await WaitHelper.implicitWait(CommonConstant.commonData.implicitWaitDefaultTimeout);
		element.getAttribute(HTMLHelper.attributes.value).then(function (currentText) {
			expect(currentText).toContain(val);
		});
	}

	async verifyStringAreEquals(stringOne, stringTwo) {
		expect(stringOne).toEqual(stringTwo);
	}

	async verifyElementDisplayed(selector, strategy = 'css') {
		const displayed = await waitHelper.isElementPresent(selector);
		expect(displayed).to.equal(true);
		assert.equal(displayed, true, `"${selector}" should be displayed`);
	}

	async verifyElementNotDisplayed(selector, strategy = 'css') {
		const displayed = await waitHelper.isElementPresent(selector);
		expect(displayed).to.equal(false);
	}

	async verifyUrl(url) {
		var currentURL = await driver.getCurrentUrl();
		expect(currentURL.toString()).to.contain(url);
	}
}
module.exports = new ExpectationHelper();
