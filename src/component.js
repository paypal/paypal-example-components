/* @flow */
/* eslint no-console: 0 */

// Pull in the common client
import { attach } from 'paypal-braintree-web-client/src';

// Attach to public api
attach('lebowski-pay', ({ clientOptions, serverConfig, queryOptions }) => {

    let featureA = FEATURE_A && (() => 'Feature A');
    let featureB = FEATURE_B && (() => 'Feature B');
    let featureX = FEATURE_X && (() => 'Feature X');
    let featureY = FEATURE_Y && (() => 'Feature Y');
    let featureZ = FEATURE_Z && (() => 'Feature Z');

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

                if (!serverConfig.clientConfiguration.assetsUrl) {
                    throw new Error(`Expected assetsUrl to be present`);
                }

                document.querySelector(container).innerHTML =
                    `<button data-merchant-id=${ queryOptions.merchantID }>${ options.buttonText }</button>`;
            }
        },

        log() {
            fetch(serverConfig.urls.logger, {
                body: 'lebowski-log'
            });
        },

        LEBOWSKI_CONSTANTS: {
            FOO: 'FOO',
            BAR: 'BAR'
        },

        featureA,
        featureB,
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
