import { useEffect } from "react";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import {
    SkillCSS3,
    SkillHTML5,
    SkillNodeJS,
    SkillJavaScript,
    SkillLua,
    SkillReactJS,
    SkillTypeScript,
    SkillNextJS,
    SkillMySQL,
    SkillJSX,
    SkillTSX
} from "@/utils/skills";

import "@/styles/skills.css";


function SkillsPage() {
    useEffect(() => {
        window.dispatchEvent(new Event("resize"));
    }, []);

    const skills = [
        { SkillComponent: SkillReactJS, tooltipContent: "ReactJS / React-Native" },
        { SkillComponent: SkillNextJS, tooltipContent: "NextJS" },
        { SkillComponent: SkillNodeJS, tooltipContent: "NodeJS" },
        { SkillComponent: SkillJavaScript, tooltipContent: "JavaScript" },
        { SkillComponent: SkillTypeScript, tooltipContent: "TypeScript" },
        { SkillComponent: SkillHTML5, tooltipContent: "HTML5" },
        { SkillComponent: SkillCSS3, tooltipContent: "CSS3" },
        { SkillComponent: SkillLua, tooltipContent: "Lua" },
        { SkillComponent: SkillMySQL, tooltipContent: "MySQL" }
        // { SkillComponent: SkillJSX, tooltipContent: "JSX" },
        // { SkillComponent: SkillTSX, tooltipContent: "TSX" }
    ];

    const renderSkills = () => {
        return (
            <div data-aos="fade-right" className="skills-technologies">
                {skills.map((skill, index) => (
                    <div
                        className="skills-technologies-content"
                        data-tooltip-id={`tooltip-${index}`}
                        data-tooltip-content={skill.tooltipContent}
                        key={index}
                    >
                        <skill.SkillComponent />
                    </div>
                ))}
            </div>
        );
    };

    const renderTooltips = () => {
        return skills.map((skill, index) => (
            <Tooltip
                id={`tooltip-${index}`}
                key={index}
                arrowColor="rgba(3, 126, 219, 0.4)"
                style={{ backgroundColor: "rgba(3, 126, 219, 0.4)", borderRadius: "5px" }}
            />
        ));
    };

    return (
        <div className="skills-container">
            <h1 data-aos="fade-left">My Technologies 📋</h1>
            {renderSkills()}
            {renderTooltips()}
        </div>
    );
}

export default SkillsPage;
