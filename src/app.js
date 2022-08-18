const express = require('express');
const { setup } = require('../di-setup');
const logger = require('./config/logger');

setup();

const router = require('./routes/v1/index');

class Server {
  constructor() {
    this.app = express();
    this.setup();
  }

  setup() {
    this.app.use(express.json());
    this.app.use('/', router);
  }

  run(port) {
    this.server = this.app.listen(port, () => {
      logger.info(`server running on port ${port}`);
    });
  }

  stop(done) {
    this.server.close(done);
  }
}

module.exports = Server;
