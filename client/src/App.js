import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
import SignUp from "./components/SignUp";
import "./App.scss";
import Login from "./components/Login";

function App() {
    const [isSignUp, setSignUp] = useState(false);

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

    if (isSignUp) {
        return (
            <SignUp
                toggleSignUp={(e) => {
                    e.preventDefault();
                    setSignUp(false);
                }}
            />
        );
    } else {
        return (
            <Login
                toggleSignUp={(e) => {
                    e.preventDefault();
                    setSignUp(true);
                }}
            />
        );
    }
}

export default App;
