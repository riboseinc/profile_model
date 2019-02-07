console.warn("yo!!!!!!")

import express from "express";
import serverless from "serverless-http";
import graphiql from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from './graphql/schema.graphql'
import resolvers from "./graphql/resolvers";
console.warn("resolvers!!!!!!!!!!", resolvers)
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  path: "/graphql"
});
server.applyMiddleware({ app });
app.get("/playground", graphiql({ endpoint: "/graphql" }));
const handler = serverless(app);
export { handler };