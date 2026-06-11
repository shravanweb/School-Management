const stats = [
  { value: '2,400+', label: 'Students' },
  { value: '180+', label: 'Expert Faculty' },
  { value: '40', label: 'Years of Excellence' },
  { value: '50+', label: 'Clubs & Activities' },
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
