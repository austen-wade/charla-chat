import { gql } from "@apollo/client";

/* Queries */

export const GET_USER_HANDLES = gql`
    query Users($handle: String, $email: String, $user_id: String) {
        users(handle: $handle, email: $email, user_id: $user_id) {
            handle
            user_id
        }
    }
`;

export const GET_MESSAGES = gql`
    query Messages {
        messages {
            content
            handle
        }
    }
`;

/* Mutations */

export const CREATE_USER = gql`
    mutation CreateUser($handle: String!, $email: String!, $password: String!) {
        addUser(handle: $handle, email: $email, password: $password) {
            handle
        }
    }
`;

export const CREATE_MESSAGE = gql`
    mutation CreateMessage($content: String!, $user_id: String!) {
        addMessage(content: $content, user_id: $user_id) {
            content
        }
    }
`;

/* Subscriptions */

export const MESSAGE_CREATED = gql`
    subscription OnMessageCreated {
        messageCreated {
            message {
                content
                handle
            }
        }
    }
`;
