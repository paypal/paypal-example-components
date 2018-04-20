/* @flow */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

export default (karma : Object) =>
    karma.set(getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  getWebpackConfig({
            vars: {
                __PAYPAL_BRAINTREE_QUERY_OPTIONS__: JSON.stringify({
                    merchantID: 'XYZ'
                }),

                __PAYPAL_BRAINTREE_SERVER_CONFIG__: JSON.stringify({
                    'lebowski-pay': {
                        clientConfiguration: {
                            assetsUrl: 'https://paypal.com/assets/'
                        }
                    }
                }),
                
                FEATURE_A: true,
                FEATURE_B: true,
                FEATURE_X: true,
                FEATURE_Y: true,
                FEATURE_Z: true
            }
        })
    }));
