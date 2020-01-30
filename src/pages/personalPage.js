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
import { loadReCaptcha } from 'react-recaptcha-google';
import config from '../constants/config';

const CurriculemVitae = () => {
  useEffect(() => {
    loadReCaptcha();
  }, []);

  return (
    <Container id="rootContainer">
      <Header />
      <HeadSection content={strings.ABOUT} name="headSection" infoTitle={strings.GENERAL_INFORMATION} infoContent={strings.GENERAL_INFORMATION_DESCRIPTION} />
      {strings.WORK && <TextSection content={strings.WORK} name={"workSection"} />}
      {strings.EDUCATION && <TextSection content={strings.EDUCATION} name={"educationSection"} />}
      {strings.INTERSHIP && <TextSection content={strings.INTERSHIP} name={"internshipSection"} />}
      {strings.PROJECT && <ProjectSection content={strings.PROJECT} name={"projectSection"} />}
      {strings.SKILL && <BarSection content={strings.SKILL} name={"barSection"} />}
      <ContactSection name={"contactSection"} content={strings.CONTACT} contactTitle={strings.CONTACT_TITLE} contactContent={strings.CONTACT_DESCRIPTION} recaptchaConfig={config.RECAPTCHA} />
      <Footer />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
