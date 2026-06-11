import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const SLIDES = [
  {
    image: '/images/school-building.jpg?v=2',
    imagePosition: 'center 40%',
    badge: 'Est. 2005 · Shaping Brilliant Minds',
    title: 'Welcome to',
    highlight: 'Master Minds School',
    desc: 'A place where every student discovers their potential through quality education, caring teachers, and a vibrant learning community — from Nursery through Class 10.',
    highlights: [
      { value: '2,400+', label: 'Students' },
      { value: '180+', label: 'Teachers' },
      { value: '98%', label: 'Success Rate' },
    ],
    primaryCta: { href: '#contact', label: 'Schedule a Visit' },
    secondaryCta: { to: '/login', label: 'Portal Login' },
  },
  {
    image: '/images/school-building.jpg?v=2',
    imagePosition: 'center 15%',
    badge: 'Admissions Open 2026–27',
    title: 'Nursery to',
    highlight: 'Class 10 Excellence',
    desc: 'Holistic curriculum with smart classrooms, sports, arts, and values-based education. Give your child the foundation for a bright future.',
    highlights: [
      { value: '13', label: 'Grade Levels' },
      { value: '15:1', label: 'Student Ratio' },
      { value: '100%', label: 'Dedicated Faculty' },
    ],
    primaryCta: { href: '#programs', label: 'Explore Programs' },
    secondaryCta: { href: '#contact', label: 'Apply Now' },
  },
  {
    image: '/images/school-building.jpg?v=2',
    imagePosition: '70% center',
    badge: 'Smart Campus · Digital Learning',
    title: 'Learn. Grow.',
    highlight: 'Lead with Confidence',
    desc: 'Parent portal, live schedules, attendance tracking, and exam results — all in one secure school management platform.',
    highlights: [
      { value: '24/7', label: 'Parent Portal' },
      { value: 'Live', label: 'Class Schedules' },
      { value: 'Real-time', label: 'Updates' },
    ],
    primaryCta: { to: '/login', label: 'Portal Login' },
    secondaryCta: { href: '#features', label: 'Why Choose Us' },
  },
]

const INTERVAL_MS = 6000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return undefined
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length)
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [paused])

  const slide = SLIDES[current]

  const goTo = (index) => setCurrent((index + SLIDES.length) % SLIDES.length)

  return (
    <section
      className="hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="hero-slides" aria-hidden="true">
        {SLIDES.map((item, index) => (
          <div
            key={item.highlight}
            className={`hero-slide ${index === current ? 'active' : ''}`}
          >
            <img
              src={item.image}
              alt=""
              className="hero-slide-img"
              style={{ objectPosition: item.imagePosition }}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            <div className="hero-scene-overlay" />
          </div>
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-text-panel" key={current}>
          <p className="hero-badge">{slide.badge}</p>
          <h1>
            {slide.title}
            <br />
            <span className="highlight">{slide.highlight}</span>
          </h1>
          <p className="hero-desc">{slide.desc}</p>
          <div className="hero-actions">
            {slide.primaryCta.to ? (
              <Link to={slide.primaryCta.to} className="btn btn-primary">
                {slide.primaryCta.label}
              </Link>
            ) : (
              <a href={slide.primaryCta.href} className="btn btn-primary">
                {slide.primaryCta.label}
              </a>
            )}
            {slide.secondaryCta.to ? (
              <Link to={slide.secondaryCta.to} className="btn btn-outline">
                {slide.secondaryCta.label}
              </Link>
            ) : (
              <a href={slide.secondaryCta.href} className="btn btn-outline">
                {slide.secondaryCta.label}
              </a>
            )}
          </div>

          <div className="hero-highlights">
            {slide.highlights.map((item) => (
              <div key={item.label} className="hero-highlight">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-controls">
          <button
            type="button"
            className="hero-nav-btn"
            aria-label="Previous slide"
            onClick={() => goTo(current - 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="hero-dots" role="tablist" aria-label="Hero slides">
            {SLIDES.map((item, index) => (
              <button
                key={item.highlight}
                type="button"
                role="tab"
                aria-selected={index === current}
                aria-label={`Slide ${index + 1}`}
                className={`hero-dot ${index === current ? 'active' : ''}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className="hero-nav-btn"
            aria-label="Next slide"
            onClick={() => goTo(current + 1)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
