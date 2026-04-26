import { FaCss3Alt, FaHtml5, FaJava, FaJs, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiSpringboot,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";

export const technologies = [
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", percentage: "32%" },
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E", percentage: "28%" },
  { name: "Java", icon: FaJava, color: "#ED8B00", percentage: "15%" },
  { name: "Python", icon: FaPython, color: "#3776AB", percentage: "10%" },
  { name: "C#", icon: TbBrandCSharp, color: "#239120", percentage: "8%" },
  { name: "HTML", icon: FaHtml5, color: "#E34F26", percentage: "7%" },
  { name: "CSS", icon: FaCss3Alt, color: "#1572B6", percentage: "5%" },
  { name: "React", icon: FaReact, color: "#61DAFB", percentage: "90%" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933", percentage: "80%" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#47A248", percentage: "75%" },
  { name: "Express.js", icon: SiExpress, color: "#f8fafc", percentage: "70%" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", percentage: "85%" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", percentage: "65%" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", percentage: "70%" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1", percentage: "75%" },
] as const;
