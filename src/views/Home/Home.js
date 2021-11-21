import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser, clearUser } from '../../store/slices/userSlice';
import UserServiceApi from '../../services/api/userApiService';
import { useHistory } from 'react-router';

const Home = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const mail = user.mail
        UserServiceApi.getUserByMail(mail)
            .then(user => {
                dispatch(setUser(user))
            })
            .catch(error => {
                console.warn(error);
                dispatch(clearUser())
                history.push('/')
            })
            // eslint-disable-next-line
    }, [])
    
    return (
        <div>
            <h1>Home</h1>
            <ul>
                {
                    Object.entries(user).map(([key, value]) =>
                        <li key={key}>{key} : {value}</li>
                    )
                }
            </ul>
        </div>
    );
};

export default Home;