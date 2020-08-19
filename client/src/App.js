import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import MessagesData from "./components/MessagesData";
import SignUp from "./components/SignUp";
import "./App.scss";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
} from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";
import { split } from "apollo-link";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "apollo-utilities";

const GQL_WEB_SOCKET_URI = `ws://localhost:4001/graphql`;
const GQL_HTTP_URI = `http://localhost:4001/graphql`;

const wsLink = new WebSocketLink({
    uri: GQL_WEB_SOCKET_URI,
    options: {
        reconnect: true,
    },
});

const httpLink = new HttpLink({
    uri: GQL_HTTP_URI,
});

const terminalLink = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === "OperationDefinition" && operation === "subscription";
    },
    wsLink,
    httpLink
);

const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers = { ...headers, "x-token": token };
        }
        return { headers };
    });

    return forward(operation);
});

const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
        graphqlErrors.forEach(({ message, locations, path }) => {
            console.log("GraphQL error", message);
        });
    }

    if (networkError) {
        console.log("Network error", networkError);

        if (networkError.statusCode === 401) {
            console.log("Not signed in");
        }
    }
});

const link = ApolloLink.from([authLink, errorLink, terminalLink]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

function App() {
    const [isSignUp, setSignUp] = useState(false);
    const [user, setUser] = useState(
        true
            ? null
            : {
                  handle: "tester",
                  user_id: "75e5f407-bae1-4291-b377-f07cc5c6f5da",
              }
    );

    const handleToggleSignUp = (e) => {
        e.preventDefault();
        setSignUp(!isSignUp);
    };

    let appBody = null;

    if (user) {
        appBody = (
            <div className="app-container">
                <Sidebar />
                <div className="chat">
                    <MessagesData />
                    <SendMessage user={user} />
                </div>
            </div>
        );
    } else {
        if (isSignUp) {
            appBody = (
                <SignUp toggleSignUp={handleToggleSignUp} setUser={setUser} />
            );
        } else {
            appBody = (
                <Login toggleSignUp={handleToggleSignUp} setUser={setUser} />
            );
        }
    }

    return <ApolloProvider client={client}>{appBody}</ApolloProvider>;
}

export default App;
