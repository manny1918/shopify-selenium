const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class WamCommonPage extends BasePage {
	get leftMenu() {
		return {
			transactions: elementHelper.webElement('[href*="Txn"] span'),
		};
	}
}
module.exports = new WamCommonPage();
