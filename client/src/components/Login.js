import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_HANDLES } from "../queries";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [handle, setHandle] = useState("");

    const [userQuery, { called, loading, data }] = useLazyQuery(
        GET_USER_HANDLES,
        {
            variables: { handle, email },
        }
    );
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = ({ handle, email }) => {
        if (errors.length) return;
        if (handle) setHandle(handle);
        if (email) setEmail(email);
        userQuery();
    };

    useEffect(() => {
        if (data && data.users.length) {
            props.setUser(data.users[0]);
        }
    }, [data]);

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <label>Username or Email</label>
                <br />
                <input
                    type="text"
                    name="username"
                    ref={register({ required: true, maxLength: 256 })}
                />
                {errors.username && <span>This field is required.</span>}
            </div>
            <br />
            <div className="input-group">
                <label>Password</label>
                <br />
                <input
                    type="password"
                    name="password"
                    ref={register({ required: true, maxLength: 30 })}
                />
                {errors.password && <span>This field is required.</span>}
            </div>
            <button type="submit">Login</button>

            <a onClick={props.toggleSignUp} className="or" href="/">
                No account? Sign up
            </a>
        </form>
    );
};

export default Login;
