import React from "react";
import { useForm } from "react-hook-form";
import useSocket from "../hooks/useSocket";
const ENDPOINT = "http://127.0.0.1:4001";

const SendMessage = ({ user }) => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [, socketDispatch] = useSocket(ENDPOINT);

    const onSubmit = (data) => {
        socketDispatch({
            type: "send_data",
            payload: { user, ...data },
        });
        reset("message");
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

            {errors.message && <span>This field is required.</span>}
        </form>
    );
};

export default SendMessage;
