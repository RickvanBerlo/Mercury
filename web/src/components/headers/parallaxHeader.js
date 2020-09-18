import React, { useEffect, memo } from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/cv/iconButton';
import colors from '../../constants/colors';
import { ParallaxBanner } from 'react-scroll-parallax';
import { mobilecheck } from '../../utils/deviceCheck';

import arrowDownIcon from 'react-ionicons/lib/MdArrowDown';

const Header = ({ name, links, nextSection, layers, mobile }) => {
    var check = mobilecheck();

    useEffect(() => {
        const goDown = () => {
            window.scrollTo(0, window.scrollY + document.getElementById(nextSection).getBoundingClientRect().y + 4);
        }

        const DownButton = document.getElementById("buttonDown");
        for (let i = 0; i > -1; i++) {
            const button = document.getElementById(i + "header");
            if (button === null) break;
            button.addEventListener("click", () => { window.open(links[i].LINK, "_blank") }, false);
        }
        DownButton.addEventListener("click", goDown, false);
        return () => {
            DownButton.removeEventListener("click", goDown, false);
            for (let i = 0; i > -1; i++) {
                const button = document.getElementById(i + "header");
                if (button === null) break;
                button.addEventListener("click", () => { window.open(links[i].LINK, "_blank") }, false);
            }
        }
    }, [links, nextSection])



    const layerObjects = layers.map((layer, index) => {
        return {
            children: <ParallaxImage image={layer} />,
            amount: ((layers.length / 10) - (index / 10)).toFixed(1) - 0.1,
            props: { style: { top: "0%" } }
        }
    });

    return (
        <Container>
            {!check ? <CustomParallaxBanner layers={layerObjects} /> : <BackgroundMobileContainer verticalImage={mobile[0]} horizontalImage={mobile[1]} />}
            <CenterContainer>
                <Title>{name}</Title>
                <FlexWarpper>
                    {links.map((link, index) => {
                        return (<IconButton key={index} id={index + "header"} icon={link.ICON} fontSize="50px" color="white" onClick={() => window.open(link.LINK, "_blank")} />);
                    })}
                </FlexWarpper>
            </CenterContainer>
            <NavContainer>
                <IconButton id={"buttonDown"} icon={arrowDownIcon} fontSize="50px" color="white" />
            </NavContainer>
        </Container >
    );
}

//styles
const Container = styled.div`
height: 100vh;
width: 100vw;
background-color: ${colors.HEADER_BACKGROUND_COLOR};
`

const CustomParallaxBanner = styled(ParallaxBanner)`
    height: 100vh !important;
`

const FlexWarpper = styled.div`
    display: flex;
    width: fit-content;
    margin: auto;
`

const ParallaxImage = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    will-change: transform;
    top: 0;
    right: 0;
    bottom: -1px;
    left: 0;
    box-sizing: border-box;
    background: url(${props => props.image}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
`

const BackgroundMobileContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: -60px;
    left: 0;
    background: url(${props => props.horizontalImage}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
    @media (max-width: 767px) {
        background: url(${props => props.verticalImage}) center;
        background-size: cover;
        @media (max-height: 467px) {
            background: url(${props => props.horizontalImage}) bottom;
            background-size: 100vw;
            background-repeat: no-repeat;
        }
    }
`

const NavContainer = styled.div`
   position: absolute;
   bottom: 5vh;
   width: 100vw;
   text-align: center;
`

const Title = styled.h1`
    color: white;
    user-select: none;
    font: 90px 'Open Sans Bold',sans-serif;
    font-weight:600;
    margin-top: 0;
    margin-bottom: 20px
    text-shadow: 3px 2px 3px ${colors.TRANSPARENT_80};
    @media (max-width: 767px) {
        font: 55px 'Open Sans Bold',sans-serif;
    }
    @media (max-width: 340px) {
        font: 40px 'Open Sans Bold',sans-serif;
    }
`

const CenterContainer = styled.div`
    position: absolute;
    top: 35vh;
    width: 100vw;
    text-align: center;
    @media (max-height: 467px) {
        top: 15vh;
    }
`

const areEqual = (prevProps, nextProps) => {
    return true;
}

const MemoHeader = memo(Header, areEqual)
export default MemoHeader;
