import emailjs from 'emailjs-com';
import config from '../constants/config';

const send = (email, subject, description, setEnableCheckmark, setEnableCrossmark, callback) => {
    emailjs.send('gmail', config.MAILJS.TEMPLATE, { email: email, subject: subject, description: description }, config.MAILJS.USER)
        .then(function (response) {
            setEnableCheckmark(true);
            callback();
        }, function (error) {
            setEnableCrossmark(true);
            console.log('FAILED...', error);
        });
}

export default send;