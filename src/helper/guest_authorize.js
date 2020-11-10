const axios = require('axios');
const https = require('https');
const logger = require('./logger');

const guestAuthorize = async (macaddress, expiration) => {
  let response;
  const requestOptions = {
    method: 'post',
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    data: {}
  };

  try {
    requestOptions.url = `${process.env.UNIFI}/api/login`;
    requestOptions.data.username = `${process.env.USERNAME}`;
    requestOptions.data.password = `${process.env.PASSWORD}`;
    response = await axios(requestOptions);
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    logger.append('Authorize login - OK');

    requestOptions.headers = {
      Cookie: `${response.headers['set-cookie'][0]};${response.headers['set-cookie'][1]}`
    };
    requestOptions.url = `${process.env.UNIFI}/api/s/${process.env.SITE}/cmd/stamgr`;
    requestOptions.data = {
      cmd: 'authorize-guest',
      mac: macaddress,
      minutes: expiration
    };
    response = await axios(requestOptions);
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    logger.append('Authorize guest - OK');

    requestOptions.url = `${process.env.UNIFI}/api/logout`;
    requestOptions.data = {};
    response = await axios(requestOptions);
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    logger.append('Authorize logout - OK');
  } catch (error) {
    logger.append(error.message);
  }

  return { status: 'OK' };
};

module.exports = guestAuthorize;
