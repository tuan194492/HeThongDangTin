const express = require("express");
const router = express.Router();
const usersRouter = require('./userRouter');
const authRouter = require('./authRouter');
const paymentRouter = require('./paymentRouter')
const advertisementRouter = require('./advertisementRouter');

const route = (app) => {
  app.use("/api/users", usersRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/advertisement", advertisementRouter);
  app.use("/api/payment", paymentRouter);
};

module.exports = route;
