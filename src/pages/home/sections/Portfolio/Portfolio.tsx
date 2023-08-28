import React, { useEffect, useState } from "react";
import "./portfolio.css";
import ProjectCard from "./ProjectCard";

interface iProject {
  projectID: string;
  userIDs: string[];
  projectType: string;
  name: string;
  shortName: string;
  icon: string;
  slug: string;
  repoURL: string;
  description: string;
  skills: string[];
  roles: string[];
  priority: number;
  isActive: boolean;
  isReleased: boolean;
  bookID: string;
  relatedCourse: string;
  relatedExperience: [];
  links: string[];
  snippets: string[];
  features: string[];
}

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
  return (
    <>
      <div id="portfolio_info">
        <div className="project-list">
          {projects.map((project, index) => {
            return <ProjectCard key={index} title={project.name} description={project.description} imageURL={project.icon} tags={project.skills} />;
          })}
        </div>
      </div>
    </>
  );
}

export default Portfolio;
