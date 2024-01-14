import { FaFolder, FaPortrait, FaPaperPlane } from "react-icons/fa";
import "./styles/header.css";
import { SvgHomeIcon } from "./styles/HomeIcon";

const Header = () => {
  const openBurger = (e: any) => {
    // e.preventDefault();
    let target = e.currentTarget;
    let invertExpanded = target.getAttribute("aria-expanded") === "true" ? "false" : "true";
    target.setAttribute("aria-expanded", invertExpanded);

    let menu = document.getElementById("burger-menu");
    let body = document.body;
    if (menu) {
      body.classList.toggle("overflow-hidden");
      menu.classList.toggle("open");
    }
  };

  // close burger menu when clicked outside
  document.addEventListener("click", (e) => {
    let burger = document.getElementById("hamburger");
    let burgerMenu = document.getElementById("burger-menu");
    let body = document.body;
    if (burger && burgerMenu) {
      if (burger.contains(e.target as Node) || burgerMenu.contains(e.target as Node)) {
        // clicked inside
      } else {
        // clicked outside
        burger.setAttribute("aria-expanded", "false");
        burgerMenu.classList.remove("open");
        body.classList.remove("overflow-hidden");
      }
    }
  });

  return (
    <header>
      <nav id="main-nav" role="navigation" aria-label="main navigation">
        <div id="logo">
          <a href="/">{<SvgHomeIcon />}</a>
        </div>
        {/* <div id="user-welcome">{checkLogin()}</div> */}
        <div id="navBar">
          <div className="navItem aboutme">
            <a href="/#aboutme" data-text=".about">
              .about
            </a>
          </div>
          <div className="navItem portfolio" data-text=".portfolio">
            <a href="/#portfolio" data-text=".portfolio">
              .portfolio
            </a>
          </div>
          <div className="navItem resume" data-text=".resume">
            <a href="https://argsea.com/experience/resume/CurrentRes1.pdf" data-text=".resume">
              .resume
            </a>
          </div>
          {/* <div className="navItem blog">
            <a href="/blog">.blog</a>
          </div> */}
        </div>
        <button id="hamburger" aria-expanded="false" onClick={openBurger} style={{ background: "none", border: "none" }}>
          <svg viewBox="0 0 100 100" width={35} preserveAspectRatio={"none"} aria-hidden="true" focusable="false">
            <line id="line-top" x1={"90"} x2={"10"} y1={"20"} y2={"20"} />
            <line id="line-mid" x1={"90"} x2={"10"} y1={"50"} y2={"50"} />
            <line id="line-bottom" x1={"90"} x2={"10"} y1={"80"} y2={"80"} />
          </svg>
        </button>
        <div id="burger-menu">
          <div className="burgerItem aboutme">
            <a href="/#aboutme" onClick={openBurger}>
              <FaPortrait /> <span>.about</span>
            </a>
          </div>
          <div className="burgerItem portfolio">
            <a href="/#portfolio" onClick={openBurger}>
              <FaFolder /> <span>.portfolio</span>
            </a>
          </div>
          <div className="burgerItem resume">
            <a href="https://argsea.com/experience/resume/CurrentRes1.pdf">
              <FaPaperPlane /> <span>.resume</span>
            </a>
          </div>
          {/* <div className="burgerItem blog">
            <a href="/blog">.blog</a>
          </div> */}
          {/* add some trademark info */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
