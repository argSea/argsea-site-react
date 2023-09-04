import React from "react";
import "./ProjectCard.css";
import iProject from "../../interfaces/iProject";

// font awesome
import { FaBacon, FaGithub, FaGithubAlt } from "react-icons/fa";

const ProjectCard = ({ project: project }: { project: iProject }) => {
  console.log(project);
  const skills = () => {
    if (!project.skills) {
      return <></>;
    }

    var skills = project.skills.map((tag, index) => {
      return (
        <span key={index} className="tag">
          {tag}
        </span>
      );
    });

    return skills;
  };

  return (
    // <div className="project-card" style={{ backgroundImage: `url(` + project.icon + `)` }}></div>
    <div className="project-card">
      <div className="project-card-contents">
        {/* <img src={imageURL} alt={title} className="project-image" /> */}
        <div className="project-details">
          <div className="project-icon">
            <FaBacon size={50} />
          </div>
          <div className="project-tag-list">{skills()}</div>
          <div className="project-title">{project.name}</div>
          <div className="project-progress">
            <div className="project-progress-bar" style={{ width: project.progress + "%" }}>
              <div className="project-progress-text">{project.progress}%</div>
            </div>
          </div>
          <p className="project-description">
            {project.description}
            <br></br>
            {project.description}
            <br></br>
            {project.description}
          </p>
          <div className="project-links">
            <a href={project.repoURL} target="_blank" rel="noopener noreferrer">
              <FaGithubAlt />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
