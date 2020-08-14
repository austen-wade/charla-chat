import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
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

const client = new ApolloClient({
    uri: `http://localhost:4001/graphql`,
    cache: new InMemoryCache(),
});

function App() {
    const [isSignUp, setSignUp] = useState(false);
    const [user, setUser] = useState(
        true
            ? null
            : {
                  handle: "tester",
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
                    <Messages />
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
