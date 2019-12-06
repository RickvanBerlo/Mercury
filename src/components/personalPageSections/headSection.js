import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Background from '../../assets/city.gif';
import screenResolution from '../../utils/screenResolution';
import image from '../../assets/profilepic.jpg';

const HeadSection = () => {
    const { height, width } = screenResolution();
    console.log(width);
    return (
        <Container height={height + "px"}>
            <CenterContainer>
                <ImageContainer>
                    <Image src={image} />
                </ImageContainer>
                <TextContainer>
                    <Title>Over mij</Title>
                    <Description>
                        Mijn naam is Rick van Berlo, ben 20 jaar, woon in Gennep en studeer momenteel op het HBO op Avans in Den Bosch.
                        <br /><br />
                        Techniek heeft mij vanaf kleins af aan heel erg inspireert, vooral de computers.
                        In het begin was ik vooral bezig met computers in elkaar zetten maar naarmate ik ouder werd ontdekte ik dat je ook software kon schrijven voor de computer.
                        Dit sprak me erg aan en tot heden ben ik er nog steeds zeer geïntereseerd in.
                    </Description>
                    <Title>Contact gegevens</Title>
                    <Description>
                        Rick van Berlo <br />
                        WillemBoyeweg 38 <br />
                        Gennep, 6591ZT <br />
                        06-57854479 <br />
                        rickvanberlo@gmail.com
                    </Description>
                </TextContainer>
            </CenterContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
    margin-top: -50px;
    background: #2b2b2b;
    padding-top: 96px;
    padding-bottom: 80px;
    overflow: hidden;
`
const Title = styled.h3`
    color: white;
    font: 22px/30px 'opensans-bold', sans-serif;
`
const Description = styled.p`
    color: #7A7A7A;
    font: 16px 'opensans-bold', sans-serif;
    line-height: 30px;
`

const CenterContainer = styled.div`
    width: 96%;
    max-width: 1020px;
    margin: 0 auto;
`
const ImageContainer = styled.div`
    margin-top: 3%;
    position: relative;
    padding: 0 20px;
    min-height: 1px;
    float: left;
`
const Image = styled.img`
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 100%;
`

const TextContainer = styled.div`
    float: right;
    width: 70%;
    position: relative;
    padding: 0 20px;
    min-height: 1px;
`


export default HeadSection;
