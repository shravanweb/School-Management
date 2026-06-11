export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container contact-grid">
        <div className="contact-info">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Start Your Journey With Us</h2>
          <p>
            Ready to learn more? Schedule a campus tour, request an application
            packet, or reach out with any questions. We&apos;d love to hear from you.
          </p>
          <ul className="contact-details">
            <li>
              <strong>Address</strong>
              <span>45 Knowledge Park, Hyderabad, TS 500032</span>
            </li>
            <li>
              <strong>Phone</strong>
              <span>(040) 2345-6789</span>
            </li>
            <li>
              <strong>Email</strong>
              <span>info@masterminds.edu</span>
            </li>
            <li>
              <strong>Office Hours</strong>
              <span>Mon – Fri, 8:00 AM – 4:30 PM</span>
            </li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-row">
            <label>
              First Name
              <input type="text" name="firstName" placeholder="Jane" required />
            </label>
            <label>
              Last Name
              <input type="text" name="lastName" placeholder="Smith" required />
            </label>
          </div>
          <label>
            Email
            <input type="email" name="email" placeholder="jane@email.com" required />
          </label>
          <label>
            Interested Program
            <select name="program" defaultValue="">
              <option value="" disabled>
                Select a program
              </option>
              <option value="elementary">Elementary (K–5)</option>
              <option value="middle">Middle School (6–8)</option>
              <option value="high">High School (9–12)</option>
            </select>
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us about your student..."
            />
          </label>
          <button type="submit" className="btn btn-navy">
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  )
}
