

## Clients

- [Description](#Description)
- [Create a new Client](#Create a new client)
- [Retrieve client](#Retrieve client)
- [Retrieve clients](#Retrieve clients)



## Description

Clients are people and businesses that have applied (or may apply) to an MFI for loans. <br/>
Clients can be created in Pending or straight into Active state.

- Field Descriptions
    - accountNo : <br/>
        If provided during client creation, its value is set as account no. for client account, otherwise an auto generated account no. is put in place based on the configured strategy.
    - externalId : <br/>
        A place to put an external reference for this client e.g. The ID another system uses.
        If provided, it must be unique.
    - active: <br/>
        Indicates whether this client is to be created as active client. If active=true, then activationDate must be provided. If active=false, then the client is created as pending.
    - activationDate: <br/>
        The date on which the client became active.
    - firstname: <br/>
        Facility to break up name into parts suitable for humans.
    - middlename: <br/>
        Facility to break up name into parts suitable for humans.
    - lastname: <br/>
        Facility to break up name into parts suitable for humans.
    - fullname: <br/>
        Facility to set name of a client or business that doesn't suit the firstname,middlename,lastname structure.
    - mobileNo: <br/>
        Optional: unique mobile number that is used by SMS or Mobile Money functionality.
    - staffId: <br/>
        The staffId of the staff member dealing with the client office. The staff member is not specifically the loan officer.
    - savingsProductId: <br/>
        Optional: Default overdraft savings account of client
    - datatables: <br/>
        Facility to enrich client details.

## Create a new client 
    apiWrapper.createClient(data);

- Note:
    - You can enter either: <br/>
        firstname/middlename/lastname - for a person (middlename is optional) OR
        fullname - for a business or organisation (or person known by one name).
      
    - If address is enable(enable-address=true), then additional field called address has to be passed

- Mandatory Fields: <br/>
    - firstname and lastname OR fullname
    - officeId
    - active=true and activationDate OR active=false
    - if(address enabled) address
    
- Optional Fields: <br/>
    - groupId, 
    - externalId, 
    - accountNo, 
    - staffId, 
    - mobileNo
    - savingsProductId, 
    - genderId
    - clientTypeId 
    - clientClassificationId

```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper();

const data = {
  officeId: 1,
  firstname: 'Petra',
  lastname: 'Yton',
  externalId: '786YYH7',
  dateFormat: 'dd MMMM yyyy',
  locale: 'en',
  active: true,
  activationDate: '04 March 2009',
  submittedOnDate:'04 March 2009',
  savingsProductId : 4,
  datatables: [{
    registeredTableName: 'Family Details',
    data: {
      locale: 'en',
      'Number of members': '5',
      'Number of dependents': '3',
      'No of Children': '2',
      'Date of verification': '14 December 2016',
      dateFormat: 'dd MMMM yyyy'
    }
  },
  {
    registeredTableName: 'Residency Address',
    data: {
      locale: 'en',
      'Address Line': 'Basavana Gudi Road',
      Street: 'Gandhi Bazaar',
      Landmark: 'Aashrama',
      COUNTRY_cd_Country: 17,
      STATE_cd_State: '7',
      DISTRICT_cd_District: '13',
      Pincode: '560040'
    }
  }]
};

apiWrapper.createClient(data)
  .then((client) => {
    console.log('New client:', client);
  })
```

# Retrieve clients
    apiWrapper.retrieveClients(options);
    
The list capability of clients can support pagination and sorting.

- options - OPTIONAL ARGUMENTS
    - offset: Integer optional, defaults to 0 <br/>
        Indicates the result from which pagination starts
    - limit: Integer optional, defaults to 200 <br/>
        Restricts the size of results returned. To override the default and return all entries you must explicitly pass a non-positive integer value for limit e.g. limit=0, or limit=-1
    - orderBy: String optional, one of displayName, accountNo, officeId, officeName <br/>
        Orders results by the indicated field.
    - sortBy: String optional, one of ASC, DESC <br/>
        Indicates what way to order results if orderBy is used.
    - officeId: Integer optional <br/>
        Provides the ability to restrict list of clients returned based on the office they are associated with.
    - underHierarchy: String optional <br/> 
        Use the office hierarchy string to return all clients under a given hierarchy.
    - displayName: String optional <br/>
        Use displayName of clients to restrict results.
    - firstName: String optional <br/>
        Use firstName of clients to restrict results.
    - lastName: String optional <br/>
        Use lastName of clients to restrict results.
    - externalId: String optional <br/>
        Use externalId of clients to restrict results.
    - sqlSearch: String optional <br/>
        Use an sql fragment valid for the underlying client schema to filter results. e.g. display_name like %K%
    orphansOnly: Boolean optional, defaults to false <br/> 
        Use orphansOnly as true to list clients which are not associated to any group/parent.
        
    
    
```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper();

apiWrapper.retrieveClients({ limit: 10})
  .then((clients) => {
    console.log('Clients list:', clients);
  })
```

# Retrieve client
    apiWrapper.retrieveClient(clientId, options);

- clientId - client id is Integer

- options - OPTIONAL ARGUMENTS
    - template: Boolean optional, defaults to false
    - fields: String optional
    
```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper();

apiWrapper.retrieveClient({ template: true })
  .then((client) => {
    console.log('Client:', client);
  })
```