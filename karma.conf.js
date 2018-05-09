/* @flow */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';
import type { SDKGlobalType } from 'paypal-braintree-web-client/src/types';

import type { LebowskiPayGlobalType } from './src/types';

let sdkGlobal: SDKGlobalType = {
    queryOptions: {
        env:    'test',
        locale: {
            country: 'US',
            lang:    'en'
        },
        merchantID: 'XXXXXXX',
        components: [ 'hosted-fields' ]
    }
};

let lebowskiPayGlobal: LebowskiPayGlobalType = {
    serverConfig: {
        assetsUrl: 'https://paypal.com/assets/'
    },
    featureFlags: {
        FEATURE_A: true,
        FEATURE_B: true,
        FEATURE_X: true,
        FEATURE_Y: true,
        FEATURE_Z: true
    }
};

export default (karma : Object) =>
    karma.set(getKarmaConfig(karma, {
        basePath: __dirname,
        webpack:  getWebpackConfig({
            vars: {
                __sdk__:          sdkGlobal,
                __lebowski_pay__: lebowskiPayGlobal
            }
        })
    }));
