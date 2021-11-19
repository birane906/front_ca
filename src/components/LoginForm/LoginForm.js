import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { setUserMail } from '../../store/slices/userSlice';
import loginImg from '../../assets/images/login.svg'
import JwtUtil from '../../utils/jwtUtil';
import './LoginForm.scss'
import AuthApiService from '../../services/api/authApiService';

const LoginForm = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    function onSubmit(event) {
        event.preventDefault()
        console.log("Posting datas", mail, password);
        AuthApiService.authenticate(mail, password)
            .then(token => {
                const mail = JwtUtil.decodeFromHeader()?.sub
                dispatch(setUserMail(mail))
                history.push('/home')
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