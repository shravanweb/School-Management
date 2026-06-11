const testimonials = [
  {
    quote:
      'Master Minds transformed my daughter\'s confidence. The teachers genuinely care about every child\'s growth — academically and personally.',
    name: 'Priya Sharma',
    role: 'Parent, Grade 8',
    initial: 'PS',
  },
  {
    quote:
      'The STEM labs and robotics club opened doors I never imagined. I\'m now pursuing engineering at a top university thanks to the foundation I got here.',
    name: 'Arjun Reddy',
    role: 'Alumni, Class of 2024',
    initial: 'AR',
  },
  {
    quote:
      'As a teacher here for 12 years, I\'ve seen how small class sizes and dedicated mentorship create real, lasting impact on students\' lives.',
    name: 'Dr. Meera Krishnan',
    role: 'Senior Science Faculty',
    initial: 'MK',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <div className="section-header center">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Community Says</h2>
          <p className="section-desc center-desc">
            Hear from parents, alumni, and faculty who have experienced the
            Master Minds difference firsthand.
          </p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <article key={item.name} className="testimonial-card">
              <svg
                className="testimonial-quote-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.29l1.366 1.366c-3.312 1.743-4.955 3.9-5.058 6.501h2.058c1.366 0 2.366.342 3 1.024.732.732 1.098 1.732 1.098 3 0 1.366-.488 2.5-1.464 3.402-.976.902-2.22 1.353-3.732 1.353H3v-2.13h1.583zm13 0C16.553 16.227 16 15 16 13.011c0-3.5 2.457-6.637 6.03-8.29l1.366 1.366c-3.312 1.743-4.955 3.9-5.058 6.501h2.058c1.366 0 2.366.342 3 1.024.732.732 1.098 1.732 1.098 3 0 1.366-.488 2.5-1.464 3.402-.976.902-2.22 1.353-3.732 1.353H16v-2.13h1.583z" />
              </svg>
              <blockquote>
                <p>{item.quote}</p>
              </blockquote>
              <div className="testimonial-author">
                <span className="testimonial-avatar" aria-hidden="true">
                  {item.initial}
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
