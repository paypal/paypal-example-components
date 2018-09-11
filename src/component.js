/* @flow */
/* eslint no-console: 0 */

export let featureX = __lebowski_pay__.featureFlags.FEATURE_X && (() => 'Feature X');
export let featureY = __lebowski_pay__.featureFlags.FEATURE_Y && (() => 'Feature Y');
export let featureZ = __lebowski_pay__.featureFlags.FEATURE_Z && (() => 'Feature Z');

export let LebowskiPay = {
    render(options : { buttonText : string }, container : string) {

        if (!options.buttonText) {
            throw new Error(`Expected options.buttonText`);
        }

        let el = document.querySelector(container);

        if (!el) {
            throw new Error(`Can not find element: ${ container }`);
        }

        el.innerHTML = `<button>${ options.buttonText }</button>`;
    }
};

export const LEBOWSKI_CONSTANTS = {
    FOO: 'FOO',
    BAR: 'BAR'
};
