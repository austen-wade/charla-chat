import React from "react";
import Messages from "./Messages";
import { useQuery } from "@apollo/client";
import { GET_MESSAGES, MESSAGE_CREATED } from "../queries";

const MessagesData = () => {
    const { subscribeToMore, ...result } = useQuery(GET_MESSAGES);

    console.log({ result });

    return (
        <Messages
            subscribeToNewMessages={() =>
                subscribeToMore({
                    document: MESSAGE_CREATED,
                    updateQuery: (prev, { subscriptionData }) => {
                        console.log({ subscriptionData, prev });
                        if (!subscriptionData.data) return prev;
                        const newFeedItem =
                            subscriptionData.data.messageCreated;
                        console.log(newFeedItem);
                        /* return Object.assign({}, prev, {
                            message: {
                                messages: [newFeedItem, prev.post.messages],
                            },
                        }); */
                    },
                })
            }
            {...result}
        />
    );
};

export default MessagesData;
