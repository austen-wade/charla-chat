import React, { useEffect, useState } from "react";

const Messages = ({ subscribeToNewMessages, loading, error, data }) => {
    const messageAreaRef = React.useRef(null);
    useEffect(() => {
        subscribeToNewMessages();
    }, [loading]);

    useEffect(() => {
        var scrollArea = messageAreaRef.current;
        scrollArea.scrollTop = scrollArea.scrollHeight;
    }, [data]);

    return (
        <div className="messages" ref={messageAreaRef}>
            {data &&
                !!data.messages.length &&
                data.messages.map((message) => {
                    return (
                        <div
                            className="message"
                            key={message.content + Math.random()}
                        >
                            <div className="message-user">
                                <b>{message.handle}</b>
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
