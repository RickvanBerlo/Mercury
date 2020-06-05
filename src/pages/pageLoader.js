import React, { useEffect, useState, memo } from "react";
import styled from 'styled-components';
import { getCorrectPageByName } from '../utils/pageSelector';

const PageLoader = ({ history, nextPage, previousPage, setCurrentPage, currentPageParam, storage }) => {
    const [page, setPage] = useState(previousPage);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setPage(previousPage);
        setVisible(false);
    }, [nextPage, previousPage]);

    useEffect(() => {
        if (page === nextPage) {
            setVisible(true);
        }
    }, [page, nextPage])

    useEffect(() => {
        const AnimEndEvent = (e) => {
            if (page === previousPage) {
                setPage(nextPage);
            }
        }
        const refresher = document.getElementById("refresher");
        refresher.addEventListener('transitionend', AnimEndEvent, false);
        return () => {
            refresher.removeEventListener('transitionend', AnimEndEvent, false);
        }
    }, [page, previousPage, nextPage])

    const Page = page === null ? null : getCorrectPageByName(page);

    return (
        <Container id="refresher" visible={visible}>
            {Page && <Page setCurrentPage={setCurrentPage} storage={storage.getStorage(page)} {...currentPageParam} />}
        </Container>
    )
}

const Container = styled.div`
    opacity: ${props => props.visible ? "1" : "0"} ;
    transition: opacity 0.2s linear;

`

const areEqual = (prevProps, nextProps) => {
    if (prevProps.nextPage === nextProps.nextPage) return true;
    return false;
}

const MemoPageLoader = memo(PageLoader, areEqual);
export default MemoPageLoader;