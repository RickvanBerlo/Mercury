import React from "react";
import styled from 'styled-components';

const Bills = () => {
    return (
        <Container>
            <Text>Bills</Text>
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

export default Bills;