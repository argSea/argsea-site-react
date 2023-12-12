import React, { useState } from "react";
import parse from "html-react-parser";
import { motion, useAnimationControls } from "framer-motion";
import Header from "../../../template/header/Header";
import Footer from "../../../template/footer/Footer";
import { UserContext } from "../../../contexts/UserContext";
import { useParams } from "react-router-dom";
import iProject from "../../../interfaces/iProject";
import { FaGithubAlt, FaProjectDiagram } from "react-icons/fa";
import "../../portfolio/ProjectCard.css";
import "./singleProject.css";
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Counter from "yet-another-react-lightbox/plugins/counter";

const SingleProject = (props: any) => {
  const { projectSlug } = useParams();
  const [user, setUser] = React.useContext(UserContext) as any;
  const [openLightbox, setOpenLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // get slug from route params
  const slug = projectSlug as string;

  // find user.project matching slug
  const project = user.projects.find((project: any) => project.slug === slug) as iProject;

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

  const closeCard = () => {
    return null;
  };

  const setIndex = ({ index: current }: { index: number }) => {
    setLightboxIndex(current);
  };

  const toggleOpen = (state: boolean) => () => setOpenLightbox(state);

  let sliderImages: { src: string }[] = [];
  if (project.images && project.images.length > 0) {
    sliderImages = project.images.map((image, index) => {
      return { src: image.image.src };
    });
  }

  console.log(slug);
  console.log(project);
  return (
    <>
      <Header />
      <div id="single-project">
        <div className="single-project-name">{project.name}</div>
        <motion.section
          layout
          initial={{ rotateY: 0 }}
          // animate={{ rotateY: 180, transition: { duration: 1 } }}
          exit={{ rotateY: 0 }}
          id="single-project-details"
          layoutId={project.slug}
          // onAnimationComplete={navigateToProject}
        >
          {/* <div className="single-project-close">
            <div className="single-project-close-button" onClick={closeCard}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path d="M15.5 6.5L8.5 12L15.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div> */}
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
          <div className="project-card-back-details">
            <div className="project-card-back-links">
              <a href={project.repoURL} target="_blank" rel="noopener noreferrer">
                <FaGithubAlt />
              </a>
            </div>
          </div>
        </motion.section>
      </div>
      <Footer user={user} />
    </>
  );
};

export default SingleProject;
