
module.exports = {

    // Set up `?modules=lebowski-pay` to include `./src/index`
    modules: {
        'lebowski-pay': './src/index'
    },

    // Set up a namespace for any module-specific build-time flags
    staticNamespace: 'LEBOWSKIPAY',

    // Set up a graphql request for config needed by this module
    config: `
        configuration {
            lebowskiPay {
                checkoutUrl
            }
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
        },

        partner: {
            // Enable feature A for partner XYZ
            XYZ: {
                FEATURE_A: true
            }
        },

        merchant: {
            // Enable feature B for merchant ABC
            ABC: {
                FEATURE_B: true
            } 
        }
    }
};