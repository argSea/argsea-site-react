import { useEffect, useContext } from "react";
import DOMPurify from "dompurify";
import { Canvas, extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import AboutMe from "../about/AboutMe";
import Portfolio from "../portfolio/Portfolio";
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
        <Interests interests={user.techInterests} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
