const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class ClickbankLoginPage extends BasePage {
	get textboxes() {
		return {
			username: elementHelper.webElement('[name="username"]'),
			password: elementHelper.webElement('[name="password"]'),
		};
	}

	get buttons() {
		return {
			login: elementHelper.webElement('[type="submit"]'),
		};
	}
}

module.exports = new ClickbankLoginPage();
