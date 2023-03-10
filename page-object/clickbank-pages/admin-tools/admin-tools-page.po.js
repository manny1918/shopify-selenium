const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class AdminToolsPage extends BasePage {
	get links() {
		return {
			quartzScheduler: elementHelper.webElement('[href*="schedulemgr"]'),
			ticketExpiration: elementHelper.webElement('#run_ticketExpirationCron'),
		};
	}
}

module.exports = new AdminToolsPage();
