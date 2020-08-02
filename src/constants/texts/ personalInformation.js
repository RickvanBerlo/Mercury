import calculateAge from '../../utils/calculateAge';
import linkedin from 'react-ionicons/lib/LogoLinkedin';
import github from 'react-ionicons/lib/LogoGithub';

export default {
    NAME: "Rick van Berlo",
    CONTACT_INFORMATION: {
        EMAIL: `rickvanberlo@gmail.com`,
        PHONE_NUMBER: `06-57854479`
    },
    CITY: "Gennep",
    AGE: `${calculateAge(new Date('May 6, 1997 23:15:30'))} jaar`,
    WEBLINKS: [
        { ICON: linkedin, LINK: "https://www.linkedin.com/in/rick-van-berlo/" },
        { ICON: github, LINK: "https://github.com/RickvanBerlo" },
    ],
}