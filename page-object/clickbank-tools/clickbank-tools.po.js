const BasePage = require('../../components/base-page-helper');
const { webElement } = require('../../components/element.helper');

class ClickbakToolsPage extends BasePage {
	get buttons() {
		return {
			get signIn() {
				return webElement.webElement('//h1[.="Sign in with Microsoft"]', 'xpath');
			},
		};
	}
}

module.exports = new ClickbakToolsPage();
