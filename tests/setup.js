const MongodbMemoryServer = require("mongodb-memory-server");

const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: "jest"
  },
  binary: {
    version: "4.0.2",
    downloadDir: "./cache/mongodb"
  },
  autoStart: false,
  debug: false
});

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const mongoURI = await mongod.getConnectionString();

  global.__MONGOD__ = mongod;
  process.env.MONGO_URI = mongoURI;
};
