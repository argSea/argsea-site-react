import { useEffect, useContext, Dispatch, SetStateAction } from "react";
import DOMPurify from "dompurify";
import { Canvas, extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Vector3 } from "three";
import AboutMe from "../about/AboutMe";
import Portfolio from "../portfolio/Portfolio";
import Globals from "../../globals/Globals";
import { Stars } from "@react-three/drei";
import Hero from "../../template/hero/Hero";
import Header from "../../template/header/Header";
import Interests from "../../template/interests/Interests";
import "./styles/home.css";
import { UserContext } from "../../contexts/UserContext";
import iUser from "../../interfaces/iUser";
import Footer from "../../template/footer/Footer";

extend({ TextGeometry });

const Home = () => {
  // get value from usercontext
  const [user, setUser] = useContext(UserContext) as [iUser, any];
  console.log(user);

  const contactOpts = {
    font: Globals("font"),
    size: 32,
    height: 0.1,
  };

  const contactPos = new Vector3(-125, -10, -50);

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
      rootMargin: "-50px 0px -50px 0px",
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

  return (
    <>
      <Hero user={user} />
      <Header />
      <div id="abscanvas">
        <Canvas>
          <Stars factor={1} fade={false} count={500} depth={2} />
        </Canvas>
      </div>
      <div id="content">
        <section id="aboutme" className="fadedOut">
          {<AboutMe user={user} />}
        </section>
        <section id="portfolio" className="fadedOut">
          <Portfolio projects={user.projects} />
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
        <Interests interests={user.techInterests} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
