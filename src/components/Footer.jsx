import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link to="/" className="logo">
            <span className="logo-icon">M</span>
            <span className="logo-brand">
              <span className="logo-text">
                Master <em>Minds</em>
              </span>
              <span className="logo-tagline">School of Excellence</span>
            </span>
          </Link>
          <p>Inspiring excellence since 2005.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Quick Links</h4>
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#features">Why Us</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Portal</h4>
            <Link to="/login">Principal Login</Link>
            <Link to="/login">Teacher Login</Link>
            <Link to="/login">Parent Login</Link>
            <Link to="/login">Student Login</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Master Minds School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
