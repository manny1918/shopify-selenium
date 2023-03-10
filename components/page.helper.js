const BasePage = require('../components/base-page-helper');
const WaitHelper = require('../components/wait-helper');
const wamCommonPageHelper = require('../page-object/clickbank-pages/wam-common-page/wam-common-page.helper');
const CommonConstant = require('../page-object/common/common.contants');

class PageHelper {
	async closeBrowser() {
		await driver.quit();
		try {
			await this.closeCurrentWindow();
			await driver.quit();
			driver = null;
		} catch (e) {
			console.log('Browser already closed');
		}
	}

	async closeCurrentWindow() {
		try {
			await driver.close();
			await wamCommonPageHelper.closeAlert();
		} catch (e) {
			console.log('Browser already closed');
		}
	}

	async clearBrowser() {
		await driver.manage().deleteAllCookies();
		await driver.navigate().refresh();
	}

	async refresh() {
		await driver.navigate().refresh();
	}

	async restartBrowser() {
		try {
			await this.closeBrowser();
		} catch (e) {
			console.log('Browser already closed');
		}
		await new BasePage();
	}

	async getCurrentUrl() {
		let url;
		await WaitHelper.implicitWait(CommonConstant.commonData.implicitWaitDefaultTimeout);
		await driver.getCurrentUrl().then(function (currentUrl) {
			url = currentUrl.toString();
		});
		return url;
	}
}
module.exports = new PageHelper();
