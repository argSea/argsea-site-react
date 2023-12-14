import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";
import parse from "html-react-parser";
import iProject from "../../interfaces/iProject";
import { FaGithubAlt } from "react-icons/fa";
import "./projectDrawer.css";
import { Root } from "react-dom/client";
import { motion } from "framer-motion";

export const ProjectDrawer = ({ project: project }: { project: iProject }) => {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const setIndex = ({ index: current }: { index: number }) => {
    setLightboxIndex(current);
  };

  const toggleOpen = (state: boolean) => () => setOpenLightbox(state);

  const closeCard = () => {
    // get #project-card-drawer
    // const projectCardDrawer = document.getElementById("project-card-drawer") as HTMLElement;
    // // set #project-card-drawer to inactive
    // projectCardDrawer.classList.remove("active");
    // // wait 0.3s
    // setTimeout(() => {
    //   // get #projectDrawer
    //   const projectDrawer = document.getElementById("projectDrawer") as HTMLElement;
    //   // set #projectDrawer to inactive
    //   projectDrawer.classList.remove("active");
    // }, 350);
  };

  let sliderImages: { src: string }[] = [];
  if (project.images && project.images.length > 0) {
    sliderImages = project.images.map((image, index) => {
      return { src: image.image.src };
    });
  }

  useEffect(() => {
    // mark project-card-drawer as active
    const projectCardDrawer = document.getElementById("project-card-drawer") as HTMLElement;
    // projectCardDrawer.classList.add("active");
  }, []);

  return (
    <motion.div layout="position" id="project-card-drawer" layoutId={project.slug}>
      <div className="project-card-drawer-content">
        <div className="single-project-name">{project.name}</div>
        <div className="single-project-close">
          <div className="single-project-close-button" onClick={closeCard}>
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
        {project.images && project.images.length > 0 ? (
          <div className="single-project-image-lightbox">
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
          </div>
        ) : (
          <></>
        )}
        <div className="single-project-description">{parse(project.description)}</div>
        <div className="project-card-back-links">
          <a href={project.repoURL} target="_blank" rel="noopener noreferrer">
            <FaGithubAlt />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
