PayPal/Braintree Example Component
----------------------------------

Example standalone component to be included in unified PayPal/Braintree client SDK

### Quick start

See [src/index.js](./src/index.js)

#### Tests

- Run the tests:

  ```bash
  npm test
  ```

#### Testing with different/multiple browsers

```bash
npm run karma -- --browser=PhantomJS
npm run karma -- --browser=Chrome
npm run karma -- --browser=Safari
npm run karma -- --browser=Firefox
npm run karma -- --browser=PhantomJS,Chrome,Safari,Firefox
```

#### Keeping the browser open after tests

```bash
npm run karma -- --browser=Chrome --keep-open
```

#### Releasing and Publishing

- Publish your code with a patch version: 

```bash
npm run release
```

- Or `npm run release:patch`, `npm run release:minor`, `npm run release:major`

### Module structure

- `/src` - any code which should be transpiled, published, and end up in production
- `/test` - karma tests for everything in `/src`
- `__sdk__.js` - metadata for compiling and bundling the final component

#### `/src/component.js`

This module uses `paypal-braintree-web-client` to accept configuration and merchant options,
and expose a public interface.

```javascript
// Pull in the shared web client
import { attach } from 'paypal-braintree-web-client/src';

// Attach to public api
attach(({ clientOptions, clientConfig, serverConfig, queryOptions }) => {

    // Expose public apis
    return {

        LebowskiPay: {
            render(options) {
                ...
            }
        }
    };
});
```

Then the integrating site can run:

```javascript
var client = paypal.client({ ... });
client.LebowskiPay.render({ ... });
```

- `clientOptions` - Options passed by the merchant to `paypal.client()`
- `clientConfig` - Internal client-side configuration, shared with other components to help inform rendering decisions.
- `serverConfig` - Server-side configuration, following the structure defined in `configQuery` in `__sdk__.js`
- `queryOptions` - Options passed in the query string for the sdk javascript file

#### `/__sdk__.js`

`__sdk__.js` defines any metadata which helps the sdk server compile and serve up the component.

```javascript
export default {

    /**
     * Define the top-level module names and their entry points.
     * 
     * In this example, the config has the following effects:
     * - The script tag can pass ?modules=lebowski-pay in the script src
     * - Everything exported by `./src/index` will be included in the
     *   final generated script
     */

    modules: {
        'lebowski-pay': './src/index'
    },
    
    /**
     * Define a static namespace for feature flags.
     * 
     * For example:
     * - `features` config sets `FEATURE_Y: true`
     * - Code can now reference `if (LEBOWSKIPAY.FEATURE_Y) { ... }`
     * 
     * This is a *build-time* namespace and will not be available at run-time.
     */

    staticNamespace: 'LEBOWSKIPAY',

    /**
     * Define configuration required by this module
     * 
     * - This should be in the form of a graphql query.
     * - The query will be merged with queries defined by other modules
     * - The final config will be passed as `serverConfig` in `./src/index` 
     */

    configQuery: `
        configuration {
            lebowskiPay {
                checkoutUrl
            }
        }
    `,

    /**
     * Define feature flags based on date, country, partner and merchant
     * 
     * - These feature flags will be merged on the server and available
     *   under `LEBOWSKIPAY`, e.g. `if (LEBOWSKIPAY.FEATURE_Y) { ... }`
     * - Date-based feature flags will take the initial date of integration
     *   for a given merchant. This can be overriden in the sdk url by passing
     *   `?date=2018/04/01`.
     * - These flags are available at *build-time* on the server-side, any any
     *   negative conditions will be stripped out of the final bundle.
     */

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
```


### FAQ

- **Why is there no webpack config, dist folder, or npm build command?**
  
  This module (and modules like it) are not intended to be built as standalone components. It will be pulled in and compiled/bundled on the server-side, then combined with other modules.

- **When should I publish?**
  
  When you publish, you're signing off on your changes being code-complete, fully tested, and ready for release. Publishing **will not immediately trigger a deploy**, but please only publish changes which are in a deployable state.

- **Can I define multiple components in one repo?**

  Absolutely. `__sdk__.js` allows defining multiple entry points. These should generally represent different logical ui components, with separate concerns, and loose coupling. For example:

  ```javascript
  modules: {
    'lebowski-pay': './src/components/lebowski-pay',
    'walter-pay': './src/components/walter-pay',
    'donnie-pay': './src/components/donnie-pay'
  },
  ```

  Please bear in mind that this opens the door to any combination or permutation of these modules to be requested by the merchant -- hence the need for loose coupling. `donnie-pay` should not have a hard dependency on `lebowski-pay` being present.

- **Where is all of the karma, webpack, eslint, etc. config coming from?**

  This module uses `grumbler-scripts` as a common source of configuration and defaults. Any of these can be overriden, either partially, or entirely, depending on the individual needs of the module. You'll notice `.eslintrc.js`, `karma.conf.js`, etc. are lightweight wrappers which only define module-specific overrides.
