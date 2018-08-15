

/**
 * @type {{
 *  host: string,
 *  apiPath: string,
 *  username: string,
 *  password: string,
 *  routes: {
 *    client: {
 *      path: string
 *    },
 *    loanProducts: {
 *      path: string
 *    },
 *    loan: {
 *      path: string
 *    }
 *  }
 *}}
 */
module.exports.apacheFineract = {
  host: 'https://demo.openmf.org/fineract-provider',
  apiPath: '/api/v1',
  username: 'mifos',
  password: 'password',
  routes: {
    client: {
      path: '/clients',
    },
    loanProducts: {
      path: '/loanproducts',
    },
    loan: {
      path: '/loans',
    },
  },
};
