'use strict';

const http = require('http');
const Router = require('./lib/router');

const port = process.env.PORT || 3000;
const router = new Router();
