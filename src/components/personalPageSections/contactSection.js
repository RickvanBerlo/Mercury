import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../../constants/colors';

const ContactSection = ({ name, content, contactTitle, contactContent }) => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    return (
        <Container id={name}>
            <Title>{content.TITLE}</Title>
            <CenterBlock>
                <CenterContainer>
                    <LeftContainer>
                        <Form onSubmit={(event) => handleSubmit(event, setEmail, setSubject, setDescription, setEmailValid)}>
                            <InputContainer>
                                <LeftFlex>
                                    <Label>
                                        {content.EMAIL}*
                                    </Label>
                                </LeftFlex>
                                <RightFlex>
                                    <Input style={{ border: !emailValid && email.length >= 1 ? `1px solid ${colors.RED}` : `1px solid ${colors.TRANSPARENT}` }} type="email" maxLength={30} value={email} onChange={(event) => { changeEmail(event, setEmail, setEmailValid) }} />
                                </RightFlex>
                            </InputContainer>
                            <InputContainer>
                                <LeftFlex>
                                    <Label>
                                        {content.SUBJECT}*
                                    </Label>
                                </LeftFlex>
                                <RightFlex>
                                    <Input type="text" maxLength={100} value={subject} onChange={(event) => { changeSubject(event, setSubject) }} />
                                </RightFlex>
                            </InputContainer>
                            <InputContainer>
                                <LeftFlex>
                                    <Label>
                                        {content.DESCRIPTION}*
                                    </Label>
                                </LeftFlex>
                                <RightFlex>
                                    <Textarea type="text" value={description} onChange={(event) => { changeDescription(event, setDescription) }} />
                                </RightFlex>
                            </InputContainer>
                            <SubmitButtonContainer>
                                <LeftFlex>
                                </LeftFlex>
                                <RightFlex>
                                    <SubmitButton disabled={!emailValid} type="submit" value="Verzenden" />
                                </RightFlex>
                            </SubmitButtonContainer>
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

const changeEmail = (event, setEmail, setEmailValid) => {
    setEmailValid(event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setEmail(event.target.value);
}

const changeSubject = (event, setSubject) => {
    setSubject(event.target.value);
}

const changeDescription = (event, setDescription) => {
    setDescription(event.target.value);
}

const handleSubmit = (event, setEmail, setSubject, setDescription, setEmailValid) => {
    event.preventDefault();
    setEmail("");
    setSubject("");
    setDescription("");
    setEmailValid(false);
}

//styles
const Container = styled.div`
    text-align: center;
    background-color: ${colors.DARK_GRAY};
`

const Title = styled.h2`
    font: 22px 'Open Sans Bold',sans-serif;
    color:${colors.WHITE}
    padding-top: 40px;
    padding-bottom: 50px;
    font-weight:600;
    @media (max-width: 767px) {
        font: 18px 'Open Sans Bold',sans-serif;
        padding: 20px 20px 0px 20px;
    }
`

const CenterBlock = styled.div`
    margin-left: 5%;
    margin-right: 5%;
    padding-top: 10px;
    padding-bottom: 40px;
    display: inline-block;
    text-align: left;
    @media (max-width: 767px) {
        margin-right: 10%;
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
    @media (max-width: 1300px) {
        display: grid;
    }
`

const LeftContainer = styled.div`
    margin-top: 10px;
    width: 45vw;
    @media (max-width: 1300px) {
        width: 80vw;
    }
`

const RightContainer = styled.div`
    width: 200px;
`

const LeftFlex = styled.div`
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
    font: 18px 'Open Sans Bold',sans-serif;
    padding: 10px 10px;
    resize: none;
    &:focus {
        outline: none;
    }
    @media (max-width: 1300px) {
        width: 100%;
    }
`

const InputContainer = styled.div`
    display: flex;
    padding-right: 50px;
    padding-bottom: 40px;
    @media (max-width: 1300px) {
        display: block;
        padding-right: 0px;
        padding-bottom: 20px;
    }
`

const RightFlex = styled.div`
    flex: 3;
`

const Input = styled.input`
    background-color: ${colors.GRAY};
    width: 30vw;
    max-height: 40px;
    padding: 10px 10px;
    border: none;
    color: ${colors.WHITE}
    line-height: 40px;
    font: 18px 'Open Sans Bold',sans-serif;
    resize: none;
    boxShadow: none;
    border: 0;
    &:focus {
        outline: none;
    }
    @media (max-width: 1300px) {
        width: 100%;
    }
`

const SubmitButton = styled.input`
    background-color: ${colors.BLACK};
    min-width: 150px;
    min-height: 60px;
    margin-top: 20px;
    padding: 10px 10px;
    color: ${colors.WHITE}
    font: 24px 'Open Sans Bold',sans-serif;
    border: none;
    cursor: pointer;
    transition: color 0.3s linear, background-color 0.3s linear; /* vendorless fallback */
    -o-transition: color 0.3s linear, background-color 0.3s linear; /* opera */
    -ms-transition: color 0.3s linear, background-color 0.3s linear; /* IE 10 */
    -moz-transition: color 0.3s linear, background-color 0.3s linear; /* Firefox */
    -webkit-transition: color 0.3s linear, background-color 0.3s linear; /*safari and chrome */
    &:focus {
        outline: none;
    }
    &:hover {
        background-color: ${colors.WHITE};
        color: ${colors.BLACK}
      }
`

const SubmitButtonContainer = styled.div`
    display: flex;
    padding-right: 50px;
    @media (max-width: 1300px) {
        display: block;
    }
`

const Form = styled.form`
    width: 100%;
    height: 100%;
    padding-bottom: 30px;
`


export default ContactSection;
