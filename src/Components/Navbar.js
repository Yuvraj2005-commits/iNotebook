import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top transition-all duration-300 ${
      isScrolled ? 'navbar-scrolled' : 'navbar-transparent'
    }`}>
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/">
          <i className="fas fa-book-open me-2"></i>
          iNotebook
        </Link>
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                <i className="fas fa-home me-1"></i>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                to="/about"
              >
                <i className="fas fa-info-circle me-1"></i>
                About
              </Link>
            </li>
          </ul>
          
          <div className="d-flex">
            {!localStorage.getItem('token') ? (
              <>
                <Link className="btn btn-outline-light me-2 auth-btn" to="/login">
                  <i className="fas fa-sign-in-alt me-1"></i>
                  Login
                </Link>
                <Link className="btn btn-primary auth-btn" to="/signup">
                  <i className="fas fa-user-plus me-1"></i>
                  Sign Up
                </Link>
              </>
            ) : (
              <button className="btn btn-outline-light auth-btn" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt me-1"></i>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;