import React from "react";
import Messages from "./Messages";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES, MESSAGE_CREATED } from "../queries";

const MessagesData = () => {
    const { subscribeToMore, ...result } = useQuery(GET_MESSAGES);

    return (
        <Messages
            subscribeToNewMessages={() =>
                subscribeToMore({
                    document: MESSAGE_CREATED,
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newFeedItem =
                            subscriptionData.data.messageCreated;
                        return Object.assign({}, prev, {
                            messages: [newFeedItem, ...prev.messages],
                        });
                    },
                })
            }
            {...result}
        />
    );
};

export default MessagesData;
