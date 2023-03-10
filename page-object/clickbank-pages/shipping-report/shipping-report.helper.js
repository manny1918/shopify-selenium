const { assert } = require('chai');
const BasePage = require('../../../components/base-page-helper');
const expectationHerlper = require('../../../components/expectation.herlper');
const logger = require('../../../components/logger-helper');
const waitHelper = require('../../../components/wait-helper');
const clickbankCommonPageHelper = require('../clickbank-common-page/clickbank-common-page.helper');
const shippingReport = require('./shipping-report.po');

class ShippingReportPageHelper extends BasePage {
	async navigateToShippingReport() {
		logger.subStep('Click on Reporting menu');
		await clickbankCommonPageHelper.clickOnReporingMenu();
		logger.subStep('Click on Shipping option');
		await clickbankCommonPageHelper.clickOnShippingOption();
	}

	async insertReceiptNumber(receipt) {
		await shippingReport.textboxes.receipt.element.sendKeys(receipt);
	}

	async selectShipStatus(option) {
		await shippingReport.dropdowns.shipstatus.element.click();
		await shippingReport.dropdownOption(option).click();
	}

	async clickOnFilterButton() {
		await shippingReport.buttons.filter.element.click();
	}

	async findAndOptionReceiptRecord(receipt) {
		logger.subStep(`Insert "${receipt}" as receipt number`);
		await this.insertReceiptNumber(receipt);
		logger.subStep('Select Ship Status');
		await this.selectShipStatus('all');
		logger.subStep('Click on Filter button');
		await this.clickOnFilterButton();
	}

	async waitForShippingNoticeToBeUpdated() {
		let time = 0;
		while (time < 300000) {
			await this.clickOnFilterButton();
			if (!(await waitHelper.isElementPresent(shippingReport.links.moreDetails.selector))) {
				await waitHelper.wait(500);
				time += 500;
			} else {
				const url = await shippingReport.links.moreDetails.element.getAttribute('href');
				await this.navigateTo(url);
				return true;
			}
		}
		assert.isTrue(false, 'Shipping information not found');
	}

	async verifyShippingNoticeIsNotUpdatedInClickbank() {
		let time = 0;
		try {
			while (time < 180000) {
				await this.clickOnFilterButton();
				if (!(await waitHelper.isElementPresent(shippingReport.links.moreDetails.selector))) {
					await waitHelper.wait(500);
					time += 500;
				}
			}
		} catch (e) {}
		await expectationHerlper.verifyElementNotDisplayed(shippingReport.links.moreDetails.selector);
	}

	async verifyTrackingNumber(trackingNumber) {
		await waitHelper.waitForElementPresent(shippingReport.trackingNumber(trackingNumber).selector);
		await expectationHerlper.verifyElementDisplayed(shippingReport.trackingNumber(trackingNumber).selector);
	}
}
module.exports = new ShippingReportPageHelper();
