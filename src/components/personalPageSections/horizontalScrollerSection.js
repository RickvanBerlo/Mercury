import React from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';
import Background from '../../assets/projectsBackground.jpg';
import projects from '../../constants/projects';
import HorizontalScroller from '../scroller/horizontalScroller';
import porjects from '../../constants/projects';


const HorizontalScrollerSection = ({ name }) => {
  return (
    <Container id={name}>
      <TitleContainer>
        <Title>Hier komen al mijn projecten in te staan</Title>
      </TitleContainer>
      <HorizontalScroller items={projects} createItem={createItem} onSelect={onSelect} />
    </Container>
  );
}

const createItem = (item, index) => {
  return (
    <LinkContainer key={index} image={item.IMAGE}>
      <TextContainer key={index + "-textContainer"}>
        <Text key={index + "-text"}>{item.TITLE}</Text>
      </TextContainer>
    </LinkContainer>
  )
}

const onSelect = (key) => {
  window.open(porjects[key].LINK, "_blank")
}

//styles
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
  background-image: url(${props => props.image});
	background-position:center;
	background-repeat:no-repeat;
	background-size:cover;
  &:hover ${TextContainer} {
    visibility: visible;
    opacity: 1;
  }
  @media (max-width: 767px) {
    &:hover ${TextContainer}{
      visibility: hidden;
      opacity: 0;
    }
    &:active ${TextContainer}{
      visibility: visible;
      opacity: 1;
    }
}
`

const Text = styled.p`
  padding-top: 5%;
  font: 18px 'Open Sans Bold',sans-serif;
  font-weight:600;
  margin: 0px;
  color: ${colors.WHITE}
`

const Container = styled.div`
    padding-bottom: 100px;
    background: ${colors.DARK_GRAY} url(${Background});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
`

const TitleContainer = styled.div`
  height: 100px;
`
const Title = styled.h3`
  color: ${colors.WHITE}
  position: relative;
  text-align: center;
  line-height: 80px;
  padding-top: 20px; 
  font: 22px 'Open Sans Bold',sans-serif;
  font-weight:600;
  text-shadow: 3px 2px 3px rgba(0, 0, 0, .8);
  margin: 0px;
  @media (max-width: 767px) {
    font: 20px 'Open Sans Bold',sans-serif;
    font-weight:600;
  }
`

export default HorizontalScrollerSection;
