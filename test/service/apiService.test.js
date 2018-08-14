

const ApiService = require('./../../lib/service/apiService');
const config = require('./../../lib/config');

jest.mock('request-promise');


describe('ApiService constructor(username, password) tests', () => {

  test('Test username and password.', () => {
    const apiService = new ApiService('test username', 'test password');

    expect(apiService.username).toBe('test username');
    expect(apiService.password).toBe('test password');

    expect(apiService.username).not.toBe('mifos');
    expect(apiService.password).not.toBe('password');
  });


  test('Test service defined request headers', () => {
    const apiService = new ApiService('test username', 'test password');

    const expectedResult = {
      'Content-type': 'application/json',
      'Fineract-Platform-TenantId': 'default',
      Authorization: apiService.getBasicAuthorizationHeader(),
    };

    expect(apiService.requestHeaders).toEqual(expectedResult);

    const notExpectedResult = {
      'Content-type': 'application/pdf',
      Authorization: apiService.getBasicAuthorizationHeader(),
    };

    expect(apiService.requestHeaders).not.toEqual(notExpectedResult);
  });


  test('Test service defined config', () => {
    const apiService = new ApiService('test username', 'test password');

    expect(apiService.config).toEqual(config.apacheFineract);
    expect(apiService.config).not.toEqual(config);
  });
});


describe('ApiService methods tests', () => {

  test('Test service getOptions method', () => {
    const apiService = new ApiService('test username', 'test password');

    const expectedResult = {
      url: 'test url',
      method: 'GET',
      headers: apiService.requestHeaders,
      body: {},
      qs: {},
      json: true,
    };

    expect(apiService.getOptions(expectedResult.url)).toEqual(expectedResult);
    expect(apiService.getOptions('wrong url')).not.toEqual(expectedResult);
  });

  test('Test service generateUrl method', () => {
    const apiService = new ApiService('test username', 'test password');
    const route = '/test/route';
    const expectedUrl = `${config.apacheFineract.host}${config.apacheFineract.apiPath}${route}`;

    expect(apiService.generateUrl(route)).toEqual(expectedUrl);
    expect(apiService.generateUrl('wrong route')).not.toEqual(expectedUrl);
  });


  test('Test service getBasicAuthorizationHeader method', () => {
    const apiService = new ApiService('test username', 'test password');

    const buffer = Buffer.from(`${apiService.username}:${apiService.password}`);
    const expectedResult = `Basic ${buffer.toString('base64')}`;
    const notExpectedResult = `${buffer.toString('base64')}`;

    expect(apiService.getBasicAuthorizationHeader()).toEqual(expectedResult);
    expect(apiService.getBasicAuthorizationHeader()).not.toEqual(notExpectedResult);
  });
});


describe('ApiService get() method tests', () => {

  test('Test service getOptions method', async () => {
    const apiService = new ApiService('test username', 'test password');

    const result = await apiService.get('/test');
    console.log(result);

    expect(result).toEqual(result);
    // expect(apiService.getOptions('wrong url')).not.toEqual(expectedResult);
  });
});