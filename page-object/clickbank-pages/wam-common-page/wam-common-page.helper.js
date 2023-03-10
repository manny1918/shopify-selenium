const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');
const waitHelper = require('../../../components/wait-helper');
const wamCommonPage = require('./wam-common-page.po');

class WamCommonPageHelper extends BasePage {
	async clickOnTransactionsOption() {
		const element = await elementHelper.getWebElement(wamCommonPage.leftMenu.transactions);
		await waitHelper.waitElementDisplayed(wamCommonPage.leftMenu.transactions.selector)
		await element.click();
	}
}
module.exports = new WamCommonPageHelper();
