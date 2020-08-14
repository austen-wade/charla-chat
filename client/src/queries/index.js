import { gql } from "@apollo/client";

/* Queries */

export const GET_USER_HANDLES = gql`
    query Users {
        users {
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
    mutation CreateMessage($content: String!) {
        addMessage(content: $content) {
            content
        }
    }
`;
