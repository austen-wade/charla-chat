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

    const onSubmit = async ({ formHandle }) => {
        if (formHandle) await setHandle(formHandle);
        console.log({ handle });
        // if (formEmail) await setEmail(formEmail);
        console.log({ email });
        await userQuery();
    };

    useEffect(() => {
        if (data && data.users.length) {
            console.log({ data });
            const userByHandle = data.users.find((user) => {
                console.log({ dataHandle: user.handle, handle });
                return user.handle === handle;
            });
            console.log({ userByHandle });
            props.setUser(userByHandle);
        }
    }, [called, data, handle, email]);

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
