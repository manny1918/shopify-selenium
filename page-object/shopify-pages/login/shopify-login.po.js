const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class ShopifyLoginPage extends BasePage {
	get elements() {
		return {
			get email() {
				return elementHelper.webElement('#account_email');
			},
			get nextButton() {
				return elementHelper.webElement('[type="submit"]');
			},
			get password() {
				return elementHelper.webElement('#account_password');
			},
		};
	}
}
module.exports = new ShopifyLoginPage();
