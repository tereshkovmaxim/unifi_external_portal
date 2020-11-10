const fs = require('fs').promises;

const path = `${process.cwd()}/logs/server.log`;

module.exports = class Logger {
  static async append (msg) {
    await fs.appendFile(path, `${new Date().toISOString()} -> ${msg}\n`);
  }
};
