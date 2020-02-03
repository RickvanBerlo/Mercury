import React from 'react';
import styled from 'styled-components';
import IconButton from '../buttons/iconButton';
import colors from '../../constants/colors';

const Header = () => {
    return (
        <Container>
            <Center>
                {/* <IconButton icon={['fab', 'facebook-f']} size="2x" color="white" onClick={() => window.open("https://www.facebook.com/Rick.van.Berlo", "_blank")} /> */}
                <IconButton icon={['fab', 'linkedin-in']} size="2x" color="white" onClick={() => window.open("https://www.linkedin.com/in/rick-van-berlo/", "_blank")} />
                <IconButton icon={['fab', 'github']} size="2x" color="white" onClick={() => window.open("https://github.com/RickvanBerlo", "_blank")} />
                {/* <IconButton icon={['fab', 'instagram']} size="2x" color="white" onClick={() => window.open("https://www.instagram.com/rickvanberlo/?hl=nl", "_blank")} /> */}
            </Center>
        </Container >
    );
}

//styles
const Container = styled.div`
    background-color: ${colors.FOOTER}
    height: 100px;
    text-align: center;
`

const Center = styled.div`
line-height: 100px;
`
export default Header;
