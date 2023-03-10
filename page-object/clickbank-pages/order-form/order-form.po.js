const BasePage = require('../../../components/base-page-helper');
const elementHelper = require('../../../components/element.helper');

class OrderFormPage extends BasePage {
	get buttons() {
		return {
			payNow: elementHelper.webElement('#submit-button'),
		};
	}

	get textboxes() {
		return {
			emailAddress: elementHelper.webElement('#email'),
			cardholderName: elementHelper.webElement('#cardholderName'),
			cardNumber: elementHelper.webElement('[name="cardNumber"]'),
			securityCode: elementHelper.webElement('#securityCode'),
			expirationDate: elementHelper.webElement('#expirationDate'),
			fullName: elementHelper.webElement('[id="billing.fullName"]'),
			streetAddress: elementHelper.webElement('[id="billing.address1"]'),
			aptSuiteOther: elementHelper.webElement('[id="billing.address2"]'),
			zipCode: elementHelper.webElement('[id="billing.zip"]'),
			city: elementHelper.webElement('[id="billing.city"]'),
			phone: elementHelper.webElement('#phone'),
		};
	}

	get dropdowns() {
		return {
			stateProvince: elementHelper.webElement('[id="billing.state"]'),
		};
	}

	get checkboxes() {
		return {
			recurringTerms: elementHelper.webElement('#subscriptionTerms'),
		};
	}

	get otherElements() {
		return {
			get total() {
				return elementHelper.webElement('#total');
			},
			bump(product) {
				return elementHelper.webElement(
					`//p[.="${product}"]//ancestor::div[@class="product-summary"]//button`,
					'xpath'
				);
			},
		};
	}
}

module.exports = new OrderFormPage();
