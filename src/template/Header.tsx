import { Link } from "react-router-dom";
import { Squash as Hamburger } from "hamburger-react";
import { FaBars, FaHamburger, FaHome } from "react-icons/fa";

const Header = () => {
  const testFunc = () => {
    console.log("Test");
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
        <div id="hamburger" onClick={testFunc}>
          <svg viewBox="0 0 100 100" width={"100"}>
            <line id="line-top" x1={"50"} x2={"90"} y1={"30"} y2={"30"} />
            <line id="line-mid" x1={"90"} x2={"30"} y1={"50"} y2={"50"} />
            {/* <line id="line-bottom" x1={"10"} x2={"90"} y1={"70"} y2={"70"} /> */}
          </svg>
        </div>
      </nav>
    </header>
  );
};

export default Header;
