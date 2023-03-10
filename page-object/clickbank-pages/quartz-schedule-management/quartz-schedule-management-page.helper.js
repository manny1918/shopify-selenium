const BasePage = require('../../../components/base-page-helper');
const adminToolsPageHelper = require('../admin-tools/admin-tools-page.helper');
const clickbankCommonPageHelper = require('../clickbank-common-page/clickbank-common-page.helper');
const quartzScheduleManagementPage = require('./quartz-schedule-management-page.po');
const shopifyLoginPageHelper = require('../../shopify-pages/login/shopify-login.helper');
const clickbankLoginPageHelper = require('../../clickbank-pages/login/login.helper');
const logger = require('../../../components/logger-helper');
const waitHelper = require('../../../components/wait-helper');

class QuartzScheduleManagementPageHelper extends BasePage {
	async clickOnDailyRebillJob() {
		await quartzScheduleManagementPage.links.dailyRebillJob.element.click();
	}

	async insertRunDate(date) {
		await quartzScheduleManagementPage.otherElements.runDate.element.sendKeys(date);
	}

	async clickOnRunButton() {
		await quartzScheduleManagementPage.buttons.run.element.click();
		await waitHelper.wait(10000);
	}

	async triggerRebill(billingDate) {
		logger.subStep('Navigate to Clickbank');
		await shopifyLoginPageHelper.navigateToClickbank(true);
		logger.subStep('Login with an admin account');
		await clickbankLoginPageHelper.login('jaj', 'password');
		logger.subStep('Click on Admin tools option');
		await clickbankCommonPageHelper.clickOnAdminToolsOption();
		logger.subStep('Click on Quartz Schedule link');
		await adminToolsPageHelper.clickOnQuartzSchedulerLink();
		logger.subStep('Click on Daily Rebill job link');
		await this.clickOnDailyRebillJob();
		logger.subStep('Insert the billing date');
		await this.insertRunDate(billingDate);
		logger.subStep('Click on Run button');
		await this.clickOnRunButton();
	}

	async triggerTicketExpirationJob(date) {
		logger.subStep('Navigate to Clickbank');
		await shopifyLoginPageHelper.navigateToClickbank(true);
		logger.subStep('Login with an admin account');
		await clickbankLoginPageHelper.login('jaj', 'password');
		logger.subStep('Click on Admin tools option');
		await clickbankCommonPageHelper.clickOnAdminToolsOption();
		logger.subStep('Click on Quartz Schedule link');
		await adminToolsPageHelper.clickOnQuartzSchedulerLink();
		logger.subStep('Click on Ticket Expiration job');
		await adminToolsPageHelper.clickOnTicketExpirationLink();
		logger.subStep('Insert the billing date');
		await this.insertRunDate(date);
		logger.subStep('Click on Run button');
		await this.clickOnRunButton();
	}
}
module.exports = new QuartzScheduleManagementPageHelper();
