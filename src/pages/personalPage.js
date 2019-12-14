import React from 'react';
import styled from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import HeadSection from '../components/personalPageSections/headSection';
import TextSection from '../components/personalPageSections/textSection';
import BarSection from '../components/personalPageSections/barSection';
import HorizontalScrollerSection from '../components/personalPageSections/horizontalScrollerSection';
import EndSection from '../components/personalPageSections/endSection';
import Footer from '../components/footers/personalPageFooter';
import strings from '../constants/strings';

const CurriculemVitae = () => {
  return (
    <Container id="rootContainer">
      <Header />
      <HeadSection name="headSection" />
      <TextSection content={strings.WORK} name={"infoSection"} />
      <TextSection content={strings.EDUCATION} name={"educationSection"} />
      <TextSection content={strings.INTERSHIP} name={"internshipSection"} />
      <BarSection content={strings.SKILLS} name={"barSection"} />
      <HorizontalScrollerSection name={"projectSection"} />
      <EndSection name={"endSection"} />
      <Footer />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
