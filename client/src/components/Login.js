import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_HANDLES } from "../queries";

const Login = (props) => {
    const { loading, error, data } = useQuery(GET_USER_HANDLES);
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        if (errors.length) return;
        props.setUser();
    };

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

            {!loading ? (
                <>
                    <h3>Users:</h3>
                    <ul>
                        {data &&
                            data.users.map((user) => (
                                <li key={user.handle}>{user.handle}</li>
                            ))}
                    </ul>
                </>
            ) : (
                <span>Loading ...</span>
            )}
        </form>
    );
};

export default Login;
