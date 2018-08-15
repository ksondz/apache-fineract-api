

## Guide
THe wrapper uses HTTP Basic Auth to authenticate in the open source [Apache Fineract API](https://demo.openmf.org/api-docs/apiLive.htm#top)<br/>
Default username is 'mifos' and password is 'password' <br/>

 - Create new instance. 

```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper();
```

 - Create new instance with options. <br/>

```js
const Wrapper = require('apache-fineract-api');
const apiWrapper = new Wrapper({ username: 'username', password: 'password'});
```

 - Use wrapper method

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
