const mlog = require('mocha-logger');
const runtime = require('allure-mocha/runtime');
const BasePage = require('./base-page-helper');
const ContentType = require('allure-js-commons');
const waitHelper = require('./wait-helper');
const log = require('simple-node-logger').createSimpleLogger('project.log');

class logger extends BasePage {
	testCase(description) {
		const text = `Test case: ${description}`;
		log.info('=================================================================================');
		log.info(text);
		// runtime.allure.logStep(text);
	}

	testCaseId(id) {
		log.info(` > Stest casee => ${id}`);
		// runtime.allure.logStep(id);
	}

	stepNumber(stepNumber) {
		const text = `Step # ${stepNumber}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	step(stepDescription) {
		const text = `Step => ${stepDescription}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	verification(stepDescription) {
		const text = `Verification => ${stepDescription}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	subStep(stepDescription) {
		const text = `Sub step => ${stepDescription}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	subVerification(stepDescription) {
		const text = `Sub verification  => ${stepDescription}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	preCondition(stepDescription) {
		const text = `Pre -condition => ${stepDescription}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	postCondition(stepDescription) {
		const text = `Post - Condition => ${stepDescription}`;
		log.info(text);
		// runtime.allure.logStep(text);
	}

	async takePhoto() {
		try {
			const png = await driver.takeScreenshot();
			// await runtime.allure.createAttachment('Screenshot', new Buffer(png, 'base64'), 'image/png');
		} catch (e) {}
	}
}
module.exports = new logger();
