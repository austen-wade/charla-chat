import React, { useEffect } from "react";
import { formatAMPM } from "../utils";

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
                    const messageDate = new Date(message.send_date);

                    let timeDisplay = formatAMPM(messageDate);

                    return (
                        <div
                            className="message"
                            key={message.content + Math.random()}
                        >
                            <div className="message-user">
                                <b>{message.handle}</b>
                                <div className="message-date">
                                    {timeDisplay}
                                </div>
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
