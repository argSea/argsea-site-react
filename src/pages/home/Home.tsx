import { Suspense, useEffect, useState } from "react";
import Hero from "../../template/hero/Hero";
import "./styles/home.css";
import iUser from "../../interfaces/iUser";
import DOMPurify from "dompurify";
import { BrowserView } from "react-device-detect";
import iProject from "../../interfaces/iProject";
import API from "../../lib/API";
import React from "react";
import Header from "../../template/header/Header";

const Home = () => {
  const [user, setUser] = useState<iUser>();
  console.log(user);

  var userID = "6396d88feafa14a262f9915c";
  const userAPIURL = API.BASE_URL + API.GET_USER.replace("{id}", userID);
  const projectsAPIURL = API.BASE_URL + API.GET_USER_PROJECTS.replace("{id}", userID);
  const skillsAPIURL = API.BASE_URL + API.GET_SKILLS;

  const userAPI = fetch(userAPIURL);
  const projectsAPI = fetch(projectsAPIURL);
  const skillsAPI = fetch(skillsAPIURL);

  // lazy imports
  const AboutMe = React.lazy(() => import("../about/AboutMe"));
  const Portfolio = React.lazy(() => import("../portfolio/Portfolio"));
  const Interests = React.lazy(() => import("../../template/interests/Interests"));
  const Footer = React.lazy(() => import("../../template/footer/Footer"));
  const Canvas = React.lazy(() => import("@react-three/fiber").then((module) => ({ default: module.Canvas })));
  const Stars = React.lazy(() => import("@react-three/drei").then((module) => ({ default: module.Stars })));

  useEffect(() => {
    // setLoading(true);
    fetchUserData();
  }, []);

  // setup observer after AboutMe, and Portfolio are loaded
  useEffect(() => {
    setupObserver();
  }, [user]);

  const fetchUserData = async () => {
    Promise.all([userAPI, projectsAPI, skillsAPI])
      .then((values) => {
        return Promise.all(values.map((r) => r.json()));
      })
      .then((data) => {
        console.log(data);
        let user = data[0];
        user.about = DOMPurify.sanitize(user.about);

        // go through data[1] and replace the skill id with the skill object {id:"", name:"", description:""} from data[2]
        data[1].forEach((project: any) => {
          project.skills = project.skills.map((skillID: string) => {
            return data[2].find((skill: any) => skill.id === skillID);
          });

          console.log(project.skills);
        });

        // add projects to user unless isHidden = true and sort projects by priority, higher priority being first
        user.projects = data[1]
          .filter((project: iProject) => !project.isHidden)
          .sort((a: iProject, b: iProject) => (a.priority > b.priority ? -1 : 1)) as iProject[];

        console.log(user);
        setUser(user);
        // setLoading(false);
      });
  };

  const setupObserver = () => {
    if (!user) return;

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
      rootMargin: "-50px 0px -50px 0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // if entry is not in navMap, skip
        console.log(entry.target.id);
        if (!navMap[entry.target.id]) return;

        if (entry.isIntersecting) {
          navMap[entry.target.id].classList.add("active");
          fadeMap[entry.target.id].classList.remove("fadedOut");
          fadeMap[entry.target.id].classList.add("fadedIn");
        } else {
          navMap[entry.target.id].classList.remove("active");
        }
      });
    }, options);

    observer.observe(aboutMe!);
    observer.observe(portfolio!);
  };

  return (
    <>
      {user ? (
        <>
          <Hero user={user} />
          <Header />
          <BrowserView>
            <div id="abscanvas">
              <Suspense>
                <Canvas>
                  <Stars factor={1} fade={false} count={1000} depth={2} />
                </Canvas>
              </Suspense>
            </div>
          </BrowserView>
          <div id="content">
            <section id="aboutme" className="fadedOut">
              <React.Suspense fallback={<div>Loading...</div>}>
                <AboutMe user={user} />
              </React.Suspense>
            </section>
            <section id="portfolio" className="fadedOut">
              <React.Suspense fallback={<div>Loading...</div>}>
                <Portfolio projects={user.projects} />
              </React.Suspense>
            </section>
            <Suspense>
              <Interests interests={user.techInterests} />
            </Suspense>
          </div>
          <Suspense>
            <Footer user={user} />
          </Suspense>
        </>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </>
  );
};

export default Home;
