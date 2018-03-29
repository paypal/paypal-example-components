/* @flow */

import '../src/index'; // eslint-disable-line import/no-unassigned-import

describe('Error cases', () => {

    it('Should error out if buttonText is not passed to LebowskiPay', () => {

        let client = window.paypal.client();

        let error;

        try {
            client.LebowskiPay.render({}, 'body');
        } catch (err) {
            error = err;
        }

        if (!error) {
            throw new Error(`Expected LebowskiPay.render call to throw an error`);
        }
    });
});
