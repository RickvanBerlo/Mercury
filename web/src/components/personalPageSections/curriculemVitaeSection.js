import React from 'react';
import styled from 'styled-components';
import TextSection from './textSection'
import BarSection from './barSection';
import ProjectSection from './projectSection';

const CurriculemVitaeSection = ({ name, cv }) => {
    let cvSections = [];

    for (let section in cv) {
        if (cv[section]) {
            switch (section.toLowerCase()) {
                case "project":
                    cvSections.push(<ProjectSection key={section} content={cv[section]} name={`${section.toLowerCase()}Section`} />)
                    break;
                case "skill":
                    cvSections.push(<BarSection key={section} content={cv[section]} name={`${section.toLowerCase()}Section`} />)
                    break;
                default:
                    cvSections.push(<TextSection key={section} content={cv[section]} name={`${section.toLowerCase()}Section`} />)
                    break;
            }
        }
    }
    return (
        <Container id={name}>
            {cvSections}
        </Container>
    );
}

//styles
const Container = styled.div`
`

export default CurriculemVitaeSection;
