

module.exports.apacheFineract = {
  host: 'https://demo.openmf.org/fineract-provider',
  apiPath: '/api/v1',
  routes: {
    client: {
      path: '/clients',
      collectionRequestOptions: [
        'offset',
        'limit',
        'orderBy',
        'sortBy',
        'sortOrder',
        'officeId',
        'underHierarchy',
        'displayName',
        'firstName',
        'lastName',
        'externalId',
        'sqlSearch',
        'orphansOnly',
      ],
      singleRequestOption: ['template', 'fields'],
    },
    loanProducts: {
      path: '/loanproducts',
      collectionRequestOptions: ['fields'],
      singleRequestOption: ['template', 'fields'],
    },
    loan: {
      path: '/loans',
      collectionRequestOptions: [
        'fields',
        'offset',
        'limit',
        'orderBy',
        'sortOrder',
        'sortBy',
        'officeId',
        'underHierarchy',
        'accountNo',
        'externalId',
        'sqlSearch',
      ],
      singleRequestOption: ['fields', 'associations', 'exclude'],
    },
  },
};
