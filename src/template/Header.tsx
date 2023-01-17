import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FaBars, FaHamburger, FaHome } from "react-icons/fa";

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
        <div id="navBar">
          <div className="navItem">
            <a href="/">Home</a>
          </div>
          <div className="navItem">
            <a href="/about">About</a>
          </div>
          <div className="navItem">
            <a href="/resume">Resume</a>
          </div>
          <div className="navItem">
            <a href="/portfolio">Portfolio</a>
          </div>
          <div className="navItem">
            <a href="/blog">Blog</a>
          </div>
        </div>
        <div id="logo">
          <Link to="/">{<FaHome size={30} />}</Link>
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
