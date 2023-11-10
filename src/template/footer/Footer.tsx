import React from "react";
import "./styles/footer.css";
import iContacts from "../../interfaces/iContacts";
import { ReactSVG } from "react-svg";

const Footer = ({ user }: { user: any }) => {
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
        <div id="footer-legal">
          <p>© {currentYear} argSea</p>
        </div>
        {/* <div id="footer-admin-login">
          <a href="/login">Admin</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
