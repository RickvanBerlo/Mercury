import calculateAge from '../utils/calculateAge';

const strings = {
    NAME: "Rick van Berlo",
    GENERAL_INFORMATION: "Algemene informatie",
    GENERAL_INFORMATION_DESCRIPTION:
        `Naam: Rick van Berlo
        Leeftijd: ${calculateAge(new Date('May 6, 1997 23:15:30'))} jaar
        Woonplaats: Gennep
        `,
    CONTACT_TITLE: "Contact gegevens",
    CONTACT_DESCRIPTION:
        `rickvanberlo@gmail.com
        06-57854479`
    ,
    NAVIGATION: {
        BUTTON1: "HOME",
        BUTTON2: "OVER MIJ",
        BUTTON3: "CURRICULUM VITAE",
        BUTTON4: "CONTACT"
    },
    ABOUT: {
        TITLE: "Over mij",
        DESCRIPTION:
            `De ICT sector heeft me van kleins af aan geïnteresseerd. ik zag hoe ICT de wereld aan het veranderen was en wou hier graag een steentje in bijdragen. Met deze motivatie ben ik in de ICT sector gedoken.

            Als eerste heb ik een systeembeheerders opleiding gevolgd in Nijmegen. Hierin heb ik vaardigheden geleerd zoals: het configureren en beheren van servers, omgaan met klantencontact en het configureren van netwerken.
            Tijdens deze opleiding heb ik ook mijn eerste ervaring gehad met programmeren. Door dit vak wist ik al snel dat ik een programmeur wilde worden en ben na het afronden van deze opleiding een HBO informatica opleiding gestart.
            
            Hierin heb ik de benodigde vaardigheden geleerd om een programmeur te worden. Enkele van deze vaardigheden zijn het programmeren in verschillende programmeertalen zoals: C#, Java en Javascript, het in gebruik kunnen nemen van verschillende design patterns en het uitdenken van complexe architecturen.
            om mijn kennis te verrijken heb ik als minor: software architectuur gevolgd op Avans. Hierin heb ik kennis gemaakt met de programmeertaal C++.

            `,
    },
    WORK: {
        CATEGORY: "Werk",
        SECTIONS: [
            {
                TITLE: "Student aan Huis",
                SUBTITLE: "Thuis service medewerker",
                DATE: "September 2017 / September 2019",
                DESCRIPTION:
                    `Om dit werk te verrichten moet je beschikken over een aantal eigenschappen. 
                    Je moet vindingrijk zijn. Elk probleem kan je tegenkomen en hier zal je zo snel mogelijk een oplossing voor moeten verzinnen. 
                    Verder moet je klantgericht zijn. De klant moet het gevoel krijgen dat jij, hem verder kan helpen met het probleem dat zij momenteel hebben. `,
            },
        ]
    },
    EDUCATION: {
        CATEGORY: "Onderwijs",
        SECTIONS: [
            {
                TITLE: "HBO Informatica",
                SUBTITLE: "Software Ontwikkelaar",
                DATE: "September 2016 / heden",
                DESCRIPTION:
                    `De opleiding HBO informatica heeft me geholpen bij het leren van verschillende programmeertalen zoals: C#, Java, Javascript en SQL. 
                    Om mijn kennis van programmeertalen te verrijken heb ik als minor software architectuur bij Avans gekozen. Hier heb ik kennis gemaakt met C++ en verschillende design patterns.`,
            },
            {
                TITLE: "MBO Systeemheerder",
                SUBTITLE: "Netwerkbeheerder",
                DATE: "September 2013 / Juni 2016",
                DESCRIPTION:
                    `De opldeiding MBO systeembeheerder heeft me laten zien hoe interessant de ICT sector is. 
                    Tijdens deze opleiding leerde we servers beheren en configureren, databases configureren, netwerken aanleggen en programmeren in de taal Java.`,
            },
        ]
    },
    INTERSHIP: {
        CATEGORY: "Stage",
        SECTIONS: [
            {
                TITLE: "Bluenotion",
                SUBTITLE: "Programmeur",
                DATE: "September-2019 / Heden",
                DESCRIPTION:
                    `Bij Bluenotion heb ik mijn afstudeerstage van het HBO volbracht. 
                    Als afstudeeropdracht heb ik samen met mijn afstudeerpartner een app gemaakt voor een extern partij. De app geeft het bedrijf de mogelijkheid om een plattegrond te creëren van een desbetreffende ruimte. Deze functionaliteit is gemaakt met behulp van Augmented Reality.`
            },
            {
                TITLE: "Cloudy Hostings",
                SUBTITLE: "Netwerkbeheerder",
                DATE: "Januari 2015 / Juni 2016",
                DESCRIPTION:
                    `Tijdens deze stage heb ik kennis opgedaan over het deployen van servers en het beheren van webshops. Dit bedrijf is gespecialiseerd in het verhuren cloud omgevingen en hosten van websites.`,
            },
            {
                TITLE: "CenterParcs",
                SUBTITLE: "ServiceDesk Medewerker",
                DATE: "Januari 2014 - Juni 2015",
                DESCRIPTION:
                    `Deze stage heeft mij laten zien hoe belangrijk een goede communiceren met de klant kan zijn. Hier heb ik mijn communicatie vaardigheden verbeterd en heb ik geleerd snel en efficiënt computers kan deployen in het werkveld.`,
            },
        ]
    },
    PROJECT: {
        CATEGORY: "Project",
        SECTIONS: [
            {
                TITLE: "Mercury",
                SUBTITLE: "React",
                DESCRIPTION:
                    `In het project Mercury wordt gewerkt aan mijn eigen persoonlijke assistente. Hierin zal ik mijn eigen agenda bij kunnen houden, bestanden naar toe kunnen uploaden en email me kunnen ontvangen/verzenden.
                    `,
                LINKS:
                    [
                        { NAME: "Web", LINK: "https://github.com/RickvanBerlo/Mercury_Web" },
                        { NAME: "App", LINK: "https://github.com/RickvanBerlo/Mercury_App" },
                        { NAME: "Api", LINK: "https://github.com/RickvanBerlo/Mercury_Api" },
                    ],
            },
        ]
    },
    SKILL: {
        CATEGORY: "Ervaring",
        SECTIONS: [
            {
                TITLE: "C-Sharp",
                PERCENTAGE: "65%",
            },
            {
                TITLE: "Java",
                PERCENTAGE: "60%",
            },
            {
                TITLE: "Javascript",
                PERCENTAGE: "65%",
            },
            {
                TITLE: "C++",
                PERCENTAGE: "25%",
            },
            {
                TITLE: "SQL",
                PERCENTAGE: "55%",
            },
            {
                TITLE: "Css",
                PERCENTAGE: "60%"
            },
            {
                TITLE: "Html",
                PERCENTAGE: "60%"
            }
        ]
    },
    CONTACT: {
        TITLE: "Wil je een bericht achter laten dan kun je dit doen via dit formulier",
        EMAIL: "Email",
        SUBJECT: "Onderwerp",
        DESCRIPTION: "Omschrijving",
    }
}

export default strings;