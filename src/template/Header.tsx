import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";

const Header = () => {
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
        <div id="hamburger">
          <Hamburger direction="left" color="#FFF" rounded />
        </div>
      </nav>
    </header>
  );
};

export default Header;
