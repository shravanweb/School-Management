import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { StudentAnalytics } from '../../components/DashboardAnalytics'
import { useAuth } from '../../context/AuthContext'
import { useSchool } from '../../context/SchoolContext'
import { formatClassLabel } from '../../data/seed'
import './Dashboard.css'

const ATTENDANCE_LABELS = {
  present: 'P',
  absent: 'A',
  late: 'L',
}

function getAttendanceSummary(records = {}) {
  const values = Object.values(records)
  return {
    present: values.filter((v) => v === 'present').length,
    absent: values.filter((v) => v === 'absent').length,
    late: values.filter((v) => v === 'late').length,
    total: values.length,
  }
}

function getDaysInMonth(month) {
  const [year, mon] = month.split('-').map(Number)
  return new Date(year, mon, 0).getDate()
}

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const {
    getTeacherById,
    getSyllabusForClass,
    getAttendanceForStudent,
    getNewsForClass,
    getExamResultsForStudent,
    getReportsForStudent,
    getTeachersForStudent,
  } = useSchool()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [attendanceMonth, setAttendanceMonth] = useState(currentMonth())

  const teacher = getTeacherById(user.teacherId)
  const syllabus = getSyllabusForClass(user.class, user.section)
  const attendance = getAttendanceForStudent(user.id, attendanceMonth)
  const news = getNewsForClass(user.class, user.section)
  const examResults = getExamResultsForStudent(user.id)
  const reports = getReportsForStudent(user.id)
  const teachers = getTeachersForStudent(user)
  const attSummary = getAttendanceSummary(attendance?.records)
  const daysInMonth = getDaysInMonth(attendanceMonth)

  const handleNav = (id) => setActiveTab(id)

  return (
    <DashboardLayout
      title="Student Dashboard"
      activeNav={activeTab}
      onNavClick={handleNav}
    >
      {(activeTab === 'dashboard' || activeTab === 'profile') && (
        <div className="profile-banner student-banner">
          <div>
            <span className="profile-roll">{user.rollNo}</span>
            <h2>Welcome, {user.name}</h2>
            <p>
              {formatClassLabel(user.class)} — Section {user.section}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'dashboard' && (
        <>
          <div className="dash-stats dash-stats-pro">
            <button
              type="button"
              className="dash-stat-card clickable accent-navy"
              onClick={() => handleNav('syllabus')}
            >
              <span className="dash-stat-value">{syllabus.length}</span>
              <span className="dash-stat-label">Syllabus Subjects</span>
            </button>
            <button
              type="button"
              className="dash-stat-card clickable accent-teal"
              onClick={() => handleNav('attendance')}
            >
              <span className="dash-stat-value">{attSummary.present}</span>
              <span className="dash-stat-label">Present This Month</span>
            </button>
            <button
              type="button"
              className="dash-stat-card clickable accent-gold"
              onClick={() => handleNav('teachers')}
            >
              <span className="dash-stat-value">{teachers.length}</span>
              <span className="dash-stat-label">My Teachers</span>
            </button>
            <button
              type="button"
              className="dash-stat-card clickable accent-orange"
              onClick={() => handleNav('results')}
            >
              <span className="dash-stat-value">{examResults.length}</span>
              <span className="dash-stat-label">Exam Results</span>
            </button>
          </div>

          <section className="dash-section dashboard-analytics">
            <div className="dash-section-header">
              <h2>My Performance</h2>
              <span className="read-only-badge">Analytics</span>
            </div>
            <StudentAnalytics />
          </section>

          <div className="overview-cards">
            <button type="button" className="overview-card" onClick={() => handleNav('syllabus')}>
              <span className="overview-card-label">View Syllabus</span>
              <span className="overview-card-action">Open →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('attendance')}>
              <span className="overview-card-label">Monthly Attendance</span>
              <span className="overview-card-action">Open →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('news')}>
              <span className="overview-card-label">News & Announcements</span>
              <span className="overview-card-action">Open →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('teachers')}>
              <span className="overview-card-label">My Teachers</span>
              <span className="overview-card-action">Open →</span>
            </button>
          </div>
        </>
      )}

      {activeTab === 'profile' && (
        <div className="bio-grid">
          <section className="bio-card">
            <h3>My Profile</h3>
            <dl>
              <div>
                <dt>Roll Number</dt>
                <dd>{user.rollNo}</dd>
              </div>
              <div>
                <dt>Full Name</dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt>Date of Birth</dt>
                <dd>{user.dob}</dd>
              </div>
              <div>
                <dt>Gender</dt>
                <dd>{user.gender}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>{user.address || '—'}</dd>
              </div>
            </dl>
          </section>

          <section className="bio-card">
            <h3>Parent Details</h3>
            <dl>
              <div>
                <dt>Parent Name</dt>
                <dd>{user.parentName}</dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>{user.parentPhone}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{user.parentEmail || '—'}</dd>
              </div>
            </dl>
          </section>

          <section className="bio-card">
            <h3>Class Teacher</h3>
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{teacher?.name || '—'}</dd>
              </div>
              <div>
                <dt>Subject</dt>
                <dd>{teacher?.subject || '—'}</dd>
              </div>
              <div>
                <dt>Class</dt>
                <dd>
                  {teacher?.class
                    ? `${formatClassLabel(teacher.class)} — Section ${teacher.section}`
                    : '—'}
                </dd>
              </div>
              <div>
                <dt>Class Time</dt>
                <dd>{teacher?.classTime || '—'}</dd>
              </div>
              <div>
                <dt>Contact</dt>
                <dd>{teacher?.phone || '—'}</dd>
              </div>
            </dl>
          </section>
        </div>
      )}

      {activeTab === 'syllabus' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Syllabus — {formatClassLabel(user.class)}-{user.section}</h2>
            <span className="read-only-badge">View Only</span>
          </div>
          {syllabus.length === 0 ? (
            <p className="empty-message">No syllabus published yet.</p>
          ) : (
            <div className="syllabus-list">
              {syllabus.map((item) => (
                <article key={item.id} className="syllabus-card">
                  <div className="syllabus-card-header">
                    <h3>{item.subject}</h3>
                    <span className="dash-badge">Updated {item.updatedAt}</span>
                  </div>
                  {item.units.map((unit, idx) => (
                    <div key={idx} className="syllabus-unit">
                      <h4>
                        Unit {idx + 1}: {unit.title}
                        <span className="unit-weeks">{unit.weeks} weeks</span>
                      </h4>
                      <ul>
                        {unit.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'attendance' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Monthly Attendance</h2>
            <div className="header-controls">
              <span className="read-only-badge">View Only</span>
              <input
                type="month"
                value={attendanceMonth}
                onChange={(e) => setAttendanceMonth(e.target.value)}
                className="month-picker"
              />
            </div>
          </div>

          <div className="attendance-summary">
            <div className="att-summary-card present">
              <strong>{attSummary.present}</strong>
              <span>Present</span>
            </div>
            <div className="att-summary-card absent">
              <strong>{attSummary.absent}</strong>
              <span>Absent</span>
            </div>
            <div className="att-summary-card late">
              <strong>{attSummary.late}</strong>
              <span>Late</span>
            </div>
            <div className="att-summary-card total">
              <strong>{attSummary.total}</strong>
              <span>Marked Days</span>
            </div>
          </div>

          <div className="attendance-calendar">
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = String(i + 1)
              const status = attendance?.records?.[day]
              return (
                <div
                  key={day}
                  className={`att-day ${status || 'unmarked'}`}
                  title={`Day ${day}: ${status || 'Not marked'}`}
                >
                  <span className="att-day-num">{day}</span>
                  <span className="att-day-status">
                    {status ? ATTENDANCE_LABELS[status] : '—'}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="attendance-legend">
            <span><i className="legend-dot present" /> Present</span>
            <span><i className="legend-dot absent" /> Absent</span>
            <span><i className="legend-dot late" /> Late</span>
            <span><i className="legend-dot unmarked" /> Not Marked</span>
          </div>
        </section>
      )}

      {activeTab === 'news' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>News & Announcements</h2>
            <span className="read-only-badge">View Only</span>
          </div>
          {news.length === 0 ? (
            <p className="empty-message">No news updates at this time.</p>
          ) : (
            <div className="news-list">
              {news.map((item) => (
                <article key={item.id} className="news-card">
                  <div className="news-card-header">
                    <h3>{item.title}</h3>
                    <time>{item.createdAt}</time>
                  </div>
                  <p>{item.body}</p>
                  <span className="news-target">
                    Class {item.targetClass}
                    {item.targetSection !== 'all' ? `-${item.targetSection}` : ' (All Sections)'}
                  </span>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'results' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Exam Results</h2>
            <span className="read-only-badge">View Only</span>
          </div>
          {examResults.length === 0 ? (
            <p className="empty-message">No exam results published yet.</p>
          ) : (
            <div className="results-list">
              {examResults.map((exam) => (
                <article key={exam.id} className="result-card">
                  <div className="result-card-header">
                    <div>
                      <h3>{exam.examName}</h3>
                      <span className="result-term">{exam.term}</span>
                    </div>
                    <time>Published {exam.publishedAt}</time>
                  </div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Subject</th>
                          <th>Marks</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exam.subjects.map((sub) => (
                          <tr key={sub.name}>
                            <td>{sub.name}</td>
                            <td>
                              {sub.marks}/{sub.maxMarks}
                            </td>
                            <td>
                              <span className="grade-badge">{sub.grade}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Progress Reports</h2>
            <span className="read-only-badge">View Only</span>
          </div>
          {reports.length === 0 ? (
            <p className="empty-message">No reports available yet.</p>
          ) : (
            <div className="reports-list">
              {reports.map((report) => (
                <article key={report.id} className="report-card">
                  <div className="report-card-header">
                    <div>
                      <h3>{report.term} — {report.type}</h3>
                      <span className={`rating-badge rating-${report.rating.toLowerCase().replace(/\s+/g, '-')}`}>
                        {report.rating}
                      </span>
                    </div>
                    <time>{report.createdAt}</time>
                  </div>
                  <p>{report.remarks}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'teachers' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>My Teachers</h2>
            <span className="read-only-badge">View Only</span>
          </div>
          {teachers.length === 0 ? (
            <p className="empty-message">No teachers assigned for your class yet.</p>
          ) : (
            <div className="teachers-grid">
              {teachers.map((t) => (
                <article
                  key={t.id}
                  className={`teacher-card ${t.id === user.teacherId ? 'primary' : ''}`}
                >
                  {t.id === user.teacherId && (
                    <span className="teacher-badge">Class Teacher</span>
                  )}
                  <h3>{t.name}</h3>
                  <span className="teacher-subject-tag">{t.subject}</span>
                  <dl>
                    <div>
                      <dt>Class</dt>
                      <dd>
                        {formatClassLabel(t.class)} — Section {t.section}
                      </dd>
                    </div>
                    <div>
                      <dt>Class Time</dt>
                      <dd className="teacher-time">{t.classTime || '—'}</dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>{t.email}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>{t.phone}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>
      )}
    </DashboardLayout>
  )
}
