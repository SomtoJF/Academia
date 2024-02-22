import { ApolloServer } from "@apollo/server";
import { config } from "dotenv";
import connectToDatabase from "./database.js";
import cors from "cors";
import express from "express";
import typeDefs from "./schema/schema.js";
import resolvers from "./resolver.js";
import { expressMiddleware } from "@apollo/server/express4";
const app = express();
const port = process.env.PORT || 4000;
// Top Level Middleware Declaration
config();
async function startServer() {
    //  // Connect to the database
    await connectToDatabase();
    // Create an Apollo server
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });
    await server.start();
    // Apply the Apollo middleware to the Express app
    app.use("/graphql", cors(), express.json(), expressMiddleware(server));
    // Start the Express server
    app.listen({ port: port }, () => {
        console.log(`🚀 Server ready at port ${port}`);
    });
}
startServer();
