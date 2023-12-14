import React, { useEffect, useState } from "react";
import "./portfolio.css";
import ProjectCard from "./ProjectCard";
import iProject from "../../interfaces/iProject";
import { MotionConfig, motion, useAnimationControls } from "framer-motion";

const Portfolio = ({ projects: projects }: { projects: iProject[] }) => {
  const controls = useAnimationControls();

  // const [nav1, setNav1] = useState<any>(null);
  // const [nav2, setNav2] = useState<any>(null);

  // function FaPrevArrow(props: any) {
  //   const { className, style, onClick } = props;
  //   return <FaChevronLeft size={25} className={className} style={{ ...style, display: "block", color: "white" }} onClick={onClick} />;
  // }

  // function FaNextArrow(props: any) {
  //   const { className, style, onClick } = props;
  //   return <FaChevronRight size={35} className={className} style={{ ...style, display: "block", color: "white" }} onClick={onClick} />;
  // }

  // const settings1 = {
  //   slidesToShow: 1,
  //   arrows: true,
  //   autoplay: false,
  //   autoplaySpeed: 3000,
  //   prevArrow: <FaPrevArrow />,
  //   nextArrow: <FaNextArrow />,
  // };

  // const settings2 = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   dots: false,
  //   centerMode: true,
  //   focusOnSelect: true,
  //   infinite: true,
  //   arrows: false,
  // };

  const fadeOtherCards = {
    initial: { opacity: 1 },
    animate: { opacity: 0, transition: { duration: 0.5 } },
    exit: { opacity: 1 },
  };

  return (
    <>
      <div id="portfolio-info">
        <div id="portfolio-header">
          <div id="portfolio-header-text">.portfolio</div>
        </div>
        {/* <div className="project-carousel">
          <Slider className="project-strip" ref={(slider1: any) => setNav1(slider1)} asNavFor={nav2} {...settings2}>
            {projects.map((project, index) => {
              return <ProjectCard project={project} />;
            })}
          </Slider>
          <div className="project-screen">
            <Slider className="project-detail" ref={(slider2: any) => setNav2(slider2)} asNavFor={nav1} {...settings1}>
              {projects.map((project, index) => {
                return <ProjectCard project={project} />;
              })}
            </Slider>
            <div className="screen-frame"></div>
          </div>
        </div> */}
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
