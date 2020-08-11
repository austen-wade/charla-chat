import React from "react";
import { useForm } from "react-hook-form";

const SignUp = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) =>
        props.setUser({
            handle: data.handle,
        });

    return (
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
                <label>Email</label>
                <br />
                <input
                    type="email"
                    name="email"
                    ref={register({ required: true, maxLength: 256 })}
                />
                {errors.email && <span>This field is required.</span>}
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
                {errors.handle && <span>This field is required.</span>}
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
                {errors.password && <span>This field is required.</span>}
            </div>
            <button type="submit">Sign Up</button>

            <a onClick={props.toggleSignUp} className="or" href="/">
                Or login
            </a>
        </form>
    );
};

export default SignUp;
