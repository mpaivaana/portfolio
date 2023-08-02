import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function Header() {
  return (
    <div className="icons">
      <a
        href="https://www.linkedin.com/in/ap-paiva/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-linkedin"
      >
        <FaLinkedin size={24} color="#fff" />
      </a>
      <a
        href="https://github.com/mpaivaana"
        target="_blank"
        rel="noopener noreferrer"
        className="icon-github"
      >
        <FaGithub size={24} color="#fff" />
      </a>
    </div>
  );
}

export default Header;
