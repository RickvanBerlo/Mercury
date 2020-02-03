import React from 'react';
import styled from 'styled-components';
import TextSection from './textSection'
import BarSection from './barSection';
import ProjectSection from './projectSection';
import strings from '../../constants/strings';

const CurriculemVitaeSection = ({ name }) => {

    return (
        <Container id={name}>
            {strings.WORK && <TextSection content={strings.WORK} name={"workSection"} />}
            {strings.EDUCATION && <TextSection content={strings.EDUCATION} name={"educationSection"} />}
            {strings.INTERSHIP && <TextSection content={strings.INTERSHIP} name={"internshipSection"} />}
            {strings.PROJECT && <ProjectSection content={strings.PROJECT} name={"projectSection"} />}
            {strings.SKILL && <BarSection content={strings.SKILL} name={"barSection"} />}
        </Container>
    );
}

//styles
const Container = styled.div`
`

export default CurriculemVitaeSection;
