const app = require("express")();
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const port = process.env.PORT || 4001;

dotenv.config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const { ApolloServer } = require("apollo-server-express");
const initSockets = require("./sockets");
const db = require("./db/db");

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

apolloServer.applyMiddleware({ app });

app.use(cors());
app.get("/", () => {
    console.log("api index");
});

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

initSockets(httpServer);

httpServer.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
