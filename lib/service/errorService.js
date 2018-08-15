

/**
 * @type {module.ErrorService}
 */
module.exports = class ErrorService {


  /**
   * @return {number}
   * @constructor
   */
  static get BAD_REQUEST_STATUS() {
    return 400;
  }

  /**
   * @return {number}
   * @constructor
   */
  static get AUTHENTICATION_STATUS() {
    return 401;
  }

  /**
   * @return {number}
   * @constructor
   */
  static get UNAUTHORIZED_STATUS() {
    return 403;
  }

  /**
   * @return {number}
   * @constructor
   */
  static get RESOURCE_NOT_FOUND_STATUS() {
    return 404;
  }

  /**
   * @return {number}
   * @constructor
   */
  static get SERVER_ERROR_STATUS() {
    return 500;
  }


  constructor() {
    this.statusDetails = {
      [ErrorService.BAD_REQUEST_STATUS]: 'Bad Request - Invalid Parameter or Data Integrity Issue.',
      [ErrorService.AUTHENTICATION_STATUS]: 'Authentication Error.',
      [ErrorService.UNAUTHORIZED_STATUS]: 'Unauthorized Request.',
      [ErrorService.RESOURCE_NOT_FOUND_STATUS]: 'Resource Not Found',
      [ErrorService.SERVER_ERROR_STATUS]: 'Platform Internal Server Error.',
    };

    this.defaultServerErrorMessage = 'Internal server error';
  }


  /**
   * @param err
   */
  parseError(err) {
    let message = err.message || this.defaultServerErrorMessage;

    switch (err.statusCode) {
      case (ErrorService.BAD_REQUEST_STATUS):
      case (ErrorService.AUTHENTICATION_STATUS):
      case (ErrorService.UNAUTHORIZED_STATUS):
      case (ErrorService.SERVER_ERROR_STATUS):

        if (err.error && err.error.errors) {
          if ((err.error.errors.length <= 1) && (err.error.defaultUserMessage !== 'Validation errors exist.')) {
            message = err.error.defaultUserMessage || err.error.developerMessage;
          }
        }

        break;
      default:
    }

    return this.createError(message, err.statusCode);
  }

  /**
   * @param message
   * @param status
   * @return {Error}
   */
  createError(message = '', status) {
    const error = new Error(message);

    error.status = status || ErrorService.SERVER_ERROR_STATUS;
    error.details = this.statusDetails[status] || this.statusDetails[ErrorService.SERVER_ERROR_STATUS];

    return error;
  }
};
