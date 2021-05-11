# crud

create endpoints for mongoose models

```js
const mongoose = require('mongoose');
const server = require('@leonardosarmentocastro/server');
const i18n = require('@leonardosarmentocastro/i18n'); // mandatory
const { crud } = require('@leonardosarmentocastro/crud');

(async () => {
  const api = await server.start(8080, {
    middlewares: (app) => {
      i18n.connect(app); // mandatory
    },
    routes: (app) => {
      const schema = new mongoose.Schema({ name: String });
      const model = new mongoose.model('Product', schema);
      crud.connect(app, model); // creates "[GET, POST] /users" + "[GET, PUT, DELETE] /users/:id"
    },
  });
})();
```

then see it yourself

```js
const got = require('got');

const PRODUCT1 = { name: 'product1' };
const url = (id = '') => `http://127.0.0.1:8080/products${id ? '/' + id : ''}`;

(async () => {
  const response1 = await got.post(url(), { json: PRODUCT1 }); // "[POST] /products"
  const { _id, name } = response1.body; // crud [C]reated

  const response2 = await got(url(_id)); // "[GET] /products/:id"
  console.log('products:', response2.body); // crud [R]ead...
})();
```

## api

### crud.connect(app = express(), model = mongoose.model())

Connects a mongoose model to a set of CRUD (create, read, update, delete) routes.

* `app`: an express app (`const app = require('express')()`)
* `model`: a mongoose model (which represents a document in your MongoDB)

e.g.

```js
const mongoose = require('mongoose');
const { crud } = require('@leonardosarmentocastro/crud');

const app = require('express')();
const schema = new mongoose.Schema({ name: String });
const model = new mongoose.model('Product', schema);
crud.connect(app, model);

// following endpoints are created:
// [GET] /users (comes with "@leonardosarmentocastro/pagination")
// [POST] /users
// [GET] /users/:id
// [PUT] /users/:id
// [DELETE] /users/:id
```

### dependencies

* `@leonardosarmentocastro/pagination`
* `@leonardosarmentocastro/i18n`

thats it.
