const NodeEnvironment = require("jest-environment-node");
const path = require("path");
const fs = require("fs");

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log("Setup MongoDB Test Environment");

    await super.setup();
  }

  async teardown() {
    console.log("Teardown MongoDB Test Environment");

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};
