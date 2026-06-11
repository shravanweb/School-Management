const programs = [
  {
    level: 'Pre-Primary',
    grades: 'Nursery – UKG',
    desc: 'Play-based early learning with rhymes, art, and foundational literacy in a nurturing environment.',
    icon: '🧸',
  },
  {
    level: 'Primary School',
    grades: 'Class 1 – 5',
    desc: 'Strong foundations in English, Mathematics, EVS, and languages with activity-based learning.',
    icon: '🌱',
  },
  {
    level: 'Middle School',
    grades: 'Class 6 – 8',
    desc: 'Exploratory courses in Science, Social Studies, and skills that build independence and curiosity.',
    icon: '📚',
  },
  {
    level: 'High School',
    grades: 'Class 9 – 10',
    desc: 'Board exam preparation, advanced subjects, and career guidance for future-ready graduates.',
    icon: '🎓',
  },
]

export default function Programs() {
  return (
    <section id="programs" className="section programs">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Academics</span>
          <h2 className="section-title">Nursery to Class 10</h2>
          <p className="section-desc center-desc">
            A complete K–10 journey — from early childhood through secondary school,
            designed to meet every student where they are.
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
