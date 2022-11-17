import express, {json} from "express";
import cors from "cors";
import lodash from "lodash";
import { ApolloServer, gql } from "apollo-server-express";
// import {getBooks} from "./adaptor/api/books.js";

const PORT = 8000;

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling"
  },
  {
    title: "Jurassic Park",
    author: "Michael Crishton"
  }
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

// -------- express server ----------

const app = express();

// Request bodyの最大サイズの設定 (デフォルト 100kb)
app.use(json({ limit: "2mb" }));

// https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces/?tab=browserrum#how-are-rum-resources-linked-to-traces
app.use(
  cors({
    credentials: true,
    origin: true,
    allowedHeaders: [
      "x-datadog-trace-id",
      "x-datadog-parent-id",
      "x-datadog-origin",
      "x-datadog-sampling-priority",
      "x-datadog-sampled",
      "Content-Type",
      "Authorization",
    ],
  }),
);

// For ingress
app.get(
  "/",
  (_req, res, _next) => {
    // optional: add further things to check (e.g. connecting to dababase)
    const healthcheck = {
      uptime: process.uptime(),
      message: "OK",
      timestamp: Date.now(),
    };

    try {
      // check something
      res.status(200).send(healthcheck);
    } catch (e: any) {
      if (lodash(e)) {
        healthcheck.message = e.toString();
      }
      res.status(503).send(healthcheck);
    }
  },
);

const setup = async ()=> {
  const graphqlPath = "/__graphql";
  await server.start();
  server.applyMiddleware({ app, path: graphqlPath }); // defaultのpathを /graphqlPath に変更
}
setup();
// server.applyMiddleware({ app, path: graphqlPath });

app.listen(
  { port: PORT },
  () => {
    console.log(`🚀 graphql server is listening on port ${PORT}`);
  },
);