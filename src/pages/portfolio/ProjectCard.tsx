import parse from "html-react-parser";
import "./ProjectCard.css";
import iProject from "../../interfaces/iProject";

// font awesome
import { FaProjectDiagram, FaGithubAlt } from "react-icons/fa";
import { useEffect } from "react";

const ProjectCard = ({ project: project }: { project: iProject }) => {
  const dataAttribute = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
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

  const roles = () => {
    if (!project.roles) {
      return <></>;
    }

    var roles = project.roles.map((tag, index) => {
      return (
        <span key={index} className="role">
          {tag}
        </span>
      );
    });

    return roles;
  };

  const showMoreDetails = (e: any) => {
    console.log(e.target);

    const projectCard = document.querySelectorAll(".project-card");
    projectCard.forEach((projectCardContainer) => {
      projectCardContainer.classList.remove("active");
    });

    const thisProjectCard = e.target.closest(".project-card");

    // get container class for this project card
    const thisProjectCardContainer = thisProjectCard.querySelector(".project-card-container");

    // find offset for top and left
    const offsetTop = thisProjectCardContainer.offsetTop;
    const offsetLeft = thisProjectCardContainer.offsetLeft;

    // find center of screen using #project-card-arrangement
    const projectCardArrangement = document.getElementById("project-card-arrangement") as HTMLElement;
    const projectCardArrangementOffsetLeft = projectCardArrangement.getBoundingClientRect().left;
    const projectCardArrangementOffsetTop = projectCardArrangement.getBoundingClientRect().top;
    const projectCardArrangementWidth = projectCardArrangement.getBoundingClientRect().width;
    const projectCardWidth = thisProjectCardContainer.getBoundingClientRect().width;
    const projectCardHeight = thisProjectCardContainer.getBoundingClientRect().height;
    const viewPortCenterX = window.innerWidth / 2;
    const viewPortCenterY = window.innerHeight / 2;

    const centerX = viewPortCenterX - projectCardArrangementOffsetLeft;
    const centerY = viewPortCenterY - projectCardArrangementOffsetTop - projectCardHeight;

    // set current offsets to data attributes
    thisProjectCardContainer.setAttribute("data-offset-top", offsetTop);
    thisProjectCardContainer.setAttribute("data-offset-left", offsetLeft);

    // move to center y
    // thisProjectCardContainer.style.top = centerY + "px";
    // move to center x
    // thisProjectCardContainer.style.left = centerX + "px";

    thisProjectCard.classList.add("active");

    // hide all other project cards
    projectCard.forEach((projectCardContainer) => {
      if (projectCardContainer !== thisProjectCard) {
        projectCardContainer.classList.add("hidden");
      }
    });
  };

  const closeMoreDetails = (e: any) => {
    console.log(e.target);

    const projectCard = document.querySelectorAll(".project-card");
    projectCard.forEach((projectCardContainer) => {
      projectCardContainer.classList.remove("active");
    });

    // show all other project cards
    projectCard.forEach((projectCardContainer) => {
      projectCardContainer.classList.remove("hidden");
    });

    // get container class for this project card
    const thisProjectCardContainer = e.target.closest(".project-card-container");

    // get offsets from data attributes
    const offsetTop = thisProjectCardContainer.getAttribute("data-offset-top");
    const offsetLeft = thisProjectCardContainer.getAttribute("data-offset-left");

    // move back to original position
    // thisProjectCardContainer.style.top = offsetTop + "px";
    // thisProjectCardContainer.style.left = offsetLeft + "px";
  };

  useEffect(() => {
    // find all project-card-containers and set their position to absolute and top and left
    const projectCardContainers = document.querySelectorAll(".project-card-container");
    projectCardContainers.forEach((projectCardContainer) => {
      // find offset for top and left
      const offsetTop = projectCardContainer.getBoundingClientRect().top;
      const offsetLeft = projectCardContainer.getBoundingClientRect().left;

      // find offset for #project-card-arrangement
      const projectCardArrangement = document.getElementById("project-card-arrangement") as HTMLElement;
      const projectCardArrangementOffsetTop = projectCardArrangement.getBoundingClientRect().top;
      const projectCardArrangementOffsetLeft = projectCardArrangement.getBoundingClientRect().left;

      // set position absolute and top and left of Element
      // projectCardContainer.setAttribute(
      //   "style",
      //   "position: absolute; top: " + (offsetTop - projectCardArrangementOffsetTop) + "px; left: " + (offsetLeft - projectCardArrangementOffsetLeft) + "px;"
      // );
    });
  }, []);

  return (
    // <div className="project-card" style={{ backgroundImage: `url(` + project.icon + `)` }}></div>
    <>
      <div className="project-card">
        <div className="project-card-container">
          <div
            className="project-card-front"
            onClick={showMoreDetails}
            // style={{ backgroundImage: project.images && project.images.length > 0 ? `url(` + project.images[0].image.src + `)` : `url(` + project.icon + `)` }}
          >
            {/* <img src={imageURL} alt={title} className="project-image" /> */}
            {project.images && project.images.length > 0 ? (
              <div className="project-card-front-image">
                <img src={project.images[0].image.src} alt={project.images[0].image.alt} />{" "}
              </div>
            ) : (
              <></>
            )}
            <div className="project-details">
              <div className="project-icon">
                <FaProjectDiagram size={30} />
              </div>
              <div className="project-tag-list">{skills()}</div>
              <div className="project-title">{project.name}</div>
              <div className="project-progress">
                <div className="project-progress-bar" style={{ width: project.progress + "%" }}>
                  <div className="project-progress-text">{project.progress}%</div>
                </div>
              </div>
              <p className="project-description">{parse(project.description)}</p>
            </div>
          </div>
          <div className="project-card-back" onClick={closeMoreDetails}>
            {/* if project.images exists, use the first one */}
            {project.images && project.images.length > 0 ? (
              <div className="project-card-back-image">
                <img src={project.images[0].image.src} alt={project.images[0].image.alt} />{" "}
              </div>
            ) : (
              <></>
            )}
            <div className="project-card-back-details">
              <div className="project-card-back-title">{project.name}</div>
              <div className="project-card-back-description">{parse(project.description)}</div>
              <div className="project-card-back-links">
                <a href={project.repoURL} target="_blank" rel="noopener noreferrer">
                  <FaGithubAlt />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
