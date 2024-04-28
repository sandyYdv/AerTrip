import React from "react";
import "./Header.css";
import Logo from "../../assets/cococola.jpg";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <a href="/">
              <img src={Logo} alt="logo" />
            </a>
          </div>

          {/* Navigation */}
          <nav className="navbar">
            <ul>
              <li>
                <a href="/home">FLIGHT</a>
              </li>
              <li>
                <a href="/about">HOTEL</a>
              </li>
              <li>
                <a href="/services">VISA</a>
              </li>
              <li>
                <a href="/contact">HOLIDAY</a>
              </li>
            </ul>
          </nav>

          {/* Login */}
          <div className="login">
            <a href="/login">Login</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
