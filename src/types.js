/* @flow */

export type ExamplePayServerConfigType = {|
    assetsUrl : string
|};


export type ExamplePayGlobalType = {|
    serverConfig : ExamplePayServerConfigType
|};


declare var __example_pay__ : ExamplePayGlobalType;
