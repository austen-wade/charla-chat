import React from "react";
import { useForm } from "react-hook-form";

const Login = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => console.log({ data, errors });

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
            </div>
            <br />
            <div className="input-group">
                <label>Set Password</label>
                <br />
                <input
                    type="password"
                    name="password"
                    ref={register({ required: true, maxLength: 30 })}
                />
            </div>
            <button type="submit">Login</button>

            <a onClick={props.toggleSignUp} className="or" href="/">
                No account? Sign up
            </a>
        </form>
    );
};

export default Login;
