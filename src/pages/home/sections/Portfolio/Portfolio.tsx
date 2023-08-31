import React, { useEffect, useState } from "react";
import "./portfolio.css";
import ProjectCard from "./ProjectCard";
// import slick carousel css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import iProject from "../../../../interfaces/iProject";

function Portfolio() {
  // can have multiple projects
  const [projects, setProjects] = useState<iProject[]>([
    {
      projectID: "project1",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project1",
      shortName: "Project1",
      icon: "https://www.ilovefreesoftware.com/wp-content/uploads/2019/11/5-free-Fake-Code-Generator-Websites-to-Generate-test-Programming-Code.jpg",
      slug: "project-1",
      repoURL: "github.com",
      description: "Description",
      skills: ["C++", "C#", "Java"],
      roles: ["Sole Contributor"],
      priority: 10,
      isActive: false,
      isReleased: false,
      bookID: "bookID1",
      relatedCourse: "",
      relatedExperience: [],
      links: ["argsea.com"],
      snippets: ["Snippet1"],
      features: ["Feature1"],
    },
    {
      projectID: "project2",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project2",
      shortName: "Project2",
      icon: "https://media.istockphoto.com/id/1339920930/video/close-up-green-lines-of-random-program-code-fast-scrolling-on-a-computer-screen-terminal.jpg?s=640x640&k=20&c=sFZq5GNd6L3PkQzklCGxOEy8XYlPYYwc5DzPMv_PoAQ=",
      slug: "project-2",
      repoURL: "github.com",
      description: "Description",
      skills: ["C++", "C#", "Java"],
      roles: ["Sole Contributor"],
      priority: 10,
      isActive: false,
      isReleased: false,
      bookID: "bookID1",
      relatedCourse: "",
      relatedExperience: [],
      links: ["argsea.com"],
      snippets: ["Snippet1"],
      features: ["Feature1"],
    },
    {
      projectID: "project3",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project3",
      shortName: "Project3",
      icon: "https://woz-u.com/wp-content/uploads/2022/06/Evolution-of-Coding-scaled.jpg",
      slug: "project-3",
      repoURL: "github.com",
      description: "Description",
      skills: ["C++", "C#", "Java"],
      roles: ["Sole Contributor"],
      priority: 10,
      isActive: false,
      isReleased: false,
      bookID: "bookID1",
      relatedCourse: "",
      relatedExperience: [],
      links: ["argsea.com"],
      snippets: ["Snippet1"],
      features: ["Feature1"],
    },
    {
      projectID: "project4",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project4",
      shortName: "Project4",
      icon: "https://www.zdnet.com/a/img/resize/a0dcec40a8cd8d2e1b3a9e12a05c2819622d20be/2021/07/19/8a337c80-5ed6-43a1-98fb-b981d420890f/programming-languages-shutterstock-1680857539.jpg?auto=webp&fit=crop&height=1200&width=1200",
      slug: "project-4",
      repoURL: "github.com",
      description: "Description",
      skills: ["C++"],
      roles: ["Sole Contributor"],
      priority: 10,
      isActive: false,
      isReleased: false,
      bookID: "bookID1",
      relatedCourse: "",
      relatedExperience: [],
      links: ["argsea.com"],
      snippets: ["Snippet1"],
      features: ["Feature1"],
    },
  ]);

  const [nav1, setNav1] = useState<any>(null);
  const [nav2, setNav2] = useState<any>(null);

  function FaPrevArrow(props: any) {
    const { className, style, onClick } = props;
    return <FaChevronLeft size={25} className={className} style={{ ...style, display: "block", color: "white" }} onClick={onClick} />;
  }

  function FaNextArrow(props: any) {
    const { className, style, onClick } = props;
    return <FaChevronRight size={35} className={className} style={{ ...style, display: "block", color: "white" }} onClick={onClick} />;
  }

  const settings1 = {
    slidesToShow: 1,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    prevArrow: <FaPrevArrow />,
    nextArrow: <FaNextArrow />,
  };

  const settings2 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    arrows: false,
  };

  return (
    <>
      <div id="portfolio-info">
        <div id="portfolio-header">
          <div id="portfolio-header-text">.portfolio</div>
        </div>
        <div className="project-carousel">
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
        </div>
      </div>
    </>
  );
}

export default Portfolio;
