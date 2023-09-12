import React from "react";
import "./styles/footer.css";
import { LoginContext } from "../../contexts/LoginContext";
import { FaGithubAlt, FaVoicemail } from "react-icons/fa";

function Footer() {
  const { regUser } = React.useContext(LoginContext) as { regUser: any };
  return (
    <footer>
      <div id="footer-content">
        <div id="footer-social">
          <div className="footer-social-icon">
            <a href="mailto:get@argsea.com">
              <span className="footer-icon">
                <FaVoicemail size={50} />
              </span>
            </a>
          </div>
          <div className="footer-social-icon">
            <a href="github.com/argSea">
              <span className="footer-icon">
                <FaGithubAlt size={50} />
              </span>
            </a>
          </div>
        </div>
        <div id="footer-legal">
          <p>© 2021 argSea</p>
        </div>
        <div id="footer-admin-login">
          <a href="/login">Admin</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
