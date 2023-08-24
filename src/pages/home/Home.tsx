import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import HTMLReactParser from "html-react-parser";
import { Canvas, extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import Audiowide from "../../assets/audiowide.json";
import { Vector3 } from "three";

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

interface iInterest {
  name: string;
  icon: string;
  interestLevel: number;
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

  const font = new FontLoader().parse(Audiowide);

  const aboutMeOpts = {
    font,
    size: 32,
    height: 0.1,
  };
  const portfolioOpts = {
    font,
    size: 32,
    height: 0.1,
  };

  const aboutMePos = new Vector3(-125, -10, -50);
  const portfolioPos = new Vector3(-125, -10, -50);

  // mark aboutme class as active when scrolled to
  useEffect(() => {
    const aboutMe = document.getElementById("aboutme");
    const aboutMeNav = document.getElementsByClassName("aboutme")[0];
    const portfolio = document.getElementById("portfolio");
    const portfolioNav = document.getElementsByClassName("portfolio")[0];

    const navMap: Record<string, HTMLElement> = {
      aboutme: aboutMeNav as HTMLElement,
      portfolio: portfolioNav as HTMLElement,
    };

    const fadeMap: Record<string, HTMLElement> = {
      aboutme: aboutMe as HTMLElement,
      portfolio: portfolio as HTMLElement,
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
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
  }, []);

  return (
    <>
      <section id="aboutme" className="fadedOut">
        <Canvas className="section_header" style={{ width: "100%", height: "100px" }}>
          <mesh position={aboutMePos}>
            {/* hide this error */}
            {/* @ts-ignore */}
            <textGeometry args={["About Me", aboutMeOpts]} />
          </mesh>
        </Canvas>
        <div id="aboutme_info">
          <div id="aboutme_text">
            <div id="welcome">
              <div id="welcome_text">
                <span id="big_welcome">Hiya!</span> My name is <span id="colored_name">{user.firstName}</span>,
              </div>
            </div>
            {HTMLReactParser(user.about)}
          </div>
          <div id="aboutme_tech_interests">
            <h2>My Technical Interests</h2>
            <ul>
              {user.techInterests.map((interest: iInterest) => (
                <li>
                  {interest.name};; {interest.icon} ;; {interest.interestLevel}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section id="portfolio" className="fadedOut">
        <Canvas style={{ width: "100%", height: "100px" }}>
          <mesh position={portfolioPos}>
            {/* hide this error */}
            {/* @ts-ignore */}
            <textGeometry args={["Portfolio", portfolioOpts]} />
          </mesh>
        </Canvas>
        <div></div>
      </section>
    </>
  );
};

export default Home;
