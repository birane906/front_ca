import React from 'react';
import loginImg from '../../assets/images/login.svg'
import './LoginForm.scss'

const LoginForm = () => {
    return (
        <div>
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="Login" />
                    </div>
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="username">Adresse Mail</label>
                            <input type="text" name="username" placeholder="example@mail.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de Passe</label>
                            <input type="password" name="password" placeholder="Mot de Passe" />
                        </div>
                    </form>
                </div>
                <div className="footer">
                    <button type="button" className="btn">
                        Connexion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;