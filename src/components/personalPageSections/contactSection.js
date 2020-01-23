import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import colors from '../../constants/colors';
import screenResolution from '../../utils/screenResolution';
import Checkmark from '../../components/animations/checkmark/checkmark';
import Crossmark from '../../components/animations/crossmark/crossmark';
import send from '../../utils/emailSender';
import { ReCaptcha } from 'react-recaptcha-google';
import './contactSection.css';

const ContactSection = ({ name, content, contactTitle, contactContent, recaptchaConfig }) => {
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [subjectValid, setSubjectValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [subjectClicked, setSubjectClicked] = useState(false);
    const [submitButtonHover, setSubmitButtonHover] = useState(false);
    const [enableCheckmark, setEnableCheckmark] = useState(undefined);
    const [enableCrossmark, setEnableCrossmark] = useState(undefined);
    const [token, setToken] = useState("");

    const disable = screenResolution().width > 768 ? !emailValid : false;
    let captcha = undefined;

    useEffect(() => {
        if (token) {
            send(email, subject, description, setEnableCheckmark, setEnableCrossmark);

            setEmail("");
            setSubject("");
            setDescription("");
            setSubjectClicked(false);
            setSubmitButtonHover(false);
        }
    }, [token]);

    return (
        <Container id={name}>
            <ReCaptcha
                ref={(el) => { captcha = el; }}
                size={recaptchaConfig.SIZE}
                render={recaptchaConfig.RENDER}
                sitekey={recaptchaConfig.SITEKEY}
                onloadCallback={() => { }}
                verifyCallback={(token) => { verifyCallback(token, setToken) }}
            />
            <Title>{content.TITLE}</Title>
            <CenterBlock>
                <CenterContainer>
                    <LeftContainer>
                        <Form onSubmit={(event) => {
                            handleSubmit(
                                event,
                                captcha)
                        }}>
                            <InputContainer>
                                <LeftFlex>
                                    <Label>
                                        {content.EMAIL}
                                        <BlueText> *</BlueText>
                                    </Label>
                                </LeftFlex>
                                <RightFlex>
                                    <EmailInput
                                        emailValid={emailValid}
                                        emailLength={email.length}
                                        submitButtonHover={submitButtonHover}
                                        type="email"
                                        maxLength={30}
                                        value={email}
                                        onChange={(event) => { changeEmail(event, setEmail, setEmailValid) }}
                                        required
                                    />
                                </RightFlex>
                            </InputContainer>
                            <InputContainer>
                                <LeftFlex>
                                    <Label>
                                        {content.SUBJECT}
                                        <BlueText> *</BlueText>
                                    </Label>
                                </LeftFlex>
                                <RightFlex>
                                    <SubjectInput
                                        subjectValid={subjectValid}
                                        subjectClicked={subjectClicked}
                                        subjectLength={subject.length}
                                        submitButtonHover={submitButtonHover}
                                        type="text" maxLength={100}
                                        value={subject}
                                        onChange={(event) => { changeSubject(event, setSubject, setSubjectValid) }}
                                        onClick={() => { setSubjectClicked(true) }}
                                        required
                                    />
                                </RightFlex>
                            </InputContainer>
                            <InputContainer>
                                <LeftFlex>
                                    <Label>
                                        {content.DESCRIPTION}
                                    </Label>
                                </LeftFlex>
                                <RightFlex>
                                    <Textarea
                                        type="text"
                                        value={description}
                                        onChange={(event) => { changeDescription(event, setDescription) }}
                                    />
                                    <RecaptchaText>
                                        This site is protected by reCAPTCHA and the Google <Link href="https://policies.google.com/privacy">Privacy Policy</Link> and <Link href="https://policies.google.com/terms">Terms of Service</Link> apply.
                                    </RecaptchaText>
                                </RightFlex>
                            </InputContainer>
                            <SubmitButtonContainer>
                                <LeftFlex>
                                </LeftFlex>
                                <SubmitButtonRightFlex>
                                    <SubmitButton
                                        emailValid={emailValid}
                                        subjectValid={subjectValid}
                                        disabled={disable}
                                        type="submit"
                                        value="Verzenden"
                                        onMouseEnter={() => { setSubmitButtonHover(true) }}
                                        onMouseOut={() => { if (!submitButtonHover) { setEmailValid(false); setSubjectValid(false); } }}
                                    />
                                    <CheckmarkContainer>
                                        <Checkmark size={60} enable={enableCheckmark} setEnable={setEnableCheckmark} timeInMiliseconds={2000} />
                                        <Crossmark size={60} enable={enableCrossmark} setEnable={setEnableCrossmark} timeInMiliseconds={2000} />
                                    </CheckmarkContainer>
                                </SubmitButtonRightFlex>
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
    setEmailValid(event.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) != null);
    setEmail(event.target.value);
}

const changeSubject = (event, setSubject, setSubjectValid) => {
    setSubjectValid(event.target.value.length > 0);
    setSubject(event.target.value);
}

const changeDescription = (event, setDescription) => {
    setDescription(event.target.value);
}

const handleSubmit = (event, captcha) => {
    event.preventDefault();

    if (captcha) {
        captcha.reset();
        captcha.execute();
    }
}

const verifyCallback = (recaptchaToken, setToken) => {
    // Here you will get the final recaptchaToken!!!  
    console.log(recaptchaToken, "<= your recaptcha token")
    setToken(recaptchaToken);
}

//styles
const Container = styled.div`
    text-align: center;
    background-color: ${colors.DARK_GRAY};
`

const RecaptchaText = styled.p`
    font-size: 13px;
    user-select: none;
    color: ${colors.WHITE}
`

const Title = styled.h2`
    font: 22px 'Open Sans Bold',sans-serif;
    color:${colors.WHITE}
    padding-top: 40px;
    user-select: none;
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
    user-select: none;
    color:${colors.WHITE}
`

const Description = styled.p`
    color: ${colors.GRAY};
    font: 16px 'Open Sans',sans-serif;
    user-select: none;
    line-height: 30px;
    white-space: pre-line;
`

const Link = styled.a`
    color: ${colors.BLUE};
    user-select: none;
    text-decoration: none;
`

const CenterContainer = styled.div`
    max-width: 1300px;
    margin: 0 auto;
    display: flex;
    @media (max-width: 767px) {
        display: grid;
    }
`

const BlueText = styled.div`
    color: ${colors.LIGHT_BLUE};
    display: inline;
`

const LeftContainer = styled.div`
    margin-top: 10px;
    width: 45vw;
    @media (max-width: 1300px) {
        width: 55vw;
    }
    @media (max-width: 900px) {
        width: 65vw;
    }
    @media (max-width: 767px) {
        width: 80vw;
    }
`

const RightContainer = styled.div`
    width: 200px;
    @media (max-width: 767px) {
        margin-top: 40px;
    }
`

const LeftFlex = styled.div`
    flex: 1
`

const Label = styled.label`
    color: ${colors.WHITE}
    font: 18px 'Open Sans Bold',sans-serif;
    user-select: none;
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
    @media (max-width: 767px) {
        width: 100% !important;
    }
    @media (max-width: 900px) {
        width: 35vw;
    }
`

const InputContainer = styled.div`
    display: flex;
    padding-right: 50px;
    padding-bottom: 40px;
    @media (max-width: 767px) {
        display: block;
        padding-right: 0px;
        padding-bottom: 20px;
    }
`

const EmailInput = styled.input`
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
    outline: ${props => { return (props.emailLength > 0 && !props.emailValid) || (props.submitButtonHover && !props.emailValid) ? `1px solid ${colors.RED}` : 'none'; }}
    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active  {
        -webkit-box-shadow: 0 0 0 40px ${colors.GRAY} inset !important;
        -webkit-text-fill-color: ${colors.WHITE} !important;
    }
    &:focus {
        outline: none;
    }
    @media (max-width: 767px) {
        width: 100% !important;
    }
    @media (max-width: 900px) {
        width: 35vw;
    }
`

const RightFlex = styled.div`
    flex: 3;
    @media (max-width: 1300px) {
        flex: 2;
    }
`

const SubmitButtonRightFlex = styled.div`
    flex: 3;
    @media (max-width: 1300px) {
        flex: 2;
    }
    display: flex;
    margin-top: 20px;
`

const SubjectInput = styled.input`
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
    outline: ${props => { return (props.submitButtonHover && !props.subjectValid) || (!props.subjectValid && props.subjectClicked) ? `1px solid ${colors.RED}` : 'none'; }}
    &:focus {
        outline: none;
    }
    @media (max-width: 767px) {
        width: 100% !important;
    }
    @media (max-width: 900px) {
        width: 35vw;
    }
`

const showColor = (props) => keyframes`
    from { 
        background-color: ${colors.BLACK};
        color: ${colors.WHITE};
    }
    50% {
        background-color: ${ props.emailValid && props.subjectValid ? colors.WHITE : colors.RED};
        color: ${colors.BLACK};
    }
    to { 
        background-color: ${colors.BLACK}; 
        color: ${colors.WHITE};
    }
`;

const SubmitButton = styled.input`
    background-color: ${colors.BLACK};
    min-width: 150px;
    min-height: 60px;
    padding: 10px 10px;
    color: ${colors.WHITE}
    font: 24px 'Open Sans Bold',sans-serif;
    border: none;
    cursor: ${ props => props.emailValid && props.subjectValid ? "pointer" : "not-allowed"};
    transition: color 0.3s linear, background-color 0.3s linear; /* vendorless fallback */
    -o-transition: color 0.3s linear, background-color 0.3s linear; /* opera */
    -ms-transition: color 0.3s linear, background-color 0.3s linear; /* IE 10 */
    -moz-transition: color 0.3s linear, background-color 0.3s linear; /* Firefox */
    -webkit-transition: color 0.3s linear, background-color 0.3s linear; /*safari and chrome */
    -webkit-tap-highlight-color: transparent;
    &:focus {
        outline: none;
    }
    @media (min-width: 768px){
        &:hover {
            background-color: ${ props => props.emailValid && props.subjectValid ? colors.WHITE : colors.RED};
            color: ${colors.BLACK}
        }
    }   
    @media (max-width: 767px) {
        &:hover {
            -webkit-animation: ${props => css`${showColor(props)} 1s linear`};
	        -moz-animation: ${props => css`${showColor(props)} 1s linear`};
	        -ms-animation: ${props => css`${showColor(props)} 1s linear`};
	        -o-animation: ${props => css`${showColor(props)} 1s linear`};
	        animation: ${props => css`${showColor(props)} 1s linear`};
        }
    }
`

const SubmitButtonContainer = styled.div`
    display: flex;
    padding-right: 50px;
    @media (max-width: 767px) {
        display: block;
    }
`

const Form = styled.form`
    width: 100%;
    height: 100%;
`

const CheckmarkContainer = styled.div`
    flex: 1
    margin-left: 20px;
`

export default ContactSection;
