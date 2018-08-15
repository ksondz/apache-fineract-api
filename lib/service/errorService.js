

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
  static get RESOURCE_NOT_FOUND() {
    return 404;
  }

  /**
   * @return {number}
   * @constructor
   */
  static get SERVER_ERROR() {
    return 500;
  }


  constructor() {
    this.status = {
      [ErrorService.BAD_REQUEST_STATUS]: 'Bad Request - Invalid Parameter or Data Integrity Issue.',
      [ErrorService.AUTHENTICATION_STATUS]: 'Authentication Error.',
      [ErrorService.UNAUTHORIZED_STATUS]: 'Unauthorized Request.',
      [ErrorService.RESOURCE_NOT_FOUND]: 'Resource Not Found',
      [ErrorService.SERVER_ERROR]: 'Platform Internal Server Error.',
    };

    this.defaultServerErrorMessage = 'Internal server error';
  }


  /**
   * @param err
   */
  handleError(err) {
    let message = this.defaultServerErrorMessage;

    switch (err.statusCode) {
      case (ErrorService.BAD_REQUEST_STATUS):
      case (ErrorService.AUTHENTICATION_STATUS):
      case (ErrorService.UNAUTHORIZED_STATUS):
      case (ErrorService.RESOURCE_NOT_FOUND):
        if (err.error) {
          message = err.error.defaultUserMessage;
        } else {
          message = err.message || this.defaultServerErrorMessage;
        }

        break;
      default:
    }

    const error = new Error(message);
    error.status = err.statusCode;

    return error;
  }
};
