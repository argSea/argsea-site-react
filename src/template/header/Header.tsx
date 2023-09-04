import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FaBars, FaHamburger, FaHome } from "react-icons/fa";
import "./styles/header.css";

const Header = () => {
  const openBurger = (e: any) => {
    e.preventDefault();
    let target = e.currentTarget;
    let invertExpanded = target.getAttribute("aria-expanded") === "true" ? "false" : "true";
    target.setAttribute("aria-expanded", invertExpanded);
  };

  return (
    <header>
      <nav>
        <div id="logo">
          <Link to="/">{<FaHome size={35} />}</Link>
        </div>
        <div id="navBar">
          <div className="navItem aboutme">
            <a href="#aboutme">.about</a>
          </div>
          <div className="navItem portfolio">
            <a href="#portfolio">.portfolio</a>
          </div>
          <div className="navItem resume">
            <a href="#resume">.resume</a>
          </div>
          <div className="navItem contactme">
            <a href="#contact-me">.contact</a>
          </div>
          <div className="navItem blog">
            <a href="/blog">.blog</a>
          </div>
        </div>
        <div id="hamburger" aria-expanded="false" onClick={openBurger}>
          <svg viewBox="0 0 100 100" width={35} preserveAspectRatio={"none"}>
            <line id="line-top" x1={"90"} x2={"10"} y1={"20"} y2={"20"} />
            <line id="line-mid" x1={"90"} x2={"10"} y1={"50"} y2={"50"} />
            <line id="line-bottom" x1={"90"} x2={"10"} y1={"80"} y2={"80"} />
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;
