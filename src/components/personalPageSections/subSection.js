import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Background from '../../assets/city.gif';
import screenResolution from '../../utils/screenResolution';
import image from '../../assets/profilepic.jpg';

const SubSection = () => {
    const { height, width } = screenResolution();
    console.log(width);
    return (
        <Container height={height + "px"}>
            <CenterContainer>
                <CategoryContainer>
                    <Category>Werk</Category>
                </CategoryContainer>
                <TextContainer>
                    <Title>Student aan Huis</Title>
                    <Info>
                        thuis service medewerker
                        <DotContainer>•</DotContainer>
                        <Date>September 2017</Date>
                    </Info>
                    <Description>
                        Tijdens deze baan ga ik naar klanten toe om hun problemen met de computer op te lossen,
                        bijles geven over hoe je sommige functionaliteiten kunt gebruiken en advies geven over nieuwe technische aankopen. <br />
                        deze baan is zeer veelzijdig omdat je niet weet wat het probleem zal worden bij de klant.
                        de problemen kunnen uitlopen van APK's(opschonen pc) tot en met zeer geavanceerde systeem problemen.
                    </Description>
                </TextContainer>
            </CenterContainer>
        </Container>
    );
}

//styles
const Container = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    background: #fff;
    padding-top: 60px;
    padding-bottom: 40px;
    overflow: hidden;
    border-bottom: 1px solid #E8E8E8;
`
const Title = styled.h3`
    font: 22px/30px 'opensans-bold', sans-serif;
`
const Description = styled.p`
    color: #7A7A7A;
    font: 16px 'opensans-bold', sans-serif;
    line-height: 30px;
`

const DotContainer = styled.span`
    margin-right: 5px;
    margin-left: 5px;
`

const Info = styled.p`
    font: 19px 'librebaskerville-italic', serif;
    color: #6E7881;
    margin-bottom: 18px;
    margin-top: 9px;
`

const Date = styled.em`
    font: 16px 'opensans-regular', sans-serif;
    margin-top: 6px;
`

const CenterContainer = styled.div`
    width: 96%;
    max-width: 1020px;
    margin: 0 auto;
`
const CategoryContainer = styled.div`
    margin-top: 26px;
    position: relative;
    min-height: 1px;
    float: left;
    border-bottom: 3px solid lightskyblue;
`
const Category = styled.h2`
    position: relative;
    font: 18px/24px 'opensans-bold', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0px;
`

const TextContainer = styled.div`
    float: right;
    width: 70%;
    position: relative;
    padding: 0 20px;
    min-height: 1px;
`


export default SubSection;
