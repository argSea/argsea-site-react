import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Audiowide from "../../assets/audiowide.json";
import { Vector3 } from "three";
import mapIcons from "../../assets/icons";
import AboutMe from "./sections/AboutMe";
import Portfolio from "./sections/Portfolio/Portfolio";
import Globals from "../../globals/Globals";

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

extend({ TextGeometry });

const Home = ({ user: user }: { user: any }) => {
  const [project, setProject] = useState<iProject>({
    projectID: "project1",
    userIDs: ["userID1"],
    projectType: "type1",
    name: "Project1",
    shortName: "Project1",
    icon: "/defaulticon.png",
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
  });

  const portfolioOpts = {
    font: Globals("font"),
    size: 32,
    height: 0.1,
  };
  const contactOpts = {
    font: Globals("font"),
    size: 32,
    height: 0.1,
  };

  const portfolioPos = new Vector3(-125, -10, -50);
  const contactPos = new Vector3(-125, -10, -50);

  user.projects = [
    {
      projectID: "project1",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project1",
      shortName: "Project1",
      icon: "/defaulticon.png",
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
      icon: "/defaulticon.png",
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
    {
      projectID: "project3",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project3",
      shortName: "Project3",
      icon: "/defaulticon.png",
      slug: "project-3",
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
      projectID: "project4",
      userIDs: ["userID1"],
      projectType: "type1",
      name: "Project4",
      shortName: "Project4",
      icon: "/defaulticon.png",
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
  ];

  // mark aboutme class as active when scrolled to
  useEffect(() => {
    const aboutMe = document.getElementById("aboutme");
    const aboutMeNav = document.getElementsByClassName("aboutme")[0];
    const portfolio = document.getElementById("portfolio");
    const portfolioNav = document.getElementsByClassName("portfolio")[0];
    const contactMe = document.getElementById("contact-me");
    const contactMeNav = document.getElementsByClassName("contactme")[0];

    const navMap: Record<string, HTMLElement> = {
      aboutme: aboutMeNav as HTMLElement,
      portfolio: portfolioNav as HTMLElement,
      "contact-me": contactMeNav as HTMLElement,
    };

    const fadeMap: Record<string, HTMLElement> = {
      aboutme: aboutMe as HTMLElement,
      portfolio: portfolio as HTMLElement,
      "contact-me": contactMe as HTMLElement,
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navMap[entry.target.id].classList.add("active");
          fadeMap[entry.target.id].classList.remove("fadedOut");
          fadeMap[entry.target.id].classList.add("fadedIn");
        } else {
          navMap[entry.target.id].classList.remove("active");
          // fadeMap[entry.target.id].classList.add("fadedOut");
          // fadeMap[entry.target.id].classList.remove("fadedIn");
        }
      });
    }, options);

    observer.observe(aboutMe!);
    observer.observe(portfolio!);
    observer.observe(contactMe!);
  }, []);

  // santizie user.about
  useEffect(() => {
    user.about = DOMPurify.sanitize(user.about);
  }, [user.about]);

  let iconMap = mapIcons();

  return (
    <>
      <section id="aboutme" className="fadedOut">
        {<AboutMe user={user} />}
      </section>
      <section id="portfolio" className="fadedOut">
        <Canvas style={{ width: "100%", height: "100px" }}>
          <mesh position={portfolioPos}>
            {/* hide this error */}
            {/* @ts-ignore */}
            <textGeometry args={["Portfolio", portfolioOpts]} />
          </mesh>
        </Canvas>
        <Portfolio />
      </section>
      <section id="contact-me" className="fadedOut">
        <Canvas style={{ width: "100%", height: "100px" }}>
          <mesh position={contactPos}>
            {/* hide this error */}
            {/* @ts-ignore */}
            <textGeometry args={["Contact", contactOpts]} />
          </mesh>
        </Canvas>
      </section>
    </>
  );
};

export default Home;
