import React from 'react';
import styled from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import HeadSection from '../components/personalPageSections/headSection';
import TextSection from '../components/personalPageSections/textSection';
import HorizontalScrollerSection from '../components/personalPageSections/horizontalScrollerSection';
import Footer from '../components/footers/personalPageFooter';
import strings from '../constants/strings';
import colors from '../constants/colors';

const CurriculemVitae = () => {
  return (
    <Container id="rootContainer">
      <Header />
      <HeadSection name="headSection" />
      <TextSection content={strings.WORK} name={"infoSection"} />
      <TextSection content={strings.EDUCATION} />
      <TextSection content={strings.INTERSHIP} />
      <HorizontalScrollerSection name={"projectSection"} />
      <Footer />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
