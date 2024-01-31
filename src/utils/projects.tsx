import {
    SkillCSS3,
    SkillHTML5,
    SkillTypeScript,
    SkillJavaScript,
    SkillNextJS,
    SkillPHP,
    SkillJSX,
} from "./skills";

export const projects = [
    {
        title: "Guns Airsoft Arena",
        description: "Prévia",
        images: [
            '/images/_p1/01.png',
            '/images/_p1/02.png',
            '/images/_p1/03.png',
        ],
        secondaryImages: [
            '/images/_p1/01.png',
            '/images/_p1/02.png',
            '/images/_p1/03.png',
            '/images/_p1/04.png',
            '/images/_p1/05.png',
            '/images/_p1/06.png',
            '/images/_p1/07.png',
            '/images/_p1/08.png',
            '/images/_p1/09.png',
        ],
        technologies: [
            {Component: SkillCSS3, tooltipContent: 'CSS3' },
            {Component: SkillHTML5, tooltipContent: 'HTML5' },
            {Component: SkillNextJS, tooltipContent: 'NextJS' },
            // {Component: SkillJavaScript, tooltipContent: 'JavaScript' },
            {Component: SkillJSX, tooltipContent: 'JSX' },
        ],
    },

    {
        title: "Sr. & Sra. Bem Estar",
        description: "Projeto de curso",
        images: [
            '/images/_p2/01.png',
            '/images/_p2/02.png',
            '/images/_p2/03.png',
        ],
        secondaryImages: [
            '/images/_p2/01.png',
            '/images/_p2/02.png',
            '/images/_p2/03.png',
            '/images/_p2/04.png',
            '/images/_p2/05.png',
            '/images/_p2/06.png',
            '/images/_p2/07.png',
            '/images/_p2/08.png',
            '/images/_p2/09.png',
        ],
        technologies: [
            {Component: SkillCSS3, tooltipContent: 'CSS3' },
            {Component: SkillHTML5, tooltipContent: 'HTML5' },
            {Component: SkillPHP, tooltipContent: 'PHP' },
        ],
    },
    {
        title: "Portfólio",
        description: "Projeto pessoal",
        images: [
            '/images/_p3/01.png',
            '/images/_p3/02.png',
        ],
        secondaryImages: [
            '/images/_p3/01.png',
            '/images/_p3/02.png',
        ],
        technologies: [
            {Component: SkillCSS3, tooltipContent: 'CSS3' },
            {Component: SkillHTML5, tooltipContent: 'HTML5' },
            {Component: SkillNextJS, tooltipContent: 'NextJS' },
            {Component: SkillTypeScript, tooltipContent: 'TypeScript' },
        ],
    },
];