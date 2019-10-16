const pages = [
    {
        id: 12314,
        type: 1,
        kuerzel: "A 1",
        template_file: "",
        kapitel: 1,
        titel: "Übersicht",
        filename: "uebersicht",
        printfile: "",
        verweis_titel: "",
        mediaquery: 0,
        pagenumber: ""
    },
    {
        id: 1,
        type: 0,
        kuerzel: "A 1",
        template_file: "",
        kapitel: 1,
        titel: "Physikalisch-technische Grundlagen",
        filename: "",
        printfile: "",
        verweis_titel: "Physikalisch-technische Grundlagen",
        mediaquery: 0,
        pagenumber: "", pages: [


            {
                id: 4,
                type: 1,
                kuerzel: "A 1.2",
                template_file: "",
                kapitel: 1,
                titel: "Einleitung",
                filename: "einleitung",
                printfile: "fachinformationen_a.pdf",
                verweis_titel: "Einleitung",
                mediaquery: 0,
                pagenumber: "5", verweise: [
                    {
                        type: 2,
                        kuerzel: "ArbSchG",
                        titel: "Arbeitsschutzgesetz",
                        kapitel: 0,
                        open_cmd: "vorschriften/arbschg.pdf",
                        pagenumber: "0"
                    },
                    {
                        type: 2,
                        kuerzel: "ASiG",
                        titel: "Arbeitssicherheitsgesetz",
                        kapitel: 0,
                        open_cmd: "vorschriften/asig.pdf",
                        pagenumber: "0"
                    },
                    {
                        type: 3,
                        kuerzel: "DGUV Vorschrift 1",
                        titel: "Grundsätze der Prävention",
                        kapitel: 0,
                        open_cmd: "https://bgrciuvven.vur.jedermann.de/bgrciuvven/xhtml/document.jsf?docId=bgrciuvven_bgv/bgrciuvven_bgv-Documents/dv1/dv1_0_.html",
                        pagenumber: "0"
                    }]
            },

            {
                id: 5,
                type: 1,
                kuerzel: "A 1.3",
                template_file: "",
                kapitel: 1,
                titel: "Vorgesetzte",
                filename: "vorgesetzte",
                printfile: "fachinformationen_a.pdf",
                verweis_titel: "Vorgesetzte",
                mediaquery: 0,
                pagenumber: "7", verweise: [
                    {
                        type: 3,
                        kuerzel: "DGUV Vorschrift 1",
                        titel: "Grundsätze der Prävention, Kapitel 2",
                        kapitel: 0,
                        open_cmd: "https://bgrciuvven.vur.jedermann.de/bgrciuvven/xhtml/document.jsf?docId=bgrciuvven_bgv/bgrciuvven_bgv-Documents/dv1/dv1_4_.html",
                        pagenumber: "0"
                    }]
            },
        ]
    },

    {
        id: 2,
        type: 0,
        kuerzel: "A 1",
        template_file: "",
        kapitel: 1,
        titel: "Verantwortung im Labor",
        filename: "",
        printfile: "",
        verweis_titel: "Verantwortung im Labor",
        mediaquery: 0,
        pagenumber: "", pages: [

            {
                id: 43,
                type: 1,
                kuerzel: "A 1.1",
                template_file: "",
                kapitel: 1,
                titel: "Einleitung",
                filename: "verantwortung_einleitung",
                printfile: "fachinformationen_a.pdf",
                verweis_titel: "Verantwortung im Labor - Einleitung",
                mediaquery: 0,
                pagenumber: "4",
            },

            {
                id: 44,
                type: 1,
                kuerzel: "A 1.2",
                template_file: "",
                kapitel: 1,
                titel: "Arbeitgeber",
                filename: "arbeitgeber.htm",
                printfile: "test1",
                verweis_titel: "Arbeitgeber",
                mediaquery: 0,
                pagenumber: "5", verweise: [
                    {
                        type: 2,
                        kuerzel: "ArbSchG",
                        titel: "Arbeitsschutzgesetz",
                        kapitel: 0,
                        open_cmd: "vorschriften/arbschg.pdf",
                        pagenumber: "0"
                    },
                    {
                        type: 2,
                        kuerzel: "ASiG",
                        titel: "Arbeitssicherheitsgesetz",
                        kapitel: 0,
                        open_cmd: "vorschriften/asig.pdf",
                        pagenumber: "0"
                    },
                    {
                        type: 3,
                        kuerzel: "DGUV Vorschrift 1",
                        titel: "Grundsätze der Prävention",
                        kapitel: 0,
                        open_cmd: "https://bgrciuvven.vur.jedermann.de/bgrciuvven/xhtml/document.jsf?docId=bgrciuvven_bgv/bgrciuvven_bgv-Documents/dv1/dv1_0_.html",
                        pagenumber: "0"
                    }]
            },

            {
                id: 45,
                type: 1,
                kuerzel: "A 1.3",
                template_file: "",
                kapitel: 1,
                titel: "Vorgesetzte",
                filename: "test2",
                printfile: "fachinformationen_a.pdf",
                verweis_titel: "Vorgesetzte",
                mediaquery: 0,
                pagenumber: "7", verweise: [
                    {
                        type: 3,
                        kuerzel: "DGUV Vorschrift 1",
                        titel: "Grundsätze der Prävention, Kapitel 2",
                        kapitel: 0,
                        open_cmd: "https://bgrciuvven.vur.jedermann.de/bgrciuvven/xhtml/document.jsf?docId=bgrciuvven_bgv/bgrciuvven_bgv-Documents/dv1/dv1_4_.html",
                        pagenumber: "0"
                    }]
            },
        ]

    },
    {
        id: 124131314,
        type: 1,
        kuerzel: "A 1",
        template_file: "",
        kapitel: 1,
        titel: "Ende",
        filename: "test",
        printfile: "",
        verweis_titel: "",
        mediaquery: 0,
        pagenumber: ""
    },



];

export default pages;