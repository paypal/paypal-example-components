/* @flow */

import { getClientID } from "@paypal/sdk-client/src";

export const ExamplePay = {
  render(options: {| buttonText: string |}, container: string) {
    if (!options.buttonText) {
      throw new Error(`Expected options.buttonText`);
    }

    const el = document.querySelector(container);

    if (!el) {
      throw new Error(`Can not find element: ${container}`);
    }

    el.innerHTML = `<button client-id=${getClientID()}>${
      options.buttonText
    }</button>`;
  },
};

export const EXAMPLE_CONSTANTS = {
  FOO: "FOO",
  BAR: "BAR",
};
