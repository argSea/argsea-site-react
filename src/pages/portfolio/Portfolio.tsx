import "./portfolio.css";
import ProjectCard from "./ProjectCard";
import iProject from "../../interfaces/iProject";

const Portfolio = ({ projects: projects }: { projects: iProject[] }) => {
  return (
    <>
      <div id="portfolio-info">
        <div id="portfolio-header">
          <div id="portfolio-header-text">.portfolio</div>
        </div>
        <div id="project-card-arrangement">
          {projects.map((project, index) => {
            return <ProjectCard key={project.slug} project={project} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Portfolio;
