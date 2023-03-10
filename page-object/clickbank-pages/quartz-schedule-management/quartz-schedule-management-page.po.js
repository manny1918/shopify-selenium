const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class QuartzScheduleManagementPage extends BasePage {
	get links() {
		return {
			dailyRebillJob: elementHelper.webElement('(//a[contains(@href, "dailyRebillJob")])[1]', 'xpath'),
		};
	}

	get buttons() {
		return {
			run: elementHelper.webElement('#run'),
		};
	}

	get otherElements() {
		return {
			runDate: elementHelper.webElement('#rundate'),
		};
	}
}
module.exports = new QuartzScheduleManagementPage();
