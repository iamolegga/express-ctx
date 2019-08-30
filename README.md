# express-ctx

![npm](https://img.shields.io/npm/v/express-ctx) ![Travis (.org)](https://img.shields.io/travis/iamolegga/express-ctx) [![Coverage Status](https://coveralls.io/repos/github/iamolegga/express-ctx/badge.svg?branch=master)](https://coveralls.io/github/iamolegga/express-ctx?branch=master)

`express` context based on `async_hooks` without getting lost context

## Install

```sh
npm i express-ctx
```

## Usage

```js
const express = require('express');
const { middleware, setValue, getValue } = require('express-ctx');
const usersRepository = require('./usersRepository'); // some your services

const app = express();

app.use(middleware); // must be set before using setValue/getValue

app.use((req, res, next) => {
  usersRepository.findOne(req.session.id).then(user => {
    setValue('user', user);
    next();
  });
});

app.use((req, res, next) => {
  const user = getValue('user');
  res.json(user);
});

```

## Other libs

As for now such libraries as `express-http-context` and `express-cls-hooked` do not bind `req` and `res` to namespace, so there could be troubles with middlewares based on emitting events. So this lib binds.
