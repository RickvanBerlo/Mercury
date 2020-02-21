import React, { useState } from "react";
import styled from 'styled-components';

const Home = () => {
    return (
        <Container>
            <Text>Home</Text>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
`

const Text = styled.p`
    margin: 0
`

export default Home;