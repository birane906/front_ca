import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, selectUser, clearUser } from '../../store/slices/userSlice';
import UserServiceApi from '../../services/api/userApiService';
import { useHistory } from 'react-router';
import vaccineImage from '../../assets/images/vaccine.svg'
import locationImage from '../../assets/images/location.svg'
import testImage from '../../assets/images/test.svg'
import logoutImage from '../../assets/images/logout.svg'
import { Button, Row, Col, Alert } from 'react-bootstrap';
import { MenuCard } from '../../components';
import { Link } from 'react-router-dom';
import CovidGouvService from '../../services/api/covidGouvService';
import './Home.scss'
import LocationApiService from '../../services/api/locationApiService';

const Home = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const history = useHistory()

    const [covidData, setCovidData] = useState({})
    const [locationAlert, setLocationAlert] = useState(false)

    useEffect(() => {
        const mail = user.mail
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

    useEffect(() => {
        CovidGouvService.getLive()
            .then(covidDataRes => {
                setCovidData({...covidDataRes})
            })
            .catch(error => console.error(error))
    }, [])

    const logout = () => {
        dispatch(clearUser())
        history.push('/')
    }

    const publishLocation = () => {
        LocationApiService.publishLocation(user.mail)
            .then(response => {
                setLocationAlert(true)
                setTimeout(() => {
                    setLocationAlert(false)
                }, 3000)
            })
            .catch(error => console.log(error))
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
                    <MenuCard className="mx-auto text-decoration-none" title="Mes localisations" imagesrc={locationImage} onClick={publishLocation}>
                        <Button className="mt-auto mb-auto" >Publier ma localisation</Button>
                    </MenuCard>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col className="mb-3" xs={12} md={4} lg={3}>
                    <MenuCard className="mx-auto text-decoration-none" title="Chiffres" onClick={() => window.location="https://www.gouvernement.fr/info-coronavirus"}>
                        {
                            !!covidData.reanimation ?
                            <div className="mt-auto mb-auto d-flex flex-column align-items-center">
                                <p className="infoHeader">Réanimation</p>
                                <p>
                                    <span className="infoNumber">
                                        {covidData.reanimation} 
                                    </span>
                                    <span className={covidData.incidenceReanimation >= 0 ? "number number-pos" : "number number-neg"}>
                                        {covidData.incidenceReanimation >= 0 ? "+" : ""}{covidData.incidenceReanimation} (24h)
                                    </span>
                                </p>
                                <hr></hr>
                                <p className="infoHeader">Nouveaux cas</p>
                                <p className="infoNumber">
                                    + {covidData.nouveau24}
                                </p>
                            </div>
                            : ""
                        }
                    </MenuCard>
                </Col>
                <Col className="mb-3" xs={12} md={4} lg={3}>
                    <MenuCard className="mx-auto text-decoration-none" title="Déconnexion" imagesrc={logoutImage} onClick={logout}>
                        <Button variant="danger" className="mt-auto mb-auto">Se déconnecter</Button>
                    </MenuCard>
                </Col>
            </Row>
            <Alert variant="success" className="alertPop" show={locationAlert}>
                Localisation envoyée avec succès
            </Alert>
        </div>
    );
};

export default Home;