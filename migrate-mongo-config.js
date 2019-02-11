const config = require("rob-config");
const { uri } = config.get("mongo");

module.exports = {
  mongodb: {
    url: uri,
    databaseName: /([\w-+]+$)/.exec(uri)[0],
    options: {
      useNewUrlParser: true
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog"
};
