import {
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaFigma, FaDocker, FaPython, FaJava
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFirebase, SiPostgresql, SiSupabase } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";

export const TECH_DATA = [
    { name: "Next.js", icon: SiNextdotjs, category: "Frontend", color: "#ffffff", id: "nextjs" },
    { name: "React", icon: FaReact, category: "Frontend", color: "#61DAFB", id: "reactjs" },
    { name: "TypeScript", icon: SiTypescript, category: "Frontend", color: "#3178C6", id: "typescript" },
    { name: "Node.js", icon: FaNodeJs, category: "Backend", color: "#339933", id: "nodejs" },
    { name: "Firebase", icon: SiFirebase, category: "Backend", color: "#FFCA28", id: "firebase" },
    { name: "Tailwind", icon: SiTailwindcss, category: "Frontend", color: "#38B2AC", id: "tailwind" },
    { name: "JavaScript", icon: FaJs, category: "Frontend", color: "#F7DF1E", id: "javascript" },
    { name: "HTML5", icon: FaHtml5, category: "Frontend", color: "#E34F26", id: "html" },
    { name: "CSS3", icon: FaCss3Alt, category: "Frontend", color: "#1572B6", id: "css" },
    { name: "PostgreSQL", icon: SiPostgresql, category: "Backend", color: "#336791", id: "postgresql" },
    { name: "Supabase", icon: SiSupabase, category: "Backend", color: "#47A248", id: "supabase" },
    { name: "Python", icon: FaPython, category: "Backend", color: "#3776AB", id: "python" },
    { name: "Java", icon: FaJava, category: "Backend", color: "#007396", id: "java" },
    { name: "Git", icon: FaGitAlt, category: "Tools", color: "#F05032", id: "git" },
    { name: "Docker", icon: FaDocker, category: "Tools", color: "#2496ED", id: "docker" },
    { name: "Figma", icon: FaFigma, category: "Tools", color: "#F24E1E", id: "figma" },
    { name: "VS Code", icon: TbBrandVscode, category: "Tools", color: "#007ACC", id: "vscode" },
];