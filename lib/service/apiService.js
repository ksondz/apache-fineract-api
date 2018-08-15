

const requestPromise = require('request-promise');


/**
 * @type {module.ApiService}
 */
module.exports = class ApiService {


  constructor(config) {
    this.config = config;

    this.requestHeaders = {
      'Content-type': 'application/json',
      'Fineract-Platform-TenantId': 'default',
      Authorization: this.getBasicAuthorizationHeader(),
    };
  }


  /**
   * @param route
   * @param queryParams
   * @return {Promise<void>}
   */
  get(route, queryParams = {}) {
    const url = this.generateUrl(route);
    return requestPromise(this.getOptions(url, queryParams));
  }

  /**
   * @param route
   * @param queryParams
   * @param data
   * @return {Promise<void>}
   */
  post(route, queryParams = {}, data) {
    const url = this.generateUrl(route);
    return requestPromise(this.getOptions(url, queryParams, 'POST', data));
  }

  /**
   * @param url
   * @param queryParams
   * @param method
   * @param data
   * @return {{
   *  method: string,
   *  url: *,
   *  headers: ({
   *    "Content-type": string,
   *    "Fineract-Platform-TenantId": string,
   *    Authorization: string
   *  }|*),
   *  body,
   *  qs: *,
   *  json: boolean
   *}}
   */
  getOptions(url, queryParams = {}, method = 'GET', data = {}) {
    return {
      method,
      url,
      headers: this.requestHeaders,
      body: data,
      qs: queryParams,
      json: true,
    };
  }

  /**
   * @param route
   * @return {string}
   */
  generateUrl(route) {
    return `${this.config.host}${this.config.apiPath}${route}`;
  }

  /**
   * @return {string}
   */
  getBasicAuthorizationHeader() {
    const buffer = Buffer.from(`${this.config.username}:${this.config.password}`);

    return `Basic ${buffer.toString('base64')}`;
  }
};
