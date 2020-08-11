import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
import SignUp from "./components/SignUp";
import "./App.scss";
import Login from "./components/Login";

function App() {
    const [isSignUp, setSignUp] = useState(false);

    const handleToggleSignUp = (e) => {
        e.preventDefault();
        setSignUp(!isSignUp);
    };

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
        return <SignUp toggleSignUp={handleToggleSignUp} />;
    } else {
        return <Login toggleSignUp={handleToggleSignUp} />;
    }
}

export default App;
