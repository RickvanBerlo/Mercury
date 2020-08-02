import React, { useEffect } from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/cv/iconButton';
import colors from '../../constants/colors';

const Footer = ({ links }) => {

    useEffect(() => {
        for (let i = 0; i > -1; i++) {
            const button = document.getElementById(i + "footer");
            if (button === null) break;
            button.addEventListener("click", () => { window.open(links[i].LINK, "_blank") }, false);
        }
        return () => {
            for (let i = 0; i > -1; i++) {
                const button = document.getElementById(i + "footer");
                if (button === null) break;
                button.addEventListener("click", () => { window.open(links[i].LINK, "_blank") }, false);
            }
        }
    }, [links])

    return (
        <Container>
            <FlexWarpper>
                {links.map((link, index) => {
                    return (<IconButton key={index} id={index + "footer"} icon={link.ICON} fontSize="40px" color="white" onClick={() => window.open(link.LINK, "_blank")} />);
                })}
            </FlexWarpper>
        </Container >
    );
}

//styles
const Container = styled.div`
    background-color: ${colors.FOOTER}
    height: 90px;
    text-align: center;
`

const FlexWarpper = styled.div`
    display: flex;
    width: fit-content;
    margin: auto;
    padding-top: 20px;
`
export default Footer;
