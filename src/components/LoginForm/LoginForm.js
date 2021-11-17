import React, { useState } from 'react';
import { useHistory } from 'react-router';
import loginImg from '../../assets/images/login.svg'
import './LoginForm.scss'

const LoginForm = () => {

    const history = useHistory()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    function onSubmit(event) {
        event.preventDefault()
        const data = new FormData()
        data.append("username", mail)
        data.append("password", password)
        console.log("Posting datas", mail, password);
        fetch("/doLogin", {
            method: "POST",
            body: new URLSearchParams(data)
        })
            .then(v => {
                console.log(v);
                const url = new URL(v.url)
                if (v.redirected) history.push(url.pathname + url.search)
            })
            .catch(e => console.warn(e))
    }

    return (
        <div>
            <div className="base-container">
                <div className="header">Login</div>
                <div className="content">
                    <div className="image">
                        <img src={loginImg} alt="Login" />
                    </div>
                    <form className="form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Adresse Mail</label>
                            <input value={mail} onChange={event => setMail(event.target.value)} type="text" name="username" placeholder="example@mail.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de Passe</label>
                            <input value={password} onChange={event => setPassword(event.target.value)} type="password" name="password" placeholder="Mot de Passe" />
                        </div>
                        <div className="footer">
                            <input type="submit" value="Connexion" className="btn"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;