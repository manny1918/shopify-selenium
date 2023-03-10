const { By } = require('selenium-webdriver');
const BasePage = require('./base-page-helper');

class ElementHelper extends BasePage {
	async moveToElement(element) {
		const actions = await driver.actions({ bridge: true });
		await actions.move({ duration: 1000, origin: element, x: 1, y: 1 }).perform();
	}

	async getWebElement(element) {
		if (element.strategy === 'css') {
			return await driver.findElement(By.css(element.selector));
		} else {
			return await driver.findElement(By.xpath(element.selector));
		}
	}

	webElement(selector, locateStrategy = 'css') {
		if (locateStrategy === 'css') {
			return {
				selector: selector,
				strategy: locateStrategy,
				element: driver.findElement(By.css(selector)),
			};
		} else {
			return {
				selector: selector,
				strategy: locateStrategy,
				element: driver.findElement(By.xpath(selector)),
			};
		}
	}
}
module.exports = new ElementHelper();
