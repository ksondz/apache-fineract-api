

const ApiService = require('./service/apiService');
const mainConfig = require('./config');


/**
 * @type {module.Core}
 */
module.exports = class Core {


  /**
   * @param options
   */
  constructor(options = {}) {
    this.__initConfigOptions(options);
    this.apiService = new ApiService(this.config.apacheFineract);
  }


  /**
   * Create a new client
   * @param data
   * @return {Promise<void>}
   */
  createClient(data) {
    return this.apiService.post(this.__getRoutesConfig().client.path, {}, data);
  }

  /**
   * Retrieve clients
   * @param options
   * @return {Promise<void>}
   */
  retrieveClients(options) {
    return this.apiService.get(this.__getRoutesConfig().client.path, options);
  }

  /**
   * Retrieve client
   * @param clientId
   * @param options
   * @return {Promise<void>}
   */
  retrieveClient(clientId, options) {
    return this.apiService.get(`${this.__getRoutesConfig().client.path}/${clientId}`, options);
  }

  /**
   * Create a new load product
   * @param data
   * @return {Promise<void>}
   */
  createLoanProduct(data) {
    return this.apiService.post(this.__getRoutesConfig().loanProducts.path, {}, data);
  }

  /**
   * Retrieve loan products
   * @param options
   * @return {Promise<void>}
   */
  retrieveLoanProducts(options) {
    return this.apiService.get(this.__getRoutesConfig().loanProducts.path, options);
  }

  /**
   * Retrieve loan product
   * @param productId
   * @param options
   * @return {Promise<void>}
   */
  retrieveLoanProduct(productId, options) {
    return this.apiService.get(`${this.__getRoutesConfig().loanProducts.path}/${productId}`, options);
  }

  /**
   * Create a new loan application
   * @param data
   * @return {Promise<void>}
   */
  createLoanApplication(data) {
    return this.apiService.post(this.__getRoutesConfig().loan.path, {}, data);
  }

  /**
   * Approve loan application
   * @param data
   * @return {Promise<void>}
   */
  approveLoanApplication(data) {
    return this.apiService.post(this.__getRoutesConfig().loan.path, { command: 'approve' }, data);
  }

  /**
   * Reject loan application
   * @param data
   * @return {Promise<void>}
   */
  rejectLoanApplication(data) {
    return this.apiService.post(this.__getRoutesConfig().loan.path, { command: 'reject' }, data);
  }

  /**
   * Withdraw loan application
   * @param data
   * @return {Promise<void>}
   */
  withdrawLoanApplication(data) {
    return this.apiService.post(this.__getRoutesConfig().loan.path, { command: 'withdrawnByApplicant' }, data);
  }

  /**
   * Retrieve loan applications
   * @param options
   * @return {Promise<void>}
   */
  retrieveLoanApplications(options) {
    return this.apiService.get(this.__getRoutesConfig().loan.path, options);
  }

  /**
   * Retrieve loan application
   * @param loanId
   * @param options
   * @return {Promise<void>}
   */
  retrieveLoanApplication(loanId, options) {
    return this.apiService.get(`${this.__getRoutesConfig().loan.path}/${loanId}`, options);
  }

  /**
   * @param options
   * @private
   */
  __initConfigOptions(options = {}) {
    this.config = mainConfig;

    if (options.username) {
      this.config.apacheFineract.username = options.username;
    }

    if (options.password) {
      this.config.apacheFineract.password = options.password;
    }
  }

  /**
   * @return {{client: {path: string}, loanProducts: {path: string}, loan: {path: string}}}
   * @private
   */
  __getRoutesConfig() {
    return this.config.apacheFineract.routes;
  }
};
