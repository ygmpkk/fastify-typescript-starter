import { IncomingMessage, ServerResponse, Server, OutgoingMessage } from 'http';
import { FastifyReply } from 'fastify';
import { runHttpQuery, convertNodeHttpToRequest } from 'apollo-server-core';
import { IServer } from '~/factory';

export default (router: IServer<Server, IncomingMessage, ServerResponse>, opts: any, next: (err?: Error) => void) => {
  const { prefix, beforeHandler, ...options } = opts;

  router.route({
    method: ['GET', 'POST'],
    url: '/',
    schema: {
      querystring: {
        query: {
          type: 'string',
        },
      },
      body: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
          },
          operationName: {
            anyOf: [{ type: 'string' }, { type: 'null' }],
          },
          variables: {
            anyOf: [{ type: 'object' }, { type: 'null' }],
          },
        },
      },
      response: {
        '2xx': {
          type: 'string',
        },
        '4xx': {
          type: 'object',
          properties: {
            data: {
              type: 'string',
            },
            errors: {
              type: 'string',
            },
          },
        },
        '5xx': {
          type: 'string',
        },
      },
    },
    beforeHandler: opts.beforeHandler,
    handler: (req: any, reply: FastifyReply<OutgoingMessage>) => {
      return runHttpQuery([req, reply], {
        method: req.req.method || 'POST',
        options: {
          debug: false,
          context: {
            req,
            mongo: router.mongo,
          },
          ...options,
        },
        query: req.req.method === 'POST' ? req.body : req.query,
        request: convertNodeHttpToRequest(req.req),
      })
        .then((response) => {
          reply.header('Content-Type', 'application/graphql; charset=utf-8');
          reply.send(response.graphqlResponse);
        })
        .catch((err) => {
          if ('HttpQueryError' === err.name) {
            if (err.headers) {
              Object.keys(err.headers).forEach((key) => {
                reply.header(key, err.headers[key]);
              });
            }

            reply.status(err.statusCode).send(err.message);
          }
        });
    },
  });

  next();
};
