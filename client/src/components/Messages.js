import React, { useEffect, useState } from "react";

const Messages = ({ subscribeToNewMessages, loading, error, data }) => {
    useEffect(() => {
        subscribeToNewMessages();
    }, []);

    return (
        <div className="messages">
            {data &&
                !!data.messages.length &&
                data.messages.map((message) => {
                    return (
                        <div className="message" key={message.id}>
                            <div className="message-user">
                                <b>{message.user}</b>
                            </div>
                            <div className="message-content">
                                {message.content}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default Messages;
