import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser, clearUser } from '../../store/slices/userSlice';
import UserServiceApi from '../../services/api/userApiService';
import { useHistory } from 'react-router';
import vaccineImage from '../../assets/images/vaccine.svg'
import locationImage from '../../assets/images/location.svg'
import testImage from '../../assets/images/test.svg'
import logoutImage from '../../assets/images/logout.svg'
import { Button, Row, Col } from 'react-bootstrap';
import { MenuCard } from '../../components';
import { Link } from 'react-router-dom';

const Home = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        const mail = user.mail
        console.log(process.env);
        if (process.env.REACT_APP_DEV === "1") {
            return dispatch(setUser({
                mail: "mail@mail.com",
                first_name: "Firstname",
                last_name: "Lastname",
                phone: "0600000000",
            }))
        } else {
            UserServiceApi.getUserByMail(mail)
                .then(user => {
                    dispatch(setUser(user))
                })
                .catch(error => {
                    console.warn(error);
                    dispatch(clearUser())
                    history.push('/')
                })
        }
        // eslint-disable-next-line
    }, [])

    const logout = () => {
        dispatch(clearUser())
        history.push('/')
    }

    return (
        <div className="m-3 mb-0">
            <Row className="justify-content-center">
                <Col className="mb-3" xs={12} md={4} lg={3}>
                    <MenuCard className="mx-auto text-decoration-none" title="Mes vaccins" imagesrc={vaccineImage} as={Link} to="/vaccins">
                        <Button className="mt-auto mb-auto" >Consulter mes vaccins</Button>
                    </MenuCard>
                </Col>
                <Col className="mb-3" xs={12} md={4} lg={3}>
                    <MenuCard className="mx-auto text-decoration-none" title="Mes tests Covid" imagesrc={testImage} as={Link} to="/tests">
                        <Button className="mt-auto mb-auto" >Consulter mes tests Covid</Button>
                    </MenuCard>
                </Col>
                <Col className="mb-3" xs={12} md={4} lg={3}>
                    <MenuCard className="mx-auto text-decoration-none" title="Mes localisations" imagesrc={locationImage} as={Link} to="/localisations">
                        <Button className="mt-auto mb-auto" >Consulter mes localisations</Button>
                    </MenuCard>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="mb-3" xs={12} md={4} lg={3}>
                    <MenuCard className="mx-auto text-decoration-none" title="Déconnexion" imagesrc={logoutImage} onClick={logout}>
                        <Button variant="danger" className="mt-auto mb-auto">Se déconnecter</Button>
                    </MenuCard>
                </Col>
            </Row>
        </div>
    );
};

export default Home;