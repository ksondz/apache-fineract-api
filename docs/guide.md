

## Guide

Create new instance. 
```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper();
```

Create new instance and path options. <br/>
Options include username and password to authenticate in the open source [Apache Fineract API](https://demo.openmf.org/api-docs/apiLive.htm#top)<br/>
Default username is 'mifos' and password is 'password'
```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper({ username: 'username', password: 'password'});
```

Use wrapper method
```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper();

apiWrapper.retrieveClients()
  .then((clients) => {
    console.log('clients list:', clients);
  })
  .catch((error) => {
    console.log(error);
   });
```
