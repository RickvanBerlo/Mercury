import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import AboutMeSection from '../components/personalPageSections/aboutMeSection';
import ContactSection from '../components/personalPageSections/contactSection';
import Footer from '../components/footers/personalPageFooter';
import strings from '../constants/strings';
import { loadReCaptcha } from 'react-recaptcha-google';
import config from '../constants/config';
import TopNavbar from '../components/navbars/topNavbar';
import CurriculemVitaeSection from '../components/personalPageSections/curriculemVitaeSection';

const CurriculemVitae = () => {
  useEffect(() => {
    loadReCaptcha();
  }, []);

  return (
    <Container id="rootContainer">
      <TopNavbar buttons={strings.NAVIGATION} />
      <Header name={strings.NAME} links={strings.WEBLINKS} />
      <AboutMeSection content={strings.ABOUT} name="aboutMeSection" infoTitle={strings.GENERAL_INFORMATION} infoContent={strings.GENERAL_INFORMATION_DESCRIPTION} />
      <CurriculemVitaeSection name={"CVSection"} />
      <ContactSection name={"contactSection"} content={strings.CONTACT} contactTitle={strings.CONTACT_TITLE} contactContent={strings.CONTACT_DESCRIPTION} recaptchaConfig={config.RECAPTCHA} />
      <Footer links={strings.WEBLINKS} />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
