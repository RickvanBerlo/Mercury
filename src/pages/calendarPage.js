import React, { useState } from "react";
import styled from 'styled-components';

const Calendar = () => {
    return (
        <Container>
            <Text>Calendar</Text>
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

export default Calendar;