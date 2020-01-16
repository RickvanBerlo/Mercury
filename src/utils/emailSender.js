import emailjs from 'emailjs-com';

const send = (email, subject, description, setEnableCheckmark) => {
    emailjs.send('gmail', 'template_Qp8WKywo', { email: email, subject: subject, description: description }, 'user_MZvpYdHKUoxUihdgPgV7e')
        .then(function (response) {
            setEnableCheckmark(true);
        }, function (error) {
            console.log('FAILED...', error);
        });
}

export default send;