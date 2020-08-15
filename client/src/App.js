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
    gql,
    ApolloProvider,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

const link = new WebSocketLink({
    uri: "ws://localhost:4001/graphql",
    options: {
        reconnect: true,
    },
});
const client = new ApolloClient({
    uri: `http://localhost:4001/graphql`,
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
