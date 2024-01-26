import parse from "html-react-parser";
import { FaGithubAlt, FaProjectDiagram, FaYoutube, FaLink } from "react-icons/fa";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import { AnimatePresence, motion } from "framer-motion";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "./ProjectCard.css";
import "./projectDrawer.css";
import iProject from "../../interfaces/iProject";
import { getSkillChoices } from "../../globals/Skills";
import { getRoleChoices } from "../../globals/Roles";

const ProjectCard = ({ project: project }: { project: iProject }) => {
  const [selected, setSelected] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  console.log(project);

  // check if project.projectType is set, if not, set it to "other"
  if (!project.projectType) {
    project.projectType = "other";
  }

  const skills = () => {
    if (!project.skills) {
      return <></>;
    }

    // only get first 7
    var skills = project.skills.map((tag, index) => {
      if (index > 6) {
        return <></>;
      }
      return (
        <div key={index} className="tag">
          <span>#</span>
          {tag}
        </div>
      );
    });

    return skills;
  };

  // do what skills does but get the skill choices from the global variable
  const skillsCapitalize = () => {
    if (!project.skills) {
      return <></>;
    }

    var skills = project.skills.map((tag, index) => {
      return (
        <span key={index} className="tag">
          {getSkillChoices().find((skill) => skill.id === tag)?.name}
        </span>
      );
    });

    return skills;
  };

  const getRoles = () => {
    if (!project.roles) {
      return <></>;
    }

    var roles = project.roles.map((role, index) => {
      return (
        <span key={index} className={"role " + role}>
          {getRoleChoices().find((r) => r.id === role)?.name}
        </span>
      );
    });

    return roles;
  };

  const activateCard = (e: any) => {
    setSelected(true);
  };

  const popupDrawer = (e: any) => {
    console.log("popupDrawer");
    const projectCard = e.target.closest(".project-card") as HTMLElement;
    projectCard.classList.add("active");

    const projectCardDrawer = document.getElementsByClassName("project-card-drawer")[0] as HTMLElement;
    projectCardDrawer.classList.add("active");

    // add overflow hidden to body
    document.body.classList.add("overflow-hidden");
  };

  const closeCard = (e: any) => {
    // deactive .project-card-drawer
    const projectCardDrawer = document.getElementsByClassName("project-card-drawer")[0] as HTMLElement;
    projectCardDrawer.classList.remove("active");

    // deactive .project-card
    const projectCard = e.target.closest(".project-card") as HTMLElement;
    projectCard.classList.remove("active");

    // remove overflow hidden from body
    document.body.classList.remove("overflow-hidden");

    setSelected(false);
  };

  const toggleOpen = (state: boolean) => () => setOpenLightbox(state);

  const setIndex = ({ index: current }: { index: number }) => {
    setLightboxIndex(current);
  };

  // check if project.images exists and if length > 0
  // if so, create a slider with all images
  let sliderImages: { src: string }[] = [];
  if (project.images && project.images.length > 0) {
    sliderImages = project.images.map((image, index) => {
      return { src: image.image.src };
    });
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="project-card"
          key={selected ? "selected" : "notSelected"}
          // key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, zIndex: selected ? 100 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {selected ? (
            <div id="project-card-drawer-container" onLoad={popupDrawer}>
              <div className="project-card-drawer">
                <div className="project-card-drawer-content">
                  <div className="project-card-drawer-title">{project.name}</div>
                  <div className="project-card-drawer-progress">
                    <div className="project-card-drawer-type">{project.projectType.replace(/\b\w/g, (l) => l.toUpperCase())}</div>
                    <div className="project-card-drawer-active">{project.isActive ? "Active" : "Inactive"}</div>
                    <div className="project-card-drawer-released">{project.isReleased ? "Released" : "Unreleased"}</div>
                  </div>
                  <div className="project-card-drawer-close">
                    <div className="project-card-drawer-close-button" onClick={closeCard}>
                      <svg
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        shapeRendering="geometricPrecision"
                      >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </div>
                  </div>
                  <div className="project-drawer-image-lightbox">
                    {project.images && project.images.length > 0 ? (
                      <>
                        <Lightbox
                          index={lightboxIndex}
                          slides={sliderImages}
                          plugins={[Inline]}
                          on={{
                            view: setIndex,
                            click: toggleOpen(true),
                          }}
                          carousel={{
                            padding: 0,
                            spacing: 0,
                            imageFit: "cover",
                          }}
                          inline={{
                            style: {
                              width: "100%",
                              height: "100%",
                              margin: "0 auto",
                            },
                          }}
                        />

                        <Lightbox
                          open={openLightbox}
                          close={toggleOpen(false)}
                          index={lightboxIndex}
                          slides={sliderImages}
                          plugins={[Counter]}
                          on={{
                            view: setIndex,
                          }}
                          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="project-drawer-description">{parse(project.description)}</div>
                  <div className="project-drawer-links">
                    <a href={project.repoURL} target="_blank" rel="noopener noreferrer">
                      <FaGithubAlt />
                    </a>
                    {/* iterate through project.links */}
                    {project.links &&
                      project.links.map((link, index) => {
                        return (
                          <a href={link.url} target="_blank" rel="noopener noreferrer" key={index}>
                            {/* check if link type is YouTube, case insensitive */}
                            {link.type.toLowerCase() === "youtube" ? <FaYoutube /> : <FaLink />}
                          </a>
                        );
                      })}
                  </div>
                  <div className="project-drawer-tags">{skillsCapitalize()}</div>
                  <div className="project-drawer-last-updated">{new Date(project.updatedDate).toLocaleString()}</div>
                  <div className="project-drawer-roles">{getRoles()}</div>
                </div>
              </div>
            </div>
          ) : (
            <div onClick={activateCard} className="project-card-container" style={{ cursor: "pointer" }}>
              <div className="project-card-front">
                {project.images && project.images.length > 0 ? (
                  <div className="project-card-front-image">
                    <img src={project.images[0].image.src} alt={project.images[0].image.alt} loading="lazy" />
                  </div>
                ) : (
                  <></>
                )}
                <div className="project-details">
                  <div className="project-icon">
                    <FaProjectDiagram size={30} />
                  </div>
                  <div className="project-tag-list">
                    <div className="tag-slider">
                      <div className="tag-slider-inner">
                        {skills()}
                        {skills()}
                      </div>
                    </div>
                    <div className="tag-fade" />
                  </div>
                  <div className="project-title">{project.name}</div>
                  <div className="project-progress">
                    <div className="project-progress-bar" style={{ width: project.progress + "%" }}>
                      <div className="project-progress-text">{project.progress}%</div>
                    </div>
                  </div>
                  <p className="project-description">{parse(project.shortDescription ? project.shortDescription : "")}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
