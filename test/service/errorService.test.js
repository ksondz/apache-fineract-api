

const ErrorService = require('./../../lib/service/errorService');


describe('ErrorService tests', () => {


  test('Test service statusDetails. Positive test', () => {
    const errorService = new ErrorService();
    expect(errorService.statusDetails).toHaveProperty([ErrorService.BAD_REQUEST_STATUS]);
    expect(errorService.statusDetails).toHaveProperty([ErrorService.AUTHENTICATION_STATUS]);
    expect(errorService.statusDetails).toHaveProperty([ErrorService.UNAUTHORIZED_STATUS]);
    expect(errorService.statusDetails).toHaveProperty([ErrorService.RESOURCE_NOT_FOUND_STATUS]);
    expect(errorService.statusDetails).toHaveProperty([ErrorService.SERVER_ERROR_STATUS]);
  });


  test('Test service statusDetails. Negative test', () => {
    const errorService = new ErrorService();
    expect(errorService.statusDetails).not.toHaveProperty([402]);
  });


  test('Test service defaultServerErrorMessage. Positive test', () => {
    const errorService = new ErrorService();
    expect(errorService.defaultServerErrorMessage).toEqual('Internal server error');
  });


  test('Test service defaultServerErrorMessage. Negative test', () => {
    const errorService = new ErrorService();
    expect(errorService.defaultServerErrorMessage).not.toEqual('Server error');
  });

});
