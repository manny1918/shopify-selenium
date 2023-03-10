class CommonConstants {
	get commonData() {
		return {
			clickbankUrl: 'https://accounts.clickbank-tst.com/master/login.htm',
			defaultTimeout: 40000,
			implicitWaitDefaultTimeout: 30000,
			googleAccountUrl: 'https://accounts.google.com/',
		};
	}

	get elementNames() {
		return {
			cloudIcon: 'Cloud icon',
		};
	}

	get timeouts() {
		return {
			xs: 5000,
			s: 10000,
			m: 30000,
			l: 60000,
		};
	}

	get credentials() {
		return {
			email: 'yomara.mora@clickbank.com',
			password: 'Fkvj)-+7D8TQzED',
		};
	}

	get testSuites() {
		return {
			syncOneLineOrders: 'Sync one line orders',
			syncMultilineLineOrders: 'Sync multiline orders',
			shippingNotice: 'Shipping notice',
			rebills: 'Rebills',
			orderPhoneNumber: 'Order phone number',
			refunds: 'Refunds',
		};
	}
}
module.exports = new CommonConstants();
