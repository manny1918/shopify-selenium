const BasePage = require('../../components/base-page-helper');
const clickbankToolsPage = require('./clickbank-tools.po');

class ClickbakToolsPageHelper extends BasePage {
	async clickOnSignInButton() {
		clickbankToolsPage.buttons.signIn.click();
	}
}

module.exports = new ClickbakToolsPageHelper();
