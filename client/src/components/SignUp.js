import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => console.log({ data, errors });

    return (
        <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <label>Email</label>
                <br />
                <input
                    type="email"
                    name="email"
                    ref={register({ required: true, maxLength: 256 })}
                />
            </div>
            <br />
            <div className="input-group">
                <label>Username</label>
                <br />
                <input
                    type="text"
                    name="handle"
                    ref={register({ required: true, maxLength: 30 })}
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
            <button type="submit">Sign Up</button>

            <a className="or-login" href="/">
                Or login
            </a>
        </form>
    );
};

export default SignUp;
