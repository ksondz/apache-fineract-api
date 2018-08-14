

const config = require('./config');

const ApiService = require('./service/apiService');


module.exports = class Core {

  /**
   * @param username
   * @param password
   */
  constructor(username = 'mifos', password = 'password') {
    this.apiService = new ApiService(username, password);
    this.routesConfig = config.apacheFineract.routes;
  }


  /**
   * Create a new client
   * @param data
   * @return {Promise<void|null>}
   */
  async createClient(data) {
    const result = await this.apiService.post(this.routesConfig.client.path, {}, data);
    return result || null;
  }

  /**
   * Retrieve clients
   * @param options
   * @return {Promise<void|null>}
   */
  async retrieveClients(options) {
    const result = await this.apiService.get(this.routesConfig.client.path, options);
    return result || null;
  }

  /**
   * Retrieve client
   * @param clientId
   * @param options
   * @return {Promise<void|null>}
   */
  async retrieveClient(clientId, options) {
    const result = await this.apiService.get(`${this.routesConfig.client.path}/${clientId}`, options);
    return result || null;
  }

  /**
   * Create a new load product
   * @param data
   * @return {Promise<void|null>}
   */
  async createLoanProduct(data) {
    const result = await this.apiService.post(this.routesConfig.loanProducts.path, {}, data);
    return result || null;
  }

  /**
   * Retrieve loan products
   * @param options
   * @return {Promise<void|null>}
   */
  async retrieveLoanProducts(options) {
    const result = await this.apiService.get(this.routesConfig.loanProducts.path, options);
    return result || null;
  }

  /**
   * Retrieve loan product
   * @param productId
   * @param options
   * @return {Promise<void|null>}
   */
  async retrieveLoanProduct(productId, options) {
    const result = await this.apiService.get(`${this.routesConfig.loanProducts.path}/${productId}`, options);
    return result || null;
  }


  /**
   * Create a new loan application
   * @param data
   * @return {Promise<void|null>}
   */
  async createLoanApplication(data) {
    const result = await this.apiService.post(this.routesConfig.loan.path, {}, data);
    return result || null;
  }

  /**
   * Approve loan application
   * @param data
   * @return {Promise<void|null>}
   */
  async approveLoanApplication(data) {
    const result = await this.apiService.post(this.routesConfig.loan.path, { command: 'approve' }, data);
    return result || null;
  }

  /**
   * Reject loan application
   * @param data
   * @return {Promise<void|null>}
   */
  async rejectLoanApplication(data) {
    const result = await this.apiService.post(this.routesConfig.loan.path, { command: 'reject' }, data);
    return result || null;
  }

  /**
   * Withdraw loan application
   * @param data
   * @return {Promise<void|null>}
   */
  async withdrawLoanApplication(data) {
    const result = await this.apiService.post(this.routesConfig.loan.path, { command: 'withdrawnByApplicant' }, data);
    return result || null;
  }

  /**
   * Retrieve loan applications
   * @param options
   * @return {Promise<void|null>}
   */
  async retrieveLoanApplications(options) {
    const result = await this.apiService.get(this.routesConfig.loan.path, options);
    return result || null;
  }

  /**
   * Retrieve loan application
   * @param loanId
   * @param options
   * @return {Promise<void|null>}
   */
  async retrieveLoanApplication(loanId, options) {
    const result = await this.apiService.get(`${this.routesConfig.loan.path}/${loanId}`, options);
    return result || null;
  }
};
