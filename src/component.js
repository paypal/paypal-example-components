/* @flow */
/* eslint no-console: 0 */

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
