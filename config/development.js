module.exports = {
  server: {
    bind: "0.0.0.0",
    port: 4000
  },
  swagger: {
    enable: true,
    servers: [
      'http://localhost:4000',
    ]
  },
  logger: {
    level: "debug"
  },
  cors: {
    origin: "*",
    allowedHeaders: "*"
  },
  mongo: {
    uri: "mongodb://127.0.0.1:27017/dev"
  },
  jwt: {
    secret: 'd4PbNlpkGUyN51KWoYVmdHTHe3tSX0+cx9n6RnKEcMQ=',
    expiresIn: '14d',
  }
};
