const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class ClickbankCommonPage extends BasePage {
	get otherElements() {
		return {
			pageLogo: elementHelper.webElement('img[alt="ClickBank"]'),
		};
	}

	get topGrayMenu() {
		return {
			vendorSettings: elementHelper.webElement('a[href*="/site.htm"]'),
			reporting: elementHelper.webElement('a[href*="analytics"]'),
		};
	}

	get vendorSettingsMenu() {
		return {
			myProducts: elementHelper.webElement('a[href*="/products.htm"]'),
		};
	}

	get reportingMenu() {
		return {
			shipping: elementHelper.webElement('a[href*="shipping"]'),
		};
	}

	get administratorMenu() {
		return {
			adminTools: elementHelper.webElement('[href*="report"]'),
		};
	}

	get topBlueMenu() {
		return {
			logout: elementHelper.webElement('#userLogout'),
		};
	}
}
module.exports = new ClickbankCommonPage();
