import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { CREATE_MESSAGE } from "../queries";
import { useMutation } from "@apollo/client";

const SendMessage = ({ user }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [addMessage, { data }] = useMutation(CREATE_MESSAGE);

    const onSubmit = (formData) => {
        addMessage({
            variables: { content: formData.message, user_id: user.user_id },
        });
    };

    return (
        <form className="message-writer" onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                name="message"
                placeholder="enter your message here..."
                autoComplete="off"
                ref={register({ required: true })}
            />
        </form>
    );
};

export default SendMessage;
