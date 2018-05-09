/* @flow */

export type LebowskiPayServerConfigType = {
    assetsUrl : string
};

export type LebowskiPayGlobalType = {
    serverConfig : LebowskiPayServerConfigType,
    featureFlags : {
        FEATURE_A : boolean,
        FEATURE_B : boolean,
        FEATURE_X : boolean,
        FEATURE_Y : boolean,
        FEATURE_Z : boolean
    }
};

