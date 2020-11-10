const express = require('express');
const url = require('url');
const logger = require('../helper/logger');

const server = express();

server.use(`/guest/s/${process.env.SITE}/`, express.static('public'));

server.get(`/guest/s/${process.env.SITE}/`, (request, response) => {
  if (Object.keys(request.query).length === 0) {
    logger.append(`Error Request - ${JSON.stringify(request.query)}`);
    response.send('<h3 class="message_error">Sorry! The connection request contains an error.</h3>');
    return;
  }
  request.query.url = process.env.REDIRECTURL;
  response.redirect(301, url.format({
    pathname: 'login',
    query: request.query
  }));
});
server.use(`/guest/s/${process.env.SITE}/login`, require('../routes/login')());

module.exports = server;
