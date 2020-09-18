import React, {useEffect, memo} from 'react';
import Header from '../components/headers/parallaxHeader';
import AboutMeSection from '../components/personalPageSections/aboutMeSection';
import Footer from '../components/footers/personalPageFooter';
import languageSelector from '../utils/languageSelector';
import personalInformation from '../constants/texts/ personalInformation';
import TopNavbar from '../components/navbars/topNavbar';
import CurriculemVitaeSection from '../components/personalPageSections/curriculemVitaeSection';
import { ParallaxProvider } from 'react-scroll-parallax';

import background from '../assets/background.webp';
import backgroundMobile from '../assets/backgroundmobile.webp';
import LayerOne from '../assets/LayerOne.webp';
import LayerTwo from '../assets/LayerTwo.webp';
import LayerThree from '../assets/LayerThree.webp';
import LayerFour from '../assets/LayerFour.webp';
import LayerFive from '../assets/LayerFive.webp';

const CurriculemVitae = ({loaded}) => {
  const strings = languageSelector();

  useEffect(() => {
    loaded();
  }, [loaded])

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

export default memo(CurriculemVitae);
