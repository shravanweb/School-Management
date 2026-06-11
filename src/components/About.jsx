export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div className="about-image-wrap">
          <div className="about-image" />
          <div className="about-accent-card">
            <span className="about-accent-number">20+</span>
            <span className="about-accent-text">Years shaping young leaders</span>
          </div>
        </div>
        <div className="about-content">
          <span className="section-label">About Us</span>
          <h2 className="section-title">Where Every Mind Masters Excellence</h2>
          <p>
            Founded in 2005, Master Minds has been a cornerstone of educational
            excellence in our community. We believe every child deserves an
            environment where they can discover their passions and reach their
            full potential.
          </p>
          <p>
            Our holistic approach blends rigorous academics with arts, athletics,
            and community service — preparing students not just for college, but
            for life.
          </p>
          <ul className="about-list">
            <li>Accredited K–12 curriculum</li>
            <li>Small class sizes with personalized attention</li>
            <li>State-of-the-art science & technology labs</li>
            <li>Role-based parent & student portal</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
