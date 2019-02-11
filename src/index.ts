import { Server, IncomingMessage, ServerResponse } from 'http';
import { FastifyInstance } from 'fastify';

import fs from 'fs';
import config from 'rob-config';

import buildFactory from './factory';

const pkg = require('../package.json');

// TODO Etcd

const { sock, bind, port } = config.get('server') || {
  sock: undefined,
  bind: '127.0.0.1',
  port: 4000,
};

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = buildFactory(pkg);

const swagger = config.get('swagger');
if (swagger.enable) {
  server.register(require('fastify-oas'), {
    routePrefix: '/documentation',
    exposeRoute: true,
    addModels: true,
    swagger: {
      servers: [
        {
          url: `http://${bind}:${port}`,
        },
        ...swagger.servers.map((item) => ({
          url: item,
        })),
      ],
      info: {
        title: swagger.title,
        description: swagger.description,
        version: pkg.version,
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [{ name: 'auth', description: 'Auth related end-points' }],
      components: {
        securitySchemes: {
          BearerAuth: {
            name: 'Authorization',
            in: 'header',
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });
}

// Graceful shutdown
const signalHandle = (err) => {
  if (fs.existsSync(sock)) {
    fs.unlinkSync(sock);
  }
  process.exit(err ? 1 : 0);
};

process.on('SIGINT', signalHandle);
process.on('SIGTERM', signalHandle);

if (sock) {
  server.listen(sock, (err: any) => {
    if (err) throw err;
    console.log(server.printRoutes());
    console.log(`Server listen on: ${sock}`);
  });
} else {
  server.listen(port, bind, (err: any) => {
    if (err) throw err;
    console.log(server.printRoutes());
    console.log(`Server listen on: http://${bind}:${port}`);
  });
}
