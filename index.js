const server = require('./src/server/server');
const logger = require('./src/helper/logger');

const PORT = 8888;

logger.append('Run app');

server.listen(PORT, (error) => {
  if (error) {
    logger.append('something bad happend');
  }
  logger.append(`server is listening on ${PORT}`);
});
