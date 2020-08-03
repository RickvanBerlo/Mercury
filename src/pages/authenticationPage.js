import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import colors from '../constants/colors';
import { lerp, invlerp } from '../utils/lerp';
import { mobilecheck } from '../utils/deviceCheck';
import formBuilder from '../utils/formBuilder';
import IconButton from '../components/buttons/dasboard/iconButton';

import PreviousIcon from 'react-ionicons/lib/MdArrowBack';

import background from '../assets/background.jpg';
import Snackbar from '../components/notification/snackbar';

const Authentication = ({ history, ToggleLogin = true }) => {
    const [degree, setDegree] = useState(calculateDegree());
    const [formWidth, setFormWidth] = useState(calculateFormWitdh());
    const [toggle, setToggle] = useState(ToggleLogin);
    const [textSnackbar, setTextSnackbar] = useState("");

    const calculateDegreeAndFormWith = () => {
        setDegree(calculateDegree());
        setFormWidth(calculateFormWitdh());
    }

    const onSubmit = (event, values) => {
        event.preventDefault();
        if (values.name === undefined) {
            window.location.href = "http://localhost:3000/dashboard";
        } else {
            setToggle(true);
            setTextSnackbar("Uw account is aangemaakt!");
        }
    }

    useEffect(() => {
        const backButtonClick = () => {
            TogglePages(true, setToggle);
        }

        const backButton = document.getElementById("backButton");
        window.addEventListener("resize", calculateDegreeAndFormWith, false);
        backButton.addEventListener('click', backButtonClick, false);
        return () => {
            window.removeEventListener("resize", calculateDegreeAndFormWith, false);
            backButton.removeEventListener('click', backButtonClick, false);
        }
    }, [])

    useEffect(() => {
        if (toggle) {
            history.push("/login")
        } else {
            history.push("/register")
        }
    }, [toggle, history])

    return (
        <Container background={background} >
            <Snackbar timeInSeconds={4} text={textSnackbar} setText={setTextSnackbar} />
            <BackgroundImage background={background} />
            <HideOverflow>
                <ContainerRight degree={degree} toggle={toggle} />
                <ContainerLeft degree={degree} toggle={toggle}>
                    <OffsetTransform degree={degree} toggle={toggle}>
                        <CenterGroupLogin width={formWidth} top={mobilecheck() ? 20 : 35} toggle={toggle}>
                            <Title>Welkom</Title>
                            {buildFormLogin(formBuilder, onSubmit)}
                        </CenterGroupLogin>
                        <CenterGroupRegister width={formWidth} top={mobilecheck() ? 10 : 25} toggle={toggle}>
                            <Title>Register</Title>
                            {buildFormRegister(formBuilder, onSubmit)}
                        </CenterGroupRegister>
                        <BottomContainer toggle={toggle}>
                            <Link href='#' onClick={() => { TogglePages(false, setToggle) }}>Nog geen Account? Registreer hier!</Link>
                        </BottomContainer>
                        <TopContainer toggle={toggle}>
                            <IconButton id={"backButton"} icon={PreviousIcon} fontSize="40px" />
                        </TopContainer>
                    </OffsetTransform>
                </ContainerLeft>
            </HideOverflow>
        </Container >
    )
}

const calculateFormWitdh = () => {
    const percent = invlerp(700, 1250, window.innerWidth);
    const limit = percent > 1 ? 1 : percent < 0 ? 0 : percent;
    return lerp(35, 60, 1 - limit);
}

const calculateDegree = () => {
    const percent = invlerp(700, 1250, window.innerWidth);
    const limit = percent > 1 ? 1 : percent < 0 ? 0 : percent;
    return lerp(0, 30, limit);
}

const TogglePages = (toggle, setToggle) => {
    setToggle(toggle);
    return false;
}

const buildFormLogin = (formBuilder, onSubmit) => {
    const builder = new formBuilder();
    builder.addTextInput("username", { required: true, placeholder: "E-mail" });
    builder.addPasswordInput("password", { required: true, placeholder: "Wachtwoord" });
    return builder.getForm("loginForm", "inloggen", onSubmit);
}

const buildFormRegister = (formBuilder, onSubmit) => {
    const builder = new formBuilder();
    builder.addTextInput("name", { required: true, placeholder: "Naam" });
    builder.addTextInput("username", { required: true, placeholder: "E-mail" });
    builder.addPasswordInput("password", { required: true, placeholder: "Wachtwoord" });
    return builder.getForm("registerForm", "Aanmelden", onSubmit);
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${colors.HEADER_BACKGROUND_COLOR};
 
`

const BottomContainer = styled.div`
    position: absolute;
    bottom: 3%;
    left: 7%;
    visibility: ${props => props.toggle ? "visible" : "hidden"};
    opacity: ${props => props.toggle ? 1 : 0}
    transition: opacity 0.5s ${props => props.toggle ? "0.3s" : "0s"} ${props => props.toggle ? "ease-in" : "ease-out"}, visibility 0.0s ${props => props.toggle ? "0.0s" : "0.8s"} ;
`

const TopContainer = styled.div`
    position: absolute;
    left: 2%;
    top: 2%;
    visibility: ${props => props.toggle ? "hidden" : "visible"};
    opacity: ${props => props.toggle ? 0 : 1}
    transition: opacity 0.5s ${props => props.toggle ? "0s" : "0.3s"} ${props => props.toggle ? "ease-out" : "ease-in"}, visibility 0.0s ${props => props.toggle ? "0.8s" : "0.0s"} ;
`

const Link = styled.a`
    color: black
`

const HideOverflow = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
`

const CenterGroupLogin = styled.div`
    position: absolute;
    margin: 0;
    top: ${props => props.top}%;
    left: 7%;
    visibility: ${props => props.toggle ? "visible" : "hidden"};
    opacity: ${props => props.toggle ? 1 : 0}
    width: ${props => props.width}%;
    transition: opacity 0.5s ${props => props.toggle ? "0.3s" : "0s"} ${props => props.toggle ? "ease-in" : "ease-out"}, visibility 0.0s ${props => props.toggle ? "0.0s" : "0.8s"} ;

`

const CenterGroupRegister = styled.div`
    position: absolute;
    margin: 0;
    top: ${props => props.top}%;
    visibility: ${props => props.toggle ? "hidden" : "visible"};
    left: 7%;
    opacity: ${props => props.toggle ? 0 : 1}
    width: ${props => props.width}%;
    transition: opacity 0.5s ${props => props.toggle ? "0s" : "0.3s"} ${props => props.toggle ? "ease-out" : "ease-in"}, visibility 0.0s ${props => props.toggle ? "0.8s" : "0.0s"} ;
`

const Title = styled.h2`
    font: 40px 'Open Sans',sans-serif;
    margin-top: 0px;
    font-weight:400;
`

const OffsetTransform = styled.div`
    width 100%;
    height: 100%;
    margin-top: 30%;
    transform: skew(${props => props.toggle ? "-" : ""}${props => props.degree}deg);
    margin: 0 0 0 ${props => 20 + props.degree}vw;
    transition: transform 0.5s linear;
`

const BackgroundImage = styled.div`
    position: absolute;
    width 100vw;
    height: 100vh;
    background: url(${props => props.background}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
    z-index: 0;
`

const ContainerRight = styled.div`
    position: absolute;
    width 100vw;
    height: 100vh;
    z-index: 2;
    margin: 0 0 0 ${props => 80 - props.degree}vw;
    transform: skew(${props => props.toggle ? "" : "-"}${props => props.degree}deg);
    -webkit-border-image: -webkit-gradient(linear, 0 0, 100% 0, from(${colors.BLACK}), to(${colors.TRANSPARENT})) 0 100%;
    border-style: solid;
    border-left-width: 20px;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 0px;
    transition: transform 0.5s linear;
`

const ContainerLeft = styled.div`
    position: absolute;
    width 100vw;
    height: 100vh;
    background-color: white;
    z-index: 1;
    margin: 0 0 0 -${props => 20 + props.degree}vw;
    transform: skew(${props => props.toggle ? "" : "-"}${props => props.degree}deg);
    border-width: 0px;
    transition: transform 0.5s linear;
`

export default Authentication;