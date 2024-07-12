import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';
import { CustomerResolver } from './grapql/resolvers/CustomerResolver';
import { UserResolver } from './grapql/resolvers/UserResolver';

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [CustomerResolver, UserResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  const app = express() as any;
  server.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log('Server is running on http://localhost:4000/graphql')
  );
}

bootstrap().catch(err => console.error(err));
