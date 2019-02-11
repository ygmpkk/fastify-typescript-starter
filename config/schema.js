module.exports = {
  env: {
    doc: "The applicaton environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV"
  },
  server: {
    sock: {
      doc: "绑定UNIX Socket",
      default: ""
    },
    bind: {
      doc: "绑定IP",
      default: "127.0.0.1"
    },
    port: {
      doc: "Web服务端口",
      format: "port",
      default: 3000
    },
    timeout: {
      doc: "API请求超时时间",
      format: "nat",
      default: 60 * 1000 // 1 minutes
    }
  },
  swagger: {
    enable: {
      doc: "Enable swagger",
      default: false,
    },
    servers: {
      doc: 'Swagger servers',
      default: []
    },
    doc: "Swagger",
    default: {},
  },
  logger: {
    level: {
      doc: "日志级别",
      default: "error"
    },
    file: {
      doc: "日志文件"
    }
  },
  cors: {
    origin: {
      doc: "Configures the Access-Control-Allow-Origin CORS header.",
      default: "*"
    },
    methods: {
      doc: "Configures the Access-Control-Allow-Methods CORS header.",
      default: "GET,HEAD,PUT,PATCH,POST,DELETE"
    },
    allowedHeaders: {
      doc: "Configures the Access-Control-Allow-Headers CORS header.",
      default: "*"
    },
    exposedHeaders: {
      doc: "Configures the Access-Control-Expose-Headers CORS header.",
      default: ""
    },
    credentials: {
      doc: "Configures the Access-Control-Allow-Credentials CORS header.",
      default: false
    },
    maxAge: {
      doc: "Configures the Access-Control-Max-Age CORS header.",
      default: 3600
    },
    preflightContinue: {
      doc: "Pass the CORS preflight response to the next handler."
    },
    optionsSuccessStatus: {
      doc: "Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204.",
      default: 204
    }
  },
  jwt: {
    secret: {
      doc: "JWT密钥",
      format: String,
      default: null
    },
    algorithm: {
      doc: "JWT加密算法",
      default: "HS256"
    },
    expiresIn: {
      doc: "JWT过期时间",
      default: "7d"
    }
  },
  mongo: {
    uri: {
      doc: "MongoDB URI, e.g: mongodb://user:pass@localhost/test",
      env: "MONGO_URI",
      format: String,
      default: null
    }
  },
  aliyun: {
    sms: {
      smsApiEndpoint: {
        doc: 'SMS API Endpoint',
        default: "https://dysmsapi.cn-hangzhou.aliyuncs.com"
      },
      accessKeyId: {
        doc: "Access Key Id",
        default: ""
      },
      accessSecret: {
        doc: "Access Secret",
        default: ""
      },
      signName: {
        doc: "Sign name",
        default: ""
      },
      templateCode: {
        doc: "Template code",
        default: ""
      }
    }
  },
  oss: {
  }
};
