/* @flow */

import { getKarmaConfig } from 'grumbler-scripts/config/karma.conf';
import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';

import type { LebowskiPayGlobalType } from './src/types';

let lebowskiPayGlobal : LebowskiPayGlobalType = {
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
                __lebowski_pay__: lebowskiPayGlobal
            }
        })
    }));
