import { Server, IncomingMessage, ServerResponse } from 'http';
import fastify, { FastifyInstance, FastifyReply } from 'fastify';
import fastifyRobConfig from 'fastify-rob-config';
import config from 'rob-config';
import { MongoClient, Db, ObjectId } from 'mongodb';

export interface IConfig {
  has(key: string);
  get(key: string);
  set(key: string, value: string);
}

export interface IServer<Server, IncomingMessage, ServerResponse>
  extends FastifyInstance<Server, IncomingMessage, ServerResponse> {
  mongo?: {
    client: MongoClient;
    db: Db;
    ObjectId: typeof ObjectId;
  };
  config?: IConfig;
}

const buildFactory = (pkg: any): FastifyInstance<Server, IncomingMessage, ServerResponse> => {
  const options = {
    confKey: 'config',
    asProperties: false,
    config: config,
  };

  const serverOptions: any = {
    ignoreTrailingSlash: true,
    bodyLimit: 1024 * 1024 * 20,
    caseSensitive: true,
    logger: {
      ...config.get('logger'),
      serializers: {
        req(req) {
          return {
            method: req.method,
            url: req.url,
            headers: req.headers,
            hostname: req.hostname,
            remoteAddress: req.ip,
            remotePort: req.connection.remotePort,
            userId: req.user,
            version: 'v1',
          };
        },
      },
    },
    // genReqId: () => hyperid(),
  };

  const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify(serverOptions);

  // Cors
  server.use(require('cors')(config.get('cors')));
  server.register(require('fastify-cors'), { options: config.get('cors') });

  // Config
  server.register(fastifyRobConfig, options);

  // MongoDB
  server.register(require('fastify-mongodb'), {
    forceClose: true,
    url: config.get('mongo.uri'),
  });

  // Default handler
  server.get('/', (_, reply: FastifyReply<ServerResponse>) => {
    reply.header('Content-Type', 'application/json').code(200);
    reply.send({
      name: pkg.name,
      version: pkg.version,
    });
  });

  return server;
};

export default buildFactory;
