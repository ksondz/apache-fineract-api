

## Guide
The fineract service uses HTTP Basic Auth to authenticate in the open source [Apache Fineract API](https://demo.openmf.org/api-docs/apiLive.htm#top)<br/>
Default username is 'mifos' and password is 'password' <br/>

 - Create new instance. 

```js
const FineractService = require('apache-fineract-api');
const fineractService = new FineractService();
```

 - Create new instance with options. <br/>

```js
const FineractService = require('apache-fineract-api');
const fineractService = new FineractService({ username: 'username', password: 'password'});
```

 - Use fineract service method

```js
const FineractService = require('apache-fineract-api');
const fineractService = new FineractService();

fineractService.retrieveClients()
  .then((clients) => {
    console.log('clients list:', clients);
  })
  .catch((error) => {
    console.log(error);
   });
```
