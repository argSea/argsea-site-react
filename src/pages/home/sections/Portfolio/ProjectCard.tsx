import React from "react";
import "./ProjectCard.css";
import iProject from "../../../../interfaces/iProject";

const ProjectCard = ({ project: project }: { project: iProject }) => {
  return (
    <div className="project-card" style={{ backgroundImage: `url(` + project.icon + `)` }}>
      {/* <img src={imageURL} alt={title} className="project-image" /> */}
      <div className="project-tag-list">
        {project.skills.map((tag, index) => {
          return (
            <span key={index} className="tag">
              {tag}
            </span>
          );
        })}
      </div>
      <div className="project-details">
        <div className="project-title">{project.shortName}</div>
        <p className="project-description">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
