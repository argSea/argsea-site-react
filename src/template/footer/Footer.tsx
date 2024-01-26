import "./styles/footer.css";
import iContacts from "../../interfaces/iContacts";
import { ReactSVG } from "react-svg";
import { Lighthouse } from "./Lighthouse";
import iTechInterest from "../../interfaces/iTechInterest";
import iUser from "../../interfaces/iUser";
import { Lighthouse2 } from "./Lighthouse2";
import { Lighthouse3 } from "./Lighthouse3";
import { Lighthouse4 } from "./Lighthouse4";
import { Lighthouse5 } from "./Lighthouse5";

const Footer = ({ user }: { user: iUser }) => {
  const currentYear = new Date().getFullYear();
  console.log(user);
  return (
    <footer>
      <div id="footer-content">
        <div id="footer-social">
          {user.contacts.map((contact: iContacts) => {
            return (
              <div className="footer-social-icon">
                <a href={contact.link}>
                  <span className="footer-icon">
                    <ReactSVG src={contact.icon.src} className="footer-svg" />
                  </span>
                </a>
              </div>
            );
          })}
        </div>
        <div id="footer-logo">
          <a href="/">{<Lighthouse5 />}</a>
        </div>
        <div id="footer-short-bio">
          <h1>Justin Smith</h1>
          <p>
            As a versatile Full Stack Developer at a major news publisher, I specialize in building and integrating APIs, managing DevOps, and designing robust
            system architectures. My work ensures seamless data flow and optimal system performance, contributing significantly to the delivery of timely and
            reliable news to our audience.
          </p>
        </div>

        <div id="footer-legal">
          <p>© Copyright {currentYear}. Made by Justin Smith</p>
        </div>
        <div id="footer-tech-interests">
          <span id="footer-tech-interests-title">Current Interests: </span>
          <div id="footer-tech-interests-text">
            {user.techInterests.map((interest: iTechInterest) => {
              return <div className="footer-tech-interest">{interest.name}</div>;
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
