import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Social icons
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcStripe,
  FaCcApplePay,
} from "react-icons/fa"; // Payment method icons
import "../../styles/Footer.css"; // Importing the CSS file for styling

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        {/* Company Info */}
        <div className="footer-section about">
          <h2 className="logo">TechZone</h2>
          <p>
            We offer the latest PC components at unbeatable prices, ensuring
            top-notch customer satisfaction.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="footer-section payment">
          <h3>Payment Methods</h3>
          <div className="payment-icons">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcAmex />
            <FaCcPaypal />
            <FaCcStripe />
            <FaCcApplePay />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom text-center">
        <p>All Rights Reserved &copy; {new Date().getFullYear()} TechZone</p>
      </div>
    </div>
  );
};

export default Footer;
