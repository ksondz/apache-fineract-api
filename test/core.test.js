

const Core = require('./../lib/core');

jest.mock('./../lib/service/apiService');
const ApiService = require('./../lib/service/apiService');

let mockedApiService;

describe('Core tests', () => {

  beforeEach(() => {
    mockedApiService = new ApiService();

    mockedApiService.post.mockImplementation((path, queryParams, data) => {
      return { path, queryParams, data };
    });

    mockedApiService.get.mockImplementation((path, queryParams) => {
      return { path, queryParams };
    });
  });

  test('Test constructor options. Positive test', () => {
    const options = { username: 'testUsername', password: 'testPassword' };
    const core = new Core(options);

    expect(core.config.apacheFineract.username).toEqual(options.username);
    expect(core.config.apacheFineract.password).toEqual(options.password);
  });


  test('Test constructor options. Negative test', () => {
    const options = { username: 'username', password: 'password' };
    const core = new Core();

    expect(core.config.apacheFineract.username).not.toEqual(options.username);
    expect(core.config.apacheFineract.password).not.toEqual(options.password);
  });


  test('Test createClient method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const data = { name: 'test name' };
    const result = core.createClient(data);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');
    expect(result).toHaveProperty('data');

    expect(result.path).toEqual(core.config.apacheFineract.routes.client.path);
    expect(result.queryParams).toEqual({});
    expect(result.data).toEqual(data);
  });


  test('Test createClient method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const data = { name: 'test name' };
    const result = core.createClient(data);

    expect(result).not.toHaveProperty('url');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual(data);
    expect(result.data).not.toEqual({});
  });


  test('Test retrieveClients method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const queryParams = { limit: 10 };
    const result = core.retrieveClients(queryParams);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');

    expect(result.path).toEqual(core.config.apacheFineract.routes.client.path);
    expect(result.queryParams).toEqual(queryParams);
  });


  test('Test retrieveClients method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const queryParams = { limit: 10 };
    const result = core.retrieveClients(queryParams);

    expect(result).not.toHaveProperty('url');
    expect(result).not.toHaveProperty('data');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({});
  });


  test('Test retrieveClient method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const clientId = 1;
    const result = core.retrieveClient(clientId);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');

    expect(result.path).toEqual(`${core.config.apacheFineract.routes.client.path}/${clientId}`);
    expect(result.queryParams).toEqual({});
  });


  test('Test retrieveClient method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const clientId = 1;
    const result = core.retrieveClient(clientId);

    expect(result).not.toHaveProperty('url');
    expect(result).not.toHaveProperty('data');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({ fields: 'name' });
  });


  test('Test createLoanProduct method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const data = { name: 'test name' };
    const result = core.createLoanProduct(data);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');
    expect(result).toHaveProperty('data');

    expect(result.path).toEqual(core.config.apacheFineract.routes.loanProducts.path);
    expect(result.queryParams).toEqual({});
    expect(result.data).toEqual(data);
  });


  test('Test createLoanProduct method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const data = { name: 'test name' };
    const result = core.createLoanProduct(data);

    expect(result).not.toHaveProperty('url');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual(data);
    expect(result.data).not.toEqual({});
  });


  test('Test retrieveLoanProducts method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const queryParams = { limit: 10 };
    const result = core.retrieveLoanProducts(queryParams);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');

    expect(result.path).toEqual(core.config.apacheFineract.routes.loanProducts.path);
    expect(result.queryParams).toEqual(queryParams);
  });


  test('Test retrieveLoanProducts method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const queryParams = { limit: 10 };
    const result = core.retrieveLoanProducts(queryParams);

    expect(result).not.toHaveProperty('url');
    expect(result).not.toHaveProperty('data');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({});
  });


  test('Test retrieveLoanProduct method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const productId = 1;
    const result = core.retrieveLoanProduct(productId);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');

    expect(result.path).toEqual(`${core.config.apacheFineract.routes.loanProducts.path}/${productId}`);
    expect(result.queryParams).toEqual({});
  });


  test('Test retrieveLoanProduct method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const productId = 1;
    const result = core.retrieveLoanProduct(productId);

    expect(result).not.toHaveProperty('url');
    expect(result).not.toHaveProperty('data');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({ fields: 'name' });
  });


  test('Test createLoanApplication method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const data = { name: 'test name' };
    const result = core.createLoanApplication(data);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');
    expect(result).toHaveProperty('data');

    expect(result.path).toEqual(core.config.apacheFineract.routes.loan.path);
    expect(result.queryParams).toEqual({});
    expect(result.data).toEqual(data);
  });


  test('Test createLoanApplication method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const data = { name: 'test name' };
    const result = core.createLoanApplication(data);

    expect(result).not.toHaveProperty('url');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual(data);
    expect(result.data).not.toEqual({});
  });


  test('Test approveLoanApplication method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const data = { approvedOnDate: '01 December 2016 00:00' };
    const result = core.approveLoanApplication(loanId, data);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');
    expect(result).toHaveProperty('data');

    expect(result.path).toEqual(`${core.config.apacheFineract.routes.loan.path}/${loanId}`);
    expect(result.queryParams).toEqual({ command: 'approve' });
    expect(result.data).toEqual(data);
  });


  test('Test approveLoanApplication method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const data = { approvedOnDate: '01 December 2016 00:00' };
    const result = core.approveLoanApplication(loanId);

    expect(result).not.toHaveProperty('url');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({});
    expect(result.data).not.toEqual(data);
  });


  test('Test rejectLoanApplication method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const data = { rejectedOnDate: '01 December 2016 00:00' };
    const result = core.rejectLoanApplication(loanId, data);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');
    expect(result).toHaveProperty('data');

    expect(result.path).toEqual(`${core.config.apacheFineract.routes.loan.path}/${loanId}`);
    expect(result.queryParams).toEqual({ command: 'reject' });
    expect(result.data).toEqual(data);
  });


  test('Test rejectLoanApplication method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const data = { rejectedOnDate: '01 December 2016 00:00' };
    const result = core.rejectLoanApplication(loanId);

    expect(result).not.toHaveProperty('url');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({});
    expect(result.data).not.toEqual(data);
  });


  test('Test withdrawLoanApplication method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const data = { withdrawnOnDate: '01 December 2016 00:00' };
    const result = core.withdrawLoanApplication(loanId, data);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');
    expect(result).toHaveProperty('data');

    expect(result.path).toEqual(`${core.config.apacheFineract.routes.loan.path}/${loanId}`);
    expect(result.queryParams).toEqual({ command: 'withdrawnByApplicant' });
    expect(result.data).toEqual(data);
  });


  test('Test withdrawLoanApplication method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const data = { withdrawnOnDate: '01 December 2016 00:00' };
    const result = core.withdrawLoanApplication(loanId);

    expect(result).not.toHaveProperty('url');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({});
    expect(result.data).not.toEqual(data);
  });


  test('Test retrieveLoanApplications method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const queryParams = { limit: 10 };
    const result = core.retrieveLoanApplications(queryParams);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');

    expect(result.path).toEqual(core.config.apacheFineract.routes.loan.path);
    expect(result.queryParams).toEqual(queryParams);
  });


  test('Test retrieveLoanApplications method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const queryParams = { limit: 10 };
    const result = core.retrieveLoanApplications(queryParams);

    expect(result).not.toHaveProperty('url');
    expect(result).not.toHaveProperty('data');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({});
  });


  test('Test retrieveLoanApplication method. Positive test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const result = core.retrieveLoanApplication(loanId);

    expect(result).toHaveProperty('path');
    expect(result).toHaveProperty('queryParams');

    expect(result.path).toEqual(`${core.config.apacheFineract.routes.loan.path}/${loanId}`);
    expect(result.queryParams).toEqual({});
  });


  test('Test retrieveLoanApplication method. Negative test', () => {
    const core = new Core();

    core.apiService = mockedApiService;

    const loanId = 1;
    const result = core.retrieveLoanApplication(loanId);

    expect(result).not.toHaveProperty('url');
    expect(result).not.toHaveProperty('data');

    expect(result.path).not.toEqual('/test');
    expect(result.queryParams).not.toEqual({ fields: 'name' });
  });


  test('Test __initConfigOptions method. Positive test', () => {
    const options = { username: 'newUserName', password: 'newPassword' };
    const core = new Core();

    core.__initConfigOptions(options);

    expect(core.config.apacheFineract.username).toEqual(options.username);
    expect(core.config.apacheFineract.password).toEqual(options.password);
  });


  test('Test __initConfigOptions method. Negative test', () => {
    const options = { username: 'testUsername', password: 'testPassword' };
    const core = new Core();

    core.__initConfigOptions();

    expect(core.config.apacheFineract.username).not.toEqual(options.username);
    expect(core.config.apacheFineract.password).not.toEqual(options.password);
  });
});
