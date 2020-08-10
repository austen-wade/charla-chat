import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
import SignUp from "./components/SignUp";
import "./App.scss";

function App() {
    if (!!null) {
        return (
            <>
                <div className="chat">
                    <Messages />
                    <SendMessage user={"austen"} />
                </div>
            </>
        );
    }

    return <SignUp />;
}

export default App;
