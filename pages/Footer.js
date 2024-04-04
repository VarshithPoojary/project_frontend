import React from 'react';
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

function Footer() {
  return (
    
   
    <footer class="home_footer">
  <div class="footer-content">
          <BsTwitter />&nbsp;&nbsp;
          <SiLinkedin />&nbsp;&nbsp;
          <BsYoutube />&nbsp;&nbsp;
          <FaFacebookF />&nbsp;&nbsp;
    <p>© 2024 Healthcare Plus. All rights reserved.</p>
    <nav class="footer-nav">
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  </div>
</footer>
  );
}

export default Footer;
