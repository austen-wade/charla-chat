const app = require("express")();
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const port = process.env.PORT || 4001;

dotenv.config();

const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");
const { ApolloServer, AuthenticationError } = require("apollo-server-express");
const initSockets = require("./sockets");
const db = require("./db/db");
const jwt = require("jsonwebtoken");

const getUser = (token) => {
    if (token) {
        return jwt.verify(token, process.env.SECRET);
    }
};

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
        if (req) {
            const token = req.headers["x-token"] || "";
            const user = getUser(token);
            if (!user) throw new AuthenticationError("you must be logged in");
            return { user, secret: process.env.SECRET };
        }
    },
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
