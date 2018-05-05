/* @flow */
/* eslint import/no-commonjs: 0 */

module.exports = {

    'lebowski-pay': {
        entry: './src/index',

        // Set up a namespace for any module-specific build-time flags
        staticNamespace: '__lebowski_pay__',

        // Set up a graphql config query
        configQuery: `
            clientConfiguration {
                assetsUrl
            }
        `,

        // Configure features specific to this module
        features: {

            date: {
                // Deprecate feature X from 2017/06/23 onwards
                '2017-06-23': {
                    FEATURE_X: false
                },

                // Enable feature Y from 2018/02/09 onwards
                '2018-02-09': {
                    FEATURE_Y: true
                }
            },

            country: {
                // Enable feature Z for FR
                FR: {
                    FEATURE_Z: true
                }
            }
        }
    }
};
