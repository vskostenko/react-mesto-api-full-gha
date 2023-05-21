import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login (props) {

    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmit(formValue);
    }
    return (
        <div className="login__container">
            <form onSubmit={handleSubmit} className="login__form" name={props.name}>
                <h2 className="login__header">Вход</h2>
                <input className="login__field" type="email" name="email" required placeholder="Email"  autoComplete="off" onChange={handleChange}/>
                <span className="login__error" id="email-error"></span>
                <input className="login__field" type="password" name="password" required placeholder="Password" autoComplete="off" onChange={handleChange}/>
                <span className="login__error" id="email-error"></span>
                <input className="login__button" type="submit" value="Войти" onSubmit={handleSubmit}/>
            </form>
        </div>
    )
}

export default Login;