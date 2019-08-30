const express = require("express");
const request = require("supertest");
const { middleware, setValue, getValue } = require("../dist");

it("getValue should return right value", done => {
  const app = express();
  const key = "foo";
  const value = {};

  app.use(middleware);

  app.use((req, res, next) => {
    setValue(key, value);
    next();
  });

  app.use((_, res) => {
    expect(getValue(key)).toBe(value);
    res.send("");
  });

  return request(app)
    .get("/")
    .expect(200, done);
});

it("getValue should return undefined value when not set", done => {
  const app = express();
  const key = "foo";

  app.use(middleware);

  app.use((req, res) => {
    expect(getValue(key)).toBe(undefined);
    res.send("");
  });

  return request(app)
    .get("/")
    .expect(200, done);
});

it("getValue should throw when middleware is not set", done => {
  const app = express();
  const key = "foo";

  app.use((req, res, next) => {
    expect(() => setValue(key, value)).toThrow();
    next();
  });

  app.use((req, res) => {
    expect(getValue(key)).toBe(undefined);
    res.send("");
  });

  return request(app)
    .get("/")
    .expect(200, done);
});
