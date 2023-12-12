import parse from "html-react-parser";
import { FaProjectDiagram, FaGithubAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "./ProjectCard.css";
import iProject from "../../interfaces/iProject";
import { useNavigate } from "react-router-dom";
import { animate, motion, useAnimationControls } from "framer-motion";

const ProjectCard = ({ project: project }: { project: iProject }) => {
  const controls = useAnimationControls();
  const navi = useNavigate();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
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

  const activateCard = (e: any) => {
    console.log(e);
    controls.start("animate");
  };

  const navigateToProject = (e: any) => {
    // get link
    const link = "/projects/" + project.slug;

    // go to link using react router
    navi(link);
  };

  const toggleOpen = (state: boolean) => () => setOpenLightbox(state);

  const setIndex = ({ index: current }: { index: number }) => {
    setLightboxIndex(current);
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

  // check if project.images exists and if length > 0
  // if so, create a slider with all images
  let sliderImages: { src: string }[] = [];
  if (project.images && project.images.length > 0) {
    sliderImages = project.images.map((image, index) => {
      return { src: image.image.src };
    });
  }

  return (
    // <div className="project-card" style={{ backgroundImage: `url(` + project.icon + `)` }}></div>
    <>
      <motion.div
        layout
        className="project-card"
        onClick={navigateToProject}
        whileHover={{ rotateZ: [0, -10] }}
        layoutId={project.slug}
        transition={{
          layout: { duration: 0.5 },
        }}
      >
        <div className="project-card-container">
          <div
            className="project-card-front"
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
          <div className="project-card-back"></div>
        </div>
      </motion.div>
    </>
  );
};

export default ProjectCard;
