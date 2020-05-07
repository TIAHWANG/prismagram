import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import { sendSecretMail } from "./utils";

// sendSecretMail("avecjs@gmail.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

// Add middlewares
server.express.use(logger("dev"));

server.start({ port: PORT }, () => console.log(`Server running on http://localhost:${PORT}`));
