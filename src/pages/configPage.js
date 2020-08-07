import React, { memo } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';

const Config = () => {
    return (
        <Container>
            <Text>Config</Text>
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
const areEqual = (prevProps, nextProps) => {
    return true;
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = {
}

const MemoConfig = memo(connect(mapStateToProps, mapDispatchToProps)(Config), areEqual)
export default MemoConfig;