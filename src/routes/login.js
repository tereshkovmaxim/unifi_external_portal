const express = require('express');
const guestAuthorize = require('../helper/guest_authorize');
const logger = require('../helper/logger');

const loginRouter = express.Router();

module.exports = () => {
  loginRouter.route('/')
    .get((request, response) => {
      logger.append(`Request query - ${JSON.stringify(request.query)}`);

      switch (process.env.AUTH) {
        case 'basic':
          response.sendFile(`${process.cwd()}/public/basic.html`);
          break;
        case 'custom':
          response.sendFile(`${process.cwd()}/public/custom.html`);
          break;
        default:
          response.sendFile(`${process.cwd()}/public/basic.html`);
          break;
      }
    })
    .post((request, response) => {
      guestAuthorize(request.query.id, process.env.EXPIRATION)
        .then((result) => {
          if (result.status === 'OK') {
            response.redirect(301, process.env.REDIRECTURL || 'https://google.com');
          }
        })
        .catch((error) => logger.append(error.message));
    });
  return loginRouter;
};
