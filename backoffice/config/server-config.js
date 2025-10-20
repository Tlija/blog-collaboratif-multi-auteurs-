const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureServer = (app, { corsOptions }) => {
  app.use(helmet());

  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

module.exports = configureServer;