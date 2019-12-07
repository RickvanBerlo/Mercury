import React from 'react';
import styled, { keyframes } from 'styled-components';
import Header from '../components/headers/personalPageHeader';
import HeadSection from '../components/personalPageSections/headSection';
import TextSection from '../components/personalPageSections/textSection';
import HorizontalScrollerSection from '../components/personalPageSections/horizontalScrollerSection';
import strings from '../constants/strings';
import projects from '../constants/projects';
import colors from '../constants/colors';

const CurriculemVitae = () => {
  return (
    <Container>
      <Header />
      <HeadSection />
      <TextSection content={strings.WORK} />
      <TextSection content={strings.EDUCATION} />
      <TextSection content={strings.INTERSHIP} />
      <HorizontalScrollerSection items={projects} createItem={createItem} onSelect={onSelect} />
    </Container>
  );
}

const createItem = (item, index) => {
  return (
    <LinkContainer image={item.IMAGE}>
      <TextContainer>
        <Text>{item.TITLE}</Text>
      </TextContainer>
    </LinkContainer>
  )
}

const onSelect = (key) => {
  console.log(key)
}

//styles
const Container = styled.div`
  flex: 1;
`
const TextContainer = styled.div`
  width: 100%;
  height 100%;
  visibility: hidden;
  opacity: 0;
  text-align: center;
  cursor: pointer;
  background-color: ${colors.TRANSPARENT_80};
  transition: visibility 0.3s, opacity 0.3s linear;
  -o-transition: visibility 0s opacity 0.3s linear; /* opera */
  -ms-transition: visibility 0s opacity 0.3s linear; /* IE 10 */
  -moz-transition: visibility 0s opacity 0.3s linear; /* Firefox */
  -webkit-transition: visibility 0s opacity 0.3s linear; /*safari and chrome */
`

const LinkContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0px 15px;
  background-image: url(${props => props.image});
	background-position:center;
	background-repeat:no-repeat;
	background-size:cover;
  &:hover ${TextContainer} {
    visibility: visible;
    opacity: 1;
  }
`

const Text = styled.p`
  padding-top: 5%;
  margin: 0px;
  color: ${colors.WHITE}
`


export default CurriculemVitae;
