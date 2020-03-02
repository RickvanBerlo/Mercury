import React, { useEffect, useState, memo } from "react";
import styled from 'styled-components';
import { pages } from '../constants/pages';
import { getCorrectPageByName } from '../utils/pageSelector';

const ANIM_TIME = 400;

const PageLoader = ({ history, nextPage, previousPage, setCurrentPage, currentPageParam }) => {
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

    const Page = page === null ? null : getCorrectPageByName(page);
    return (
        <Container id="refresher" visible={visible} seconds={ANIM_TIME}>
            {Page && <Page setCurrentPage={setCurrentPage} {...currentPageParam} />}
        </Container>
    )
}

const Container = styled.div`
    opacity: ${props => props.visible ? "1" : "0"} ;
    transition: opacity ${props => props.seconds / 1000}s linear;

`

const areEqual = (prevProps, nextProps) => {
    if (prevProps.nextPage === nextProps.nextPage) return true;
    return false;
}

const MemoPageLoader = memo(PageLoader, areEqual);
export default MemoPageLoader;