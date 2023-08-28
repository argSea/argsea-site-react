import React from "react";
import "./ProjectCard.css";

const ProjectCard = ({ title: title, description: description, imageURL: imageURL, tags: tags }: { title: string; description: string; imageURL: string; tags: string[] }) => {
  return (
    <div className="project-card">
      <img src={imageURL} alt={title} className="project-image" />
      <div className="project-details">
        <div className="project-title">{title}</div>
        <p className="project-description">{description}</p>
        <div className="tag-list">
          {tags.map((tag, index) => {
            return (
              <span key={index} className="tag">
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
