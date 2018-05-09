/* @flow */
/* eslint no-console: 0 */

// Pull in the common client
import { attach } from 'paypal-braintree-web-client/src';

// Attach to public api
attach('lebowski-pay', ({ clientOptions }) => {

    if (typeof __lebowski_pay__ === 'undefined' || typeof __sdk__ === 'undefined') {
        throw new TypeError(`Expected to be run in server-mode only`);
    }

    console.log('Server config:', __lebowski_pay__.serverConfig);

    let featureX = __lebowski_pay__.featureFlags.FEATURE_X && (() => 'Feature X');
    let featureY = __lebowski_pay__.featureFlags.FEATURE_Y && (() => 'Feature Y');
    let featureZ = __lebowski_pay__.featureFlags.FEATURE_Z && (() => 'Feature Z');

    let assetsUrl = __lebowski_pay__.serverConfig.assetsUrl;
    let clientID = __sdk__.queryOptions.clientID;

    let { env = 'production', auth } = clientOptions;
    
    // Expose public apis
    return {

        LebowskiPay: {
            render(options, container) {

                if (!env) {
                    throw new Error(`Expected env`);
                }

                if (!auth || auth[env] !== 'LET_ME_IN') {
                    throw new Error(`Invalid auth`);
                }

                if (!options.buttonText) {
                    throw new Error(`Expected options.buttonText`);
                }

                if (!assetsUrl) {
                    throw new Error(`Expected assetsUrl to be present`);
                }

                document.querySelector(container).innerHTML =
                    `<button data-client-id="${ clientID }">${ options.buttonText }</button>`;
            }
        },

        LEBOWSKI_CONSTANTS: {
            FOO: 'FOO',
            BAR: 'BAR'
        },

        featureX,
        featureY,
        featureZ
    };

    // Now end-user can do:
    //
    // var client = paypal.client({
    //     env: 'sandbox',
    //     auth: {
    //         sandbox:    'abc',
    //         production: 'xyz'
    //     }
    // });
    //
    // client.LebowskiPay.render({
    //   someOption: client.LEBOWSKI_CONSTANTS.FOO
    // }, '#container');
});
