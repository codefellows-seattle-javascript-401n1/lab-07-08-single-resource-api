'use strict';

const request = require('superagent');
const expect = require('chai').expect;
const server = require('../server');
const port = process.env.PORT || 3000;
