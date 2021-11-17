import React from 'react';
import loginImg from '../../assets/images/login.svg'
import './RegisterForm.scss'

const RegisterForm = () => {
    return (
        <div className="base-container">
            <div className="header">Inscription</div>
            <div className="content">
                <div className="image">
                    <img src={loginImg} alt="Login" />
                </div>
                <form className="form">
                    <div className="form-group">
                        <label htmlFor="username">Prénom</label>
                        <input type="text" name="username" placeholder="Prénom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Nom</label>
                        <input type="text" name="username" placeholder="Nom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Adresse mail</label>
                        <input type="text" name="email" placeholder="example@mail.com" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de Passe</label>
                        <input type="text" name="password" placeholder="Mot de Passe" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Numéro de téléphone</label>
                        <input type="text" name="phone" placeholder="+336..." />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Adresse postale</label>
                        <input type="text" name="adress" placeholder="25 rue Example, Code postal, Ville" />
                    </div>
                </form>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Inscription
                </button>
            </div>
        </div>
    );
};

export default RegisterForm;