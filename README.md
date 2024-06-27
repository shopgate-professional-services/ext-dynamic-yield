# Shopgate Connect - Extension dynamic-yield

The extension provides Dynamic Yield product recommendations via the Experience API.

See: https://dy.dev/reference/choosing-variations

The [@shopgate-project/product-recommendations](https://github.com/shopgate-professional-services/ext-product-recommendations) extension is required to display the recommendations in the frontend.

## Configuration

| key | type | description | example |
|---|---|---|---|
| apiKey | string | API auth key | `"f74h7879a2x9bc566fbecd366cd13fec89dd8i2188061156c70804161ffde08b"` |
| apiZone | string | API zone | `"com"` or `"eu"` |
| appLocation | string | App location | `"en_US"` or `"de_DE"` |
| pageTypes | array | Show recommendations on home page (widget) and/or on the PDP. If the array is empty, the page type "OTHER" is used. | `["PRODUCT", "HOMEPAGE"]` |
| campaignNames | array | Name of the campaigns | `["Mobile-App-Recs"]` |
| sendRequests | boolean | Send requests to Dynamic Yields for all devices | `true`

**Note:**

If `sendRequests` is set to `false`, the user can activate the requests by touching the header/logo for at least 5 seconds.

If the extension receives request options via extension `@shopgate-project/product-recommendations`, these options are given priority when processing the requests to Dynamic Yield.

**Example:**

```json
{
  "apiKey": "f74h7679a2c9bc566fbdcd366cd13fec89dd8i2188061156c70804189ffde08b",
  "apiZone": "com",
  "appLocation": "en_US",
  "pageTypes": [
    "PRODUCT"
  ],
  "campaignNames": [
    "Mobile-App-Recs"
  ],
  "sendRequests": false
}
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.


## License

Shopgate Cloud - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.

