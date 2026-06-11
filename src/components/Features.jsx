const features = [
  {
    title: 'Academic Excellence',
    desc: 'Rigorous curriculum aligned with national standards, taught by passionate educators.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
  },
  {
    title: 'Sports & Wellness',
    desc: 'Championship athletics, modern fitness facilities, and programs that promote healthy living.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Arts & Culture',
    desc: 'Music, theater, visual arts, and cultural events that celebrate creativity and expression.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: 'STEM Innovation',
    desc: 'Robotics, coding, and hands-on science labs that prepare students for tomorrow\'s careers.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
]

export default function Features() {
  return (
    <section id="features" className="section features">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Why Master Minds</span>
          <h2 className="section-title">More Than a School</h2>
          <p className="section-desc center-desc">
            We offer a complete educational experience that develops the whole
            child — mind, body, and spirit.
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature) => (
            <article key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
