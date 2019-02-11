import { Server, IncomingMessage, ServerResponse } from 'http';
import { makeExecutableSchema } from 'graphql-tools';
import { ObjectId } from 'bson';

ObjectId.prototype.valueOf = function() {
  return this.toString();
};

export default makeExecutableSchema({
  typeDefs: [
  ],
  resolvers: [
  ],
});

// export default (router: IServer<Server, IncomingMessage, ServerResponse>, _, next: (err?: Error) => void) => {
  // decorate user
// router.decorateRequest('user', null);
  // const beforeHandler = async (req, reply) => {
  //   if (!router.mongo) {
  //     throw new Error('no mongo');
  //   }

  //   try {
  //     const authorization = (req.headers.authorization || '').replace(/bearer/i, '').trim();

  //     if (!authorization) {
  //       throw new Error('Authorization缺失');
  //     }

  //     const { userId } = await validateToken(authorization);

  //     if (!userId) {
  //       throw new Error('Token 无效');
  //     }

  //     const user = await getUser(router.mongo.db, { userId });

  //     if (!user.userId) {
  //       throw new Error('用户不存在');
  //     }

  //     req.user = user;

  //     return;
  //   } catch (err) {
  //     if (process.env.DOCUMENT) {
  //       return;
  //     }

  //     req.log.error(err);
  //     const error = new Error('Unauthorization');
  //     reply.code(401);
  //     throw error;
  //   }
  // };

  // router.register(graphql, {
  //   prefix: '/graphql',
  //   schema,
  //   // beforeHandler,
  // });

//   next();
// };
