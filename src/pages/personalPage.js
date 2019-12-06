import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import HeadSection from '../components/personalPageSections/headSection';
import SubSection from '../components/personalPageSections/subSection';
import strings from '../constants/strings';

const CurriculemVitae = () => {
  return (
    <Container>
      <Header />
      <HeadSection />
      <SubSection content={strings.WORK} />
      <SubSection content={strings.WORK} />
    </Container>
  );
}

//styles
const Container = styled.div`
      flex: 1;
  `
// const rotate = keyframes`
//   from {
//         transform: rotate(0deg);
//     }

//   to {
//         transform: rotate(360deg);
//     }
//   `

export default CurriculemVitae;
