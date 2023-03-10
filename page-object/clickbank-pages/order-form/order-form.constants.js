class OrderFormConstants {
    get testData() {
        return {
            emailAddress: 'cypress@shopify.com',
            fullName: 'Test Automation',
            cardNumber: '4366 9777 9205 4925',
            securityCode: 112,
            expirationDate: 1123,
            streetAddress: '7 Butterfly',
            zipCode: '82442',
            city: 'Ontario'
        }
    }
}
module.exports = new OrderFormConstants();