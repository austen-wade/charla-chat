import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
import SignUp from "./components/SignUp";
import "./App.scss";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";

function App() {
    const [isSignUp, setSignUp] = useState(false);
    const [user, setUser] = useState(
        false
            ? null
            : {
                  handle: "tester",
              }
    );

    const handleToggleSignUp = (e) => {
        e.preventDefault();
        setSignUp(!isSignUp);
    };

    if (user) {
        return (
            <div className="app-container">
                <Sidebar />
                <div className="chat">
                    <Messages />
                    <SendMessage user={user} />
                </div>
            </div>
        );
    }

    if (isSignUp) {
        return <SignUp toggleSignUp={handleToggleSignUp} setUser={setUser} />;
    } else {
        return <Login toggleSignUp={handleToggleSignUp} setUser={setUser} />;
    }
}

export default App;
