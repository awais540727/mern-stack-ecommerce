import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer mt-3">
      <h4 className="text-center">All Rights Reserved &copy; Ecommerce </h4>
      <p className="text-center mt-2">
        <Link to="/about">About Us</Link>
        <Link to="/policy">Privacy Policy</Link>
        <Link to="/contact">Contact Us</Link>
      </p>
    </div>
  );
};

export default Footer;
