import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import HeadSection from '../components/personalPageSections/headSection';
import TextSection from '../components/personalPageSections/textSection';
import BarSection from '../components/personalPageSections/barSection';
import ProjectSection from '../components/personalPageSections/projectSection';
import ContactSection from '../components/personalPageSections/contactSection';
import Footer from '../components/footers/personalPageFooter';
import strings from '../constants/strings';
import { loadReCaptcha } from 'react-recaptcha-google'

const CurriculemVitae = () => {
  useEffect(() => {
    loadReCaptcha();
  }, []);

  return (
    <Container id="rootContainer">
      <Header />
      <HeadSection content={strings.ABOUT} name="headSection" contactTitle={strings.CONTACT_TITLE} contactContent={strings.CONTACT_DESCRIPTION} />
      <TextSection content={strings.WORK} name={"infoSection"} />
      <TextSection content={strings.EDUCATION} name={"educationSection"} />
      <TextSection content={strings.INTERSHIP} name={"internshipSection"} />
      <ProjectSection content={strings.PROJECT} name={"projectSection"} />
      <BarSection content={strings.SKILL} name={"barSection"} />
      <ContactSection name={"contactSection"} content={strings.CONTACT} contactTitle={strings.CONTACT_TITLE} contactContent={strings.CONTACT_DESCRIPTION} />
      <Footer />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
