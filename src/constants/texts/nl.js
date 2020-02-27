import personalInformation from './ personalInformation';

const NL = {
    GENERAL_INFORMATION: "Algemene informatie",
    GENERAL_INFORMATION_DESCRIPTION:
        `Naam: ${personalInformation.NAME}
        Leeftijd: ${personalInformation.AGE}
        Woonplaats: ${personalInformation.CITY}
        `,
    CONTACT_TITLE: "Contact gegevens",
    CONTACT_DESCRIPTION:
        personalInformation.CONTACT_INFORMATION
    ,
    NAVIGATION: [
        { PUBLIC_NAME: "HOME", PRIVATE_NAME: undefined },
        { PUBLIC_NAME: "OVER MIJ", PRIVATE_NAME: "aboutMeSection" },
        { PUBLIC_NAME: "CURRICULUM VITAE", PRIVATE_NAME: "CVSection" },
        { PUBLIC_NAME: "CONTACT", PRIVATE_NAME: "contactSection" },
    ],
    ABOUT: {
        TITLE: "Over mij",
        DESCRIPTION:
            `De ICT-sector heeft mij van kleins af aan geïnteresseerd. Ik zag hoe ICT de wereld aan het veranderen was en  ik wilde hier graag een steentje aan bijdragen. Met deze motivatie ben ik in de ICT-sector gedoken.

            Als eerste heb ik een systeembeheerders opleiding gevolgd in Nijmegen. Hierin heb ik vaardigheden geleerd zoals: Het configureren en beheren van servers, omgaan met klantencontact en het configureren van netwerken.
            Tijdens deze opleiding heb ik ook mijn eerste ervaring gehad met programmeren. Door deze ervaring wist ik al snel dat ik een programmeur wilde worden en ben ik na het afronden van deze opleiding een HBO informatica opleiding gestart.
            
            Hierin heb ik de benodigde vaardigheden geleerd om programmeur te worden. Enkele van deze vaardigheden zijn: Het programmeren in verschillende programmeertalen, het in gebruik kunnen nemen van verschillende design patterns en het uitdenken van complexe architecturen.
            Om mijn kennis te verrijken heb ik als minor software architectuur gevolgd op Avans. Hier heb ik kennis gemaakt met de programmeertaal C++.

            Naast de opleidingen ben ik ook thuis bezig met het verrijken van mijn kennis. Thuis voer ik kleine projecten uit om nieuwe technologieën te ontdekken.

            `,
    },
    CV: {
        WORK: {
            CATEGORY: "Werk",
            SECTIONS: [
                {
                    TITLE: "Student aan Huis",
                    SUBTITLE: "Thuis service medewerker",
                    DATE: "Mei 2016 / Juni 2019",
                    DESCRIPTION:
                        `Tijdens deze baan help je klanten van Student aan Huis met computer problemen.
                    Geen enkele afspraak is hetzelfde waardoor je als werknemer zeer vindingrijk moet zijn om alle problemen op te kunnen lossen.`,
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
                    Om mijn kennis van programmeertalen te verrijken heb ik de minor software architectuur bij Avans gekozen. Hier heb ik kennis gemaakt met verschillende design patterns en de programmeertaal C++.`,
                },
                {
                    TITLE: "MBO Systeemheerder",
                    SUBTITLE: "Netwerkbeheerder",
                    DATE: "September 2013 / Juni 2016",
                    DESCRIPTION:
                        `De opleiding MBO systeembeheerder heeft mij laten zien hoe interessant de ICT sector is. 
                    Tijdens deze opleiding leerde we servers beheren en configureren, netwerken aanleggen en programmeren in de taal Java.`,
                },
            ]
        },
        INTERSHIP: {
            CATEGORY: "Stage",
            SECTIONS: [
                {
                    TITLE: "Bluenotion",
                    SUBTITLE: "Programmeur",
                    DATE: "September-2019 / Januari 2020",
                    DESCRIPTION:
                        `Bij Bluenotion heb ik mijn afstudeerstage van het HBO volbracht. 
                    Als afstudeeropdracht heb ik samen met mijn afstudeerpartner een app gemaakt voor een externe partij. De app geeft het bedrijf de mogelijkheid om een plattegrond te creëren van een desbetreffende ruimte. Deze functionaliteit is gemaakt met behulp van Augmented Reality.`
                },
                {
                    TITLE: "Cloudy Hostings",
                    SUBTITLE: "Netwerkbeheerder",
                    DATE: "Januari 2015 / Juni 2016",
                    DESCRIPTION:
                        `Tijdens deze stage heb ik kennis opgedaan over het deployen van servers en het beheren van webshops. Dit bedrijf is gespecialiseerd in het verhuren van cloud omgevingen en hosten van websites.`,
                },
                {
                    TITLE: "CenterParcs",
                    SUBTITLE: "ServiceDesk Medewerker",
                    DATE: "Januari 2014 - Juni 2015",
                    DESCRIPTION:
                        `Hier heb ik mijn communicatie vaardigheden verbeterd en heb ik geleerd hoe ik snel en efficiënt computers kan deployen in het werkveld.`,
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
                        `De code die voor deze website geschreven is, is terug te vinden in dit project. In de toekomst zal ik meerdere functionaliteiten toevoegen aan dit project. Enkele voorbeelden zijn:
                    * Data opslag
                    * Agenda
                    `,
                    LINKS:
                        [
                            { NAME: "Web", LINK: "https://github.com/RickvanBerlo/Mercury_Web" },
                            // { NAME: "App", LINK: "https://github.com/RickvanBerlo/Mercury_App" },
                            // { NAME: "Api", LINK: "https://github.com/RickvanBerlo/Mercury_Api" },
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
    },
    CONTACT: {
        TITLE: "Wil je een bericht achter laten dan kun je dit doen via dit formulier",
        EMAIL: "Email",
        SUBJECT: "Onderwerp",
        DESCRIPTION: "Omschrijving",
    }
}

export default NL;