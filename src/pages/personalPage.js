import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/headers/staticHeader';
import AboutMeSection from '../components/personalPageSections/aboutMeSection';
import ContactSection from '../components/personalPageSections/contactSection';
import Footer from '../components/footers/personalPageFooter';
import strings from '../constants/strings';
import { loadReCaptcha } from 'react-recaptcha-google';
import config from '../constants/config';
import TopNavbar from '../components/navbars/topNavbar';
import CurriculemVitaeSection from '../components/personalPageSections/curriculemVitaeSection';
import background from '../assets/background.jpg';
import backgroundMobile from '../assets/backgroundmobile.jpg';

const CurriculemVitae = () => {
  useEffect(() => {
    loadReCaptcha();
  }, []);

  return (
    <Container id="rootContainer">
      <TopNavbar buttons={strings.NAVIGATION} />
      <Header name={strings.NAME} links={strings.WEBLINKS} nextSection={strings.NAVIGATION[1].PRIVATE_NAME} backgroundImage={background} mobileBackgroundImage={backgroundMobile} />
      <AboutMeSection content={strings.ABOUT} name={strings.NAVIGATION[1].PRIVATE_NAME} infoTitle={strings.GENERAL_INFORMATION} infoContent={strings.GENERAL_INFORMATION_DESCRIPTION} />
      <CurriculemVitaeSection name={strings.NAVIGATION[2].PRIVATE_NAME} />
      <ContactSection name={strings.NAVIGATION[3].PRIVATE_NAME} content={strings.CONTACT} contactTitle={strings.CONTACT_TITLE} contactContent={strings.CONTACT_DESCRIPTION} recaptchaConfig={config.RECAPTCHA} />
      <Footer links={strings.WEBLINKS} />
    </Container>
  );
}

//styles
const Container = styled.div`
    flex: 1;
  `

export default CurriculemVitae;
