

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


  test('Test service createError. Positive test', () => {
    const errorService = new ErrorService();

    const statusCode = ErrorService.BAD_REQUEST_STATUS;
    const message = 'internal message';

    let parsedError = errorService.createError(message, statusCode);

    expect(parsedError.status).toEqual(statusCode);
    expect(parsedError.message).toEqual(message);
    expect(parsedError.details).toEqual(errorService.statusDetails[statusCode]);

    parsedError = errorService.createError();

    expect(parsedError.status).toEqual(ErrorService.SERVER_ERROR_STATUS);
    expect(parsedError.message).toEqual('');
    expect(parsedError.details).toEqual(errorService.statusDetails[ErrorService.SERVER_ERROR_STATUS]);
  });


  test('Test service createError. Negative test', () => {
    const errorService = new ErrorService();

    const statusCode = ErrorService.BAD_REQUEST_STATUS;
    const message = 'internal message';

    let parsedError = errorService.createError(message, statusCode);

    expect(parsedError.status).not.toEqual(ErrorService.SERVER_ERROR_STATUS);
    expect(parsedError.message).not.toEqual('');
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.SERVER_ERROR_STATUS]);

    parsedError = errorService.createError();

    expect(parsedError.status).not.toEqual(statusCode);
    expect(parsedError.message).not.toEqual(message);
    expect(parsedError.details).not.toEqual(errorService.statusDetails[statusCode]);
  });


  test('Test service parseError. Positive test', () => {
    const errorService = new ErrorService();

    let err = { statusCode: ErrorService.BAD_REQUEST_STATUS };
    let parsedError = errorService.parseError(err);
    expect(parsedError.status).toEqual(err.statusCode);
    expect(parsedError.message).toEqual(errorService.defaultServerErrorMessage);
    expect(parsedError.details).toEqual(errorService.statusDetails[err.statusCode]);

    err = { statusCode: ErrorService.BAD_REQUEST_STATUS, message: 'internal message' };
    parsedError = errorService.parseError(err);
    expect(parsedError.status).toEqual(err.statusCode);
    expect(parsedError.message).toEqual(err.message);
    expect(parsedError.details).toEqual(errorService.statusDetails[err.statusCode]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        defaultUserMessage: 'custom defaultUserMessage',
        errors: [
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).toEqual(err.statusCode);
    expect(parsedError.message).toEqual(err.error.defaultUserMessage);
    expect(parsedError.details).toEqual(errorService.statusDetails[err.statusCode]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        developerMessage: 'custom developerMessage',
        errors: [
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).toEqual(err.statusCode);
    expect(parsedError.message).toEqual(err.error.developerMessage);
    expect(parsedError.details).toEqual(errorService.statusDetails[err.statusCode]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        defaultUserMessage: 'Validation errors exist.',
        errors: [
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).toEqual(err.statusCode);
    expect(parsedError.message).toEqual(err.message);
    expect(parsedError.details).toEqual(errorService.statusDetails[err.statusCode]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        defaultUserMessage: 'Validation ',
        errors: [
          {},
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).toEqual(err.statusCode);
    expect(parsedError.message).toEqual(err.message);
    expect(parsedError.details).toEqual(errorService.statusDetails[err.statusCode]);
  });


  test('Test service parseError. Negative test', () => {
    const errorService = new ErrorService();

    let err = { statusCode: ErrorService.BAD_REQUEST_STATUS };
    let parsedError = errorService.parseError(err);
    expect(parsedError.status).not.toEqual(ErrorService.AUTHENTICATION_STATUS);
    expect(parsedError.message).not.toEqual('error message');
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.AUTHENTICATION_STATUS]);

    err = { statusCode: ErrorService.BAD_REQUEST_STATUS, message: 'internal message' };
    parsedError = errorService.parseError(err);
    expect(parsedError.status).not.toEqual(ErrorService.AUTHENTICATION_STATUS);
    expect(parsedError.message).not.toEqual(errorService.defaultServerErrorMessage);
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.AUTHENTICATION_STATUS]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        defaultUserMessage: 'custom defaultUserMessage',
        errors: [
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).not.toEqual(ErrorService.AUTHENTICATION_STATUS);
    expect(parsedError.message).not.toEqual(err.error.message);
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.AUTHENTICATION_STATUS]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        developerMessage: 'custom developerMessage',
        errors: [
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).not.toEqual(ErrorService.AUTHENTICATION_STATUS);
    expect(parsedError.message).not.toEqual(err.error.message);
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.AUTHENTICATION_STATUS]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        defaultUserMessage: 'Validation errors exist.',
        errors: [
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).not.toEqual(ErrorService.AUTHENTICATION_STATUS);
    expect(parsedError.message).not.toEqual(err.error.defaultUserMessage);
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.AUTHENTICATION_STATUS]);

    err = {
      statusCode: ErrorService.BAD_REQUEST_STATUS,
      message: 'Validation',
      error: {
        defaultUserMessage: 'Validation ',
        errors: [
          {},
          {},
        ],
      },
    };

    parsedError = errorService.parseError(err);
    expect(parsedError.status).not.toEqual(ErrorService.AUTHENTICATION_STATUS);
    expect(parsedError.message).not.toEqual(err.error.defaultUserMessage);
    expect(parsedError.details).not.toEqual(errorService.statusDetails[ErrorService.AUTHENTICATION_STATUS]);
  });
});
