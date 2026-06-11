import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-scene" aria-hidden="true">
        <img
          src="/images/school-building.jpg?v=2"
          alt="Master Minds School campus building"
          className="hero-building-img"
          loading="eager"
          fetchPriority="high"
        />
        <div className="hero-scene-overlay" />
      </div>

      <div className="container hero-content">
        <div className="hero-text-panel">
          <p className="hero-badge">Est. 2005 · Shaping Brilliant Minds</p>
          <h1>
            Welcome to
            <br />
            <span className="highlight">Master Minds School</span>
          </h1>
          <p className="hero-desc">
            A place where every student discovers their potential through
            quality education, caring teachers, and a vibrant learning
            community — from kindergarten through grade 12.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Schedule a Visit
            </a>
            <Link to="/login" className="btn btn-outline">
              Portal Login
            </Link>
          </div>

          <div className="hero-highlights">
            <div className="hero-highlight">
              <strong>2,400+</strong>
              <span>Students</span>
            </div>
            <div className="hero-highlight">
              <strong>180+</strong>
              <span>Teachers</span>
            </div>
            <div className="hero-highlight">
              <strong>98%</strong>
              <span>Placement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
