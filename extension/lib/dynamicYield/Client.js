const { promisify } = require('util');

/**
 * Dynamic Yield Client class
 */
class Client {
  /**
   * @param {Object} config config
   */
  constructor(
    {
      config, device, storage, tracedRequest, log,
    }
  ) {
    this.baseUri = `https://dy-api.${config.apiZone}/v2/`;
    this.authKey = config.apiKey;
    this.location = config.appLocation;
    this.campaigns = config.campaignNames;
    this.pageTypes = config.pageTypes;
    this.sendRequests = config.sendRequests;

    this.deviceInfo = device.getInfo;
    this.storage = storage;
    this.tracedRequest = tracedRequest;
    this.log = log;
  }

  /**
   * Get variations from Dynamic Yield
   * @param {Object} params Params
   * @param {string} endpoint Endpoint
   *
   * @return {Array} productIds
   */
  async getChosenVariations(params, endpoint = 'serve/user/choose') {
    // activation for device only
    const requestActivation = await this.storage.device.get('requestActivation');

    if (this.sendRequests || requestActivation) {
      const itemSku = [];
      let pageType = 'HOMEPAGE';

      // fallback to 'OTHER'
      if (!this.pageTypes.includes(pageType)) {
        pageType = 'OTHER';
      }

      const campaignNames = (params.requestOptions && params.requestOptions.names) || [];
      const campaignPageType = (params.requestOptions && params.requestOptions.type) || '';

      // overwrite campaigns and page type with request options
      if (campaignNames.length && campaignPageType) {
        this.campaigns = campaignNames;
        pageType = campaignPageType;
      }

      if (params.type === 'product' && this.pageTypes.includes('PRODUCT')) {
        pageType = 'PRODUCT';
        itemSku.push(params.id);
      }

      // no campaign names are configured
      if (!this.campaigns.length) {
        return {
          productIds: [],
        };
      }

      // get session ids from storage
      const dySession = await this.storage.device.get('dySession');
      const dySessionId = dySession ? { dy: dySession.value } : {};

      // body request
      const bodyData = {
        selector: {
          names: this.campaigns,
        },
        user: {},
        session: dySessionId,
        context: {
          page: {
            type: pageType,
            location: '/app',
            locale: this.location,
            data: itemSku,
          },
          device: {
            ip: params.sgxsMeta.deviceIp,
          },
          store: {},
        },
        options: {
          isImplicitPageview: false,
          returnAnalyticsMetadata: false,
        },
      };

      try {
        const response = await this.request({ params }, bodyData, endpoint);

        // save cookie data to storage
        if (response.cookies) {
          const dyCookieSession = response.cookies.find(c => c.name === '_dyjsession');
          this.storage.device.set('dySession', dyCookieSession.value);
        }

        // campaign exists and has variations
        if (response.choices && response.choices.length && response.choices[0].variations) {
          const dyChoices = response.choices[0];

          if (dyChoices.variations.length && dyChoices.variations[0].payload.data) {
            const { data } = dyChoices.variations[0].payload;
            const productSkus = [];

            // get SKUs from DY response
            if (data.slots) {
              data.slots.map(
                slot => productSkus.push(slot.sku)
              );
            }

            return {
              productIds: productSkus,
            };
          }
        }
      } catch (e) {
        this.log.error(e.stack, 'Dynamic Yield error');
      }
    }

    return {
      productIds: [],
    };
  }

  /**
   * Request to Dynamic Yield Experience API
   * @param {Object} params params
   * @param {Object} bodyData body data
   * @param {string} endpoint endpoint
   *
   * @return {string}
   */
  async request(params, bodyData, endpoint) {
    const response = await promisify(this.tracedRequest('Dynamic Yield'))({
      uri: this.baseUri + endpoint,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'dy-api-key': this.authKey,
      },
      body: bodyData,
      json: true,
    });

    if (response.statusCode >= 400) {
      this.log.error(
        {
          body: response.body,
          request: params,
          endpoint,
        },
        `Dynamic Yield error code ${response.statusCode} in response`
      );
    }

    return response.body;
  }
}

module.exports = Client;
