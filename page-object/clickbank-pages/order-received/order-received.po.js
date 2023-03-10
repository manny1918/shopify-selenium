const BasePage = require("../../../components/base-page-helper");
const elementHelper = require("../../../components/element.helper");

class OrderReceivedPage extends BasePage {
    get elements() {
        return {
            orderNumber: elementHelper.webElement('.order-number')
        }
    }
}

module.exports = new OrderReceivedPage();