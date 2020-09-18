import React, { useEffect, useState } from "react";
import styled, {keyframes, css} from 'styled-components';
import CurriculemVitae from '../pages/curriculemViteaPage';

const CVloading = () => {
    const [loaded, setLoaded] = useState(false);
    const [animFinish, setAnimFinish] = useState(false);
    if (!loaded && !animFinish) document.body.style.overflow = 'hidden';

    const cvIsLoaded = () => {
        setLoaded(true);
    }
    useEffect(() => {

        const animationEnd = (e) => {
            if (e.elapsedTime === 1){
                setAnimFinish(true)
            }
            else if(e.elapsedTime === 1.1){
                document.body.style.overflow = 'unset';
            }
        }

        const overlay = document.getElementById("overlay");
        overlay.addEventListener("animationend", animationEnd, false);
        return () => {
            overlay.removeEventListener("animationend", animationEnd, false);
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
    from {
        background-color: white;
    }
    to {
        background-color: #caf2f2;
    }
`

const hide = keyframes`
    from{
        background-color: #caf2f2;
        opacity: 1;
    }
    to {
        opacity: 0;
        visibility: hidden;
    }
`

const Overlay = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    opacity: 1;
    height: 100vh;
    background-color: white;
    z-index: 10000;
    transition: opacity 0.5s ease-in;
    animation: ${props => props.hide ? css`${hide} 1.1s ease-in forwards` : css`${changeColor} 1s ease-in forwards`};
`

export default CVloading;