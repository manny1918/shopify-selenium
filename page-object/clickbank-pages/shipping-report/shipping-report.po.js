const { By } = require('selenium-webdriver');
const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class ShippingReportPage extends BasePage {
	get textboxes() {
		return {
			receipt: elementHelper.webElement('#receipt'),
		};
	}

	get dropdowns() {
		return {
			shipstatus: elementHelper.webElement('#shipstatus'),
		};
	}

	get buttons() {
		return {
			filter: elementHelper.webElement('[type="submit"]'),
		};
	}

	get links() {
		return {
			moreDetails: elementHelper.webElement('a[href*="shippingNoticeView"]'),
		};
	}

	trackingNumber(tracking) {
		return elementHelper.webElement(
			`//b[contains(., "Tracking Number")]//ancestor::tr//td[contains(., "${tracking}")]`
		);
	}

	dropdownOption(option) {
		return driver.findElement(By.xpath(`//option[@value="${option}"]`));
	}
}
module.exports = new ShippingReportPage();
