import React, { useState } from "react";
import SendMessage from "./components/SendMessage";
import Messages from "./components/Messages";
import "./App.scss";

function App() {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);

    if (auth) {
        return (
            <>
                <div className="chat">
                    <Messages />
                    <SendMessage user={user} />
                </div>
            </>
        );
    }

    return (
        <>
            user: {user}
            <br />
            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={user}
            />
            <button
                onClick={() => {
                    setAuth(!auth);
                }}
            >
                join chat
            </button>
        </>
    );
}

export default App;
