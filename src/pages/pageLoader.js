import React, { useEffect, useState, memo } from "react";
import styled from 'styled-components';
import sideMenuButtons from '../constants/sideMenuButtons';

const ANIM_TIME = 400;

const PageLoader = ({ history, nextPage, previousPage }) => {
    const [page, setPage] = useState(previousPage);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(false);
        setTimeout(() => { setPage(null) }, ANIM_TIME)
    }, [nextPage, previousPage]);

    useEffect(() => {
        if (page === null) {
            setPage(nextPage);
            setVisible(true);
        }
    }, [page])

    const Page = page === null ? null : sideMenuButtons[page].PAGE;
    return (
        <Container id="refresher" visible={visible} seconds={ANIM_TIME}>
            {Page && <Page />}
        </Container>
    )
}

const Container = styled.div`
    opacity: ${props => props.visible ? "1" : "0"} ;
    transition: opacity ${props => props.seconds / 1000}s linear;

`

const MemoPageLoader = memo(PageLoader);
export default MemoPageLoader;