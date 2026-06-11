const programs = [
  {
    level: 'Elementary',
    grades: 'K – 5',
    desc: 'Play-based learning that builds strong foundations in literacy, numeracy, and social skills.',
    icon: '🌱',
  },
  {
    level: 'Middle School',
    grades: '6 – 8',
    desc: 'Exploratory courses and mentorship that help students discover interests and develop independence.',
    icon: '📚',
  },
  {
    level: 'High School',
    grades: '9 – 12',
    desc: 'Advanced placement, college counseling, and leadership programs for future-ready graduates.',
    icon: '🎓',
  },
]

export default function Programs() {
  return (
    <section id="programs" className="section programs">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Academics</span>
          <h2 className="section-title">Programs for Every Stage</h2>
          <p className="section-desc center-desc">
            From early childhood through graduation, our programs are designed
            to meet students where they are and take them where they want to go.
          </p>
        </div>
        <div className="programs-grid">
          {programs.map((program) => (
            <article key={program.level} className="program-card">
              <span className="program-icon" aria-hidden="true">
                {program.icon}
              </span>
              <span className="program-grades">{program.grades}</span>
              <h3>{program.level}</h3>
              <p>{program.desc}</p>
              <a href="#contact" className="program-link">
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
