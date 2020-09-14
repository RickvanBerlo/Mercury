import React, { useEffect, useState } from "react";
import styled, {keyframes} from 'styled-components';
import CurriculemVitae from '../pages/curriculemViteaPage';

const CVloading = ({ }) => {
    const [loaded, setLoaded] = useState(false);
    const [animFinish, setAnimFinish] = useState(false);
    if (!loaded && !animFinish) document.body.style.overflow = 'hidden';

    const cvIsLoaded = () => {
        setLoaded(true);
    }
    useEffect(() => {
        const overlay = document.getElementById("overlay");
        overlay.addEventListener("animationend", ()=> { console.log("hoi"); setAnimFinish(true) }, false);
        overlay.addEventListener("transitionend", () => { document.body.style.overflow = 'unset'; }, false);
        return () => {
            overlay.removeEventListener("animationend", () => { setAnimFinish(true) }, false);
            overlay.removeEventListener("transitionend", () => { document.body.style.overflow = 'unset'; }, false);
        }
    }, [setAnimFinish])

    return (
        <Container>
            <Overlay id="overlay" hide={loaded && animFinish}/>
            <CurriculemVitae loaded={cvIsLoaded}/>
        </Container>
    )
}

const Container = styled.div`
`

const changeColor = keyframes`
    to {
        background-color: #caf2f2;
    }
`

const Overlay = styled.div`
    position: absolute;
    opacity: ${props => props.hide ? "0" : "1"}
    width: 100vw;
    height: 100vh;
    background-color: white;
    z-index: 100;
    transition: opacity 0.5s ease-in;
    animation: ${changeColor}  1s ease-in forwards;
`

export default CVloading;