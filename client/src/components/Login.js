import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const [userLogin, { data }] = useMutation(LOGIN);

    const onSubmit = async ({ formHandle, formPassword }) => {
        const response = await userLogin({
            variables: { handle: formHandle, password: formPassword },
        });
        console.log({ response });
        if (!response) return;
        props.setUser(response.data.loginUser.user);
        localStorage.setItem("token", response.data.loginUser.token);
    };

    // useEffect(() => {
    // if (data && data.users) {
    //     props.setUser(data.users[0]);
    // }
    // }, [data]);

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <label>Username or Email</label>
                <br />
                <input
                    type="text"
                    name="formHandle"
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
                    name="formPassword"
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
