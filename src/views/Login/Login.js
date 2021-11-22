import React, { useState } from 'react';
import { LoginForm, RegisterForm } from '../../components/index'
import './Login.scss'

const Login = () => {
    const [isLogginActive, setIsLogginActive] = useState(true)
    const [rightSideClass, setRightSideClass] = useState("right")

    function changeState() {
        if (isLogginActive) {
            setRightSideClass("left")
        } else {
            setRightSideClass("right")
        }
        setIsLogginActive(!isLogginActive)
    }

    const current = isLogginActive ? "Inscription" : "Connexion";
    const currentActive = isLogginActive ? "login" : "register";

    return (
        <div className="loginWrapper">
            <div className="login">
                <div className="container">
                    {isLogginActive && (
                        <LoginForm />
                    )}
                    {!isLogginActive && (
                        <RegisterForm />
                    )}
                </div>
                <RightSide
                    className={rightSideClass}
                    current={current}
                    currentActive={currentActive}
                    onClick={changeState}
                />
            </div>
        </div>
    );
};

const RightSide = props => {
    return (
        <div
            className={`right-side ${props.className}`}
            onClick={props.onClick}
        >
            <div className="inner-container">
                <div className="text">{props.current}</div>
            </div>
        </div>
    );
};

export default Login;
