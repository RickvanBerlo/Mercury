import React, { useState } from 'react';
import styled from 'styled-components';
import image from '../../assets/profilepic.jpg';
import colors from '../../constants/colors';
import strings from '../../constants/strings';

const ContactSection = ({ name, contactTitle, contactContent }) => {
    const [email, setEmail] = useState("");
    return (
        <Container id={name}>
            <Title>Hier kun u een bericht achter laten als u mij iets wilt laten weten</Title>
            <CenterBlock>
                <CenterContainer>
                    <LeftContainer>
                        <Form onSubmit={handleSubmit}>
                            <InputContainer>
                                <LabelContainer>
                                    <Label>
                                        Email*
                                    </Label>
                                </LabelContainer>
                                <TextContainer>
                                    <Input type="email" maxLength={30} value={email} onChange={(event) => { changeEmail(event, setEmail) }} />
                                </TextContainer>
                            </InputContainer>
                            <InputContainer>
                                <LabelContainer>
                                    <Label>
                                        Subject*
                                    </Label>
                                </LabelContainer>
                                <TextContainer>
                                    <Input type="text" maxLength={30} value={email} onChange={(event) => { changeEmail(event, setEmail) }} />
                                </TextContainer>
                            </InputContainer>
                            <InputContainer>
                                <LabelContainer>
                                    <Label>
                                        Omschrijving*
                                    </Label>
                                </LabelContainer>
                                <TextContainer>
                                    <Textarea type="text" maxLength={300} value={email} onChange={(event) => { changeEmail(event, setEmail) }} />
                                </TextContainer>
                            </InputContainer>
                            <SubmitButton type="submit" value="Verzenden" />
                        </Form>
                    </LeftContainer>
                    <RightContainer>
                        <ContactTitle>{contactTitle}</ContactTitle>
                        <Description>{contactContent}</Description>
                    </RightContainer>
                </CenterContainer >
            </CenterBlock >
        </Container >
    );
}

const changeEmail = (event, setEmail) => {
    console.log(event);
    setEmail(event.target.value);
}

const handleSubmit = (event) => {

}

//styles
const Container = styled.div`
    text-align: center;
    background-color: ${colors.DARK_GRAY};
    height: 830px;
`

const Title = styled.h2`
    font: 22px 'Open Sans Bold',sans-serif;
    color:${colors.WHITE}
    padding-top: 40px;
    padding-bottom: 30px;
    font-weight:600;
`

const CenterBlock = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    padding-top: 10px;
    padding-bottom: 40px;
    display: inline-block;
    text-align: left;
    @media (max-width: 767px) {
        padding - top: 30px;
    }
`

const ContactTitle = styled.h3`
    font: 18px 'Open Sans Bold',sans-serif;
    color:${colors.WHITE}
`

const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    line-height: 30px;
    white-space: pre-line;
`

const CenterContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    @media (max-width: 767px) {
        margin - bottom: 10px;
        display: grid;
    }
`

const LeftContainer = styled.div`
    margin-top: 10px;
    width: 50vw;
`

const RightContainer = styled.div`
    width: 10vw;
    @media (max-width: 767px) {
        width: 80vw;
    }
`

const LabelContainer = styled.div`
    flex: 1
`

const Label = styled.label`
    color: ${colors.WHITE}
    font: 18px 'Open Sans Bold',sans-serif;
    max-width: 60px;  
    line-height: 40px; 
`

const Textarea = styled.textarea`
    background-color: ${colors.GRAY};
    width: 30vw;
    height: 300px;
    border: none;
    color: ${colors.WHITE}
    line-height: 40px;
    font-size: 18px;
    resize: none;
`

const InputContainer = styled.div`
    display: flex;
    padding-right: 50px;
    padding-bottom: 40px;
`

const TextContainer = styled.div`
    flex: 5;
`

const Input = styled.input`
    background-color: ${colors.GRAY};
    width: 30vw;
    max-height: 40px;
    border: none;
    color: ${colors.WHITE}
    line-height: 40px;
    font-size: 18px;
    resize: none;
`

const SubmitButton = styled.input`
    background-color: ${colors.BLACK};
    min-width: 150px;
    min-height: 60px;
    margin-top: 40px;
    color: ${colors.WHITE}
    font: 24px 'Open Sans Bold',sans-serif;
    border: none;
    cursor: pointer;
`

const Form = styled.form`
    width: 100%;
    height: 100%;
`


export default ContactSection;
