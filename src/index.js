
// Pull in the common client
import { attach } from 'paypal-braintree-web-client/src';

// Attach to public api
attach(({ clientOptions, clientConfig, serverConfig }) => {

    // Read from merchant-passed options
    console.log('Client tokens:', clientOptions.clientToken);

    // Set a shared client config key
    clientConfig.set('credit_fields_handled', true);

    // Read a shared client config key
    console.log('Config foo:', clientConfig.get('credit_fields_handled'));

    // Read a server config key
    console.log('Logger url', serverConfig.urls.logger);

    // Expose public apis
    return {

        LebowskiPay: {
            render(options, container) {
                document.querySelector(container).innerHTML = `<button>Pay with LebowskiPay!</button>`;
            }
        },

        LEBOWSKI_CONSTANTS: {
            FOO: 'FOO',
            BAR: 'BAR'
        }
    };

    // Now end-user can do:
    //
    // var client = paypal.client({
    //     env: 'sandbox',
    //     clientToken: {
    //         sandbox:    'abc',
    //         production: 'xyz'
    //     }
    // });
    //
    // client.LebowskiPay.render({
    //   someOption: client.LEBOWSKI_CONSTANTS.FOO
    // }, '#container');
});