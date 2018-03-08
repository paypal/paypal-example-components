/* @flow */

export const DATE_FEATURES = {

    // Deprecate feature X from 2017/06/23 onwards
    2017_06_23: {
        FEATURE_X: false
    },

    // Enable feature Y from 2018/02/09 onwards
    2018_02_09: {
        FEATURE_Y: true
    }
};

export const COUNTRY_FEATURES = {

    // Enable feature Z for FR
    FR: {
        FEATURE_Z: true
    }
};

export const MERCHANT_FEATURES = {

    // Enable feature B for merchant ABC
    ABC: {
        FEATURE_B: true
    }
};

export const PARTNER_FEATURES = {

    // Enable feature A for partner XYZ
    XYZ: {
        FEATURE_A: true
    }
};