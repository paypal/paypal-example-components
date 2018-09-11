/* @flow */

import '../src/index'; // eslint-disable-line import/no-unassigned-import

describe('Happy cases', () => {

    it('Should create an instance of the client and render LebowskiPay', () => {
        
        let body = document.body;
        if (!body) {
            throw new Error(`Expected document.body to be present`);
        }

        let container = document.createElement('div');
        container.id = 'lebowski-container';
        body.appendChild(container);

        window.paypal.LebowskiPay.render({
            buttonText: 'Pay Now'
        }, '#lebowski-container');

        let button = container.querySelector('button');
        if (!button) {
            throw new Error(`Expected button to be rendered`);
        }

        if (!button.innerText) {
            throw new Error(`Expected button to have text`);
        }

        if (button.innerText !== 'Pay Now') {
            throw new Error(`Expected button text to be "Pay Now", got "${ button.innerText.toString() }"`);
        }

        body.removeChild(container);
    });
});
