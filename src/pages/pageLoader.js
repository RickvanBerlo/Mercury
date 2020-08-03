import React, { useEffect, useState, memo } from "react";
import styled, { keyframes, css } from 'styled-components';
import colors from '../constants/colors';
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
        <Container>
            <PageContainer id="refresher" visible={visible}>
                {Page && <Page setCurrentPage={setCurrentPage} storage={storage.getStorage(page)} {...currentPageParam} />}
            </PageContainer>
            <MainSpinner visible={visible}><CircleOne></CircleOne><CircleTwo></CircleTwo></MainSpinner>
        </Container >
    )
}

const PageContainer = styled.div`
    opacity: ${props => props.visible ? "1" : "0"} ;
    transition: opacity 0.2s linear;

`
const Container = styled.div`
`

const MainSpinner = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    opacity: ${props => props.visible ? "0" : "1"} ;
    transition: opacity 0.1s linear;
`

const ldsRipple = keyframes`
    from { 
        top: 90px;
        left: 90px;
        width: 0;
        height: 0;
        opacity: 1;
    }
    to {
        top: 0px;
        left: 0px;
        width: 180px;
        height: 180px;
        opacity: 0;
    }
`

const CircleOne = styled.div`
    position: absolute;
    border: 6px solid ${colors.GRAY};
    opacity: 1;
    border-radius: 50%;
    animation: ${css`${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite`};
`

const CircleTwo = styled.div`
    position: absolute;
    border: 6px solid ${colors.GRAY};
    opacity: 1;
    border-radius: 50%;
    animation: ${css`${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite`};
    animation-delay: -0.5s;
`

const areEqual = (prevProps, nextProps) => {
    if (prevProps.nextPage === nextProps.nextPage) return true;
    return false;
}

const MemoPageLoader = memo(PageLoader, areEqual);
export default MemoPageLoader;