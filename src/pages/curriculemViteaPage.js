import React from 'react';
import Header from '../components/headers/parallaxHeader';
import AboutMeSection from '../components/personalPageSections/aboutMeSection';
import Footer from '../components/footers/personalPageFooter';
import languageSelector from '../utils/languageSelector';
import personalInformation from '../constants/texts/ personalInformation';
import TopNavbar from '../components/navbars/topNavbar';
import CurriculemVitaeSection from '../components/personalPageSections/curriculemVitaeSection';
import { ParallaxProvider } from 'react-scroll-parallax';

import background from '../assets/background.jpg';
import backgroundMobile from '../assets/backgroundmobile.jpg';
import LayerOne from '../assets/LayerOne.png';
import LayerTwo from '../assets/LayerTwo.png';
import LayerThree from '../assets/LayerThree.png';
import LayerFour from '../assets/LayerFour.png';
import LayerFive from '../assets/LayerFive.png';

const CurriculemVitae = () => {
  const strings = languageSelector();

  return (
    <ParallaxProvider>
      <TopNavbar buttons={strings.NAVIGATION} />
      {/* static */}
      {/* <Header name={strings.NAME} links={strings.WEBLINKS} nextSection={strings.NAVIGATION[1].PRIVATE_NAME} backgroundImage={background} mobileBackgroundImage={backgroundMobile} */}
      {/* parallax */}
      <Header name={personalInformation.NAME} links={personalInformation.WEBLINKS} nextSection={strings.NAVIGATION[1].PRIVATE_NAME} layers={[LayerFive, LayerFour, LayerThree, LayerTwo, LayerOne]} mobile={[backgroundMobile, background]} />
      <AboutMeSection content={strings.ABOUT} name={strings.NAVIGATION[1].PRIVATE_NAME} infoTitle={strings.GENERAL_INFORMATION} infoContent={strings.GENERAL_INFORMATION_DESCRIPTION} />
      <CurriculemVitaeSection name={strings.NAVIGATION[2].PRIVATE_NAME} cv={strings.CV} />
      <Footer links={personalInformation.WEBLINKS} />
    </ParallaxProvider>
  );
}

export default CurriculemVitae;
