

const requestPromise = require('request-promise');

const ErrorService = require('./errorService');


/**
 * @type {module.ApiService}
 */
module.exports = class ApiService {


  constructor(config) {
    this.config = config;
    this.errorService = new ErrorService();

    this.requestHeaders = {
      'Content-type': 'application/json',
      'Fineract-Platform-TenantId': 'default',
    };
  }


  /**
   * @param route
   * @param queryParams
   */
  get(route, queryParams = {}) {
    const url = this.generateUrl(route);
    return requestPromise(this.getOptions(url, queryParams)).catch((err) => {
      throw this.errorService.parseError(err);
    });
  }

  /**
   * @param route
   * @param queryParams
   * @param data
   * @return {Promise<void>}
   */
  post(route, queryParams = {}, data) {
    const url = this.generateUrl(route);

    return requestPromise(this.getOptions(url, queryParams, 'POST', data)).catch((err) => {
      throw this.errorService.parseError(err);
    });
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
      auth: this.getBasicAuth(),
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
  getBasicAuth() {
    return {
      username: this.config.username,
      password: this.config.password,
    };
  }
};
