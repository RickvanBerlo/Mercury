import React from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';

const Footer = ({ links }) => {
    return (
        <Container>
            <Center>
                {links.map((link, index) => {
                    return (<IconButton key={index} icon={link.ICON} size="2x" color="white" onClick={() => window.open(link.LINK, "_blank")} />);
                })}
            </Center>
        </Container >
    );
}

//styles
const Container = styled.div`
    background-color: ${colors.FOOTER}
    height: 90px;
    text-align: center;
`

const Center = styled.div`
    line-height: 90px;
`
export default Footer;
