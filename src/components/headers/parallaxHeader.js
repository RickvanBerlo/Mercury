import React from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';
import background from '../../assets/background.jpg'
import backgroundMobile from '../../assets/backgroundmobile.jpg';
import { ParallaxBanner } from 'react-scroll-parallax';
import LayerOne from '../../assets/LayerOne.png';
import LayerTwo from '../../assets/LayerTwo.png';
import LayerThree from '../../assets/LayerThree.png';
import LayerFour from '../../assets/LayerFour.png';
import LayerFive from '../../assets/LayerFive.png';
import { mobilecheck } from '../../utils/deviceCheck';

const Header = ({ name, links, nextSection }) => {
    var check = mobilecheck();
    return (
        <Container>
            {!check ? <CustomParallaxBanner className="your-class"
                layers={[
                    {
                        children: <ParallaxImage image={LayerFive} />,
                        amount: 0.4,
                        props: { style: { top: "0%" } }
                    },
                    {
                        children: <ParallaxImage image={LayerFour} />,
                        amount: 0.3,
                        props: { style: { top: "0%" } }
                    },
                    {
                        children: <ParallaxImage image={LayerThree} />,
                        amount: 0.2,
                        props: { style: { top: "0%" } }
                    },
                    {
                        children: <ParallaxImage image={LayerTwo} />,
                        amount: 0.1,
                        props: { style: { top: "0%" } }
                    },
                    {
                        children: <ParallaxImage image={LayerOne} />,
                        amount: 0.0,
                        props: { style: { top: "0%" } }
                    }
                ]} />
                :
                <BackgroundMobileContainer />
            }
            <CenterContainer>
                <Title>{name}</Title>
                {links.map((link, index) => {
                    return (<IconButton key={index} icon={link.ICON} size="2x" color="white" onClick={() => window.open(link.LINK, "_blank")} />);
                })}
            </CenterContainer>
            <NavContainer>
                <IconButton icon={['fas', 'arrow-alt-circle-down']} size="3x" color="white" onClick={() => { window.scrollTo(0, window.scrollY + document.getElementById(nextSection).getBoundingClientRect().y + 4); }} />
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
//background-image: linear-gradient(${colors.HEADER_BACKGROUND_COLOR} 80%, ${colors.DARK_GRAY} 1%, ${colors.DARK_GRAY});
const CustomParallaxBanner = styled(ParallaxBanner)`
    height: 100vh !important;
`

const ParallaxImage = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
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
    background: url(${background}) bottom;
    background-size: 100vw;
    background-repeat: no-repeat;
    @media (max-width: 767px) {
        background: url(${backgroundMobile}) center;
        background-size: cover;
        @media (max-height: 467px) {
            background: url(${background}) bottom;
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
export default Header;
