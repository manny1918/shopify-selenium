const BasePage = require('../../../components/base-page-helper');
const waitHelper = require('../../../components/wait-helper');
const adminToolsPage = require('./admin-tools-page.po');

class AdminToolsPageHelper extends BasePage {
	async clickOnQuartzSchedulerLink() {
		await waitHelper.waitForElementPresent(adminToolsPage.links.quartzScheduler.selector);
		await adminToolsPage.links.quartzScheduler.element.click();
	}

	async clickOnTicketExpirationLink() {
		await waitHelper.waitForElementPresent(adminToolsPage.links.ticketExpiration.selector);
		await adminToolsPage.links.ticketExpiration.element.click();
	}
}
module.exports = new AdminToolsPageHelper();
