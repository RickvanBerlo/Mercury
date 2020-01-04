import React from 'react';
import styled from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import HeadSection from '../components/personalPageSections/headSection';
import TextSection from '../components/personalPageSections/textSection';
import BarSection from '../components/personalPageSections/barSection';
import HorizontalScrollerSection from '../components/personalPageSections/horizontalScrollerSection';
import ProjectSection from '../components/personalPageSections/projectSection';
import ContactSection from '../components/personalPageSections/contactSection';
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
      <ProjectSection content={strings.PROJECT} name={"projectSection"} />
      <BarSection content={strings.SKILL} name={"barSection"} />
      {/* <HorizontalScrollerSection name={"projectSection"} /> */}
      <ContactSection name={"contactSection"} contactTitle={strings.HEADSECTION.CONTACT_TITLE} contactContent={strings.HEADSECTION.CONTACT_DESCRIPTION} />
      <Footer />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
