import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import ClassFilterSelect from '../../components/ClassFilterSelect'
import { PrincipalAnalytics } from '../../components/DashboardAnalytics'
import { useSchool } from '../../context/SchoolContext'
import { SCHOOL_CLASSES, formatClassLabel } from '../../data/seed'
import {
  SCHOOL_DAYS,
  formatTime,
  getDayName,
  getLiveSessions,
  getTeacherSchedule,
  groupScheduleByDay,
  isHolidayToday,
} from '../../utils/schedule'
import './Dashboard.css'

const emptyTeacher = {
  name: '',
  email: '',
  password: '',
  subject: '',
  class: '',
  section: '',
  classTime: '',
  phone: '',
}

const emptyHoliday = {
  title: '',
  date: '',
  endDate: '',
  type: 'School Holiday',
  description: '',
}

const emptySport = {
  name: '',
  coachId: '',
  schedule: '',
  venue: '',
  classes: '',
  description: '',
}

const LEAVE_STATUS = {
  pending: { label: 'Pending', className: 'status-pending' },
  approved: { label: 'Approved', className: 'status-approved' },
  rejected: { label: 'Rejected', className: 'status-rejected' },
}

export default function PrincipalDashboard() {
  const {
    data,
    addTeacher,
    removeTeacher,
    addHoliday,
    removeHoliday,
    addSport,
    removeSport,
    updateLeaveStatus,
    getPendingLeaves,
  } = useSchool()

  const [activeTab, setActiveTab] = useState('dashboard')
  const [now, setNow] = useState(new Date())
  const [showTeacherForm, setShowTeacherForm] = useState(false)
  const [teacherForm, setTeacherForm] = useState(emptyTeacher)
  const [showHolidayForm, setShowHolidayForm] = useState(false)
  const [holidayForm, setHolidayForm] = useState(emptyHoliday)
  const [showSportForm, setShowSportForm] = useState(false)
  const [sportForm, setSportForm] = useState(emptySport)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [timetableClass, setTimetableClass] = useState('10')
  const [timetableSection, setTimetableSection] = useState('A')
  const [teacherClassFilter, setTeacherClassFilter] = useState('all')
  const [studentClassFilter, setStudentClassFilter] = useState('all')

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(timer)
  }, [])

  const handleNav = (id) => setActiveTab(id)
  const pendingLeaves = getPendingLeaves()
  const todayHoliday = isHolidayToday(data.holidays, now)
  const live = getLiveSessions(data.timetable, data.periods, data.teachers, now)

  const classSchedule = data.timetable.filter(
    (t) => t.class === timetableClass && t.section === timetableSection
  )
  const groupedTimetable = groupScheduleByDay(classSchedule, data.periods)

  const handleAddTeacher = (e) => {
    e.preventDefault()
    const exists = data.teachers.some(
      (t) => t.email.toLowerCase() === teacherForm.email.trim().toLowerCase()
    )
    if (exists) {
      alert('A teacher with this email already exists.')
      return
    }
    addTeacher(teacherForm)
    setTeacherForm(emptyTeacher)
    setShowTeacherForm(false)
  }

  const handleAddHoliday = (e) => {
    e.preventDefault()
    addHoliday(holidayForm)
    setHolidayForm(emptyHoliday)
    setShowHolidayForm(false)
  }

  const handleAddSport = (e) => {
    e.preventDefault()
    addSport(sportForm)
    setSportForm(emptySport)
    setShowSportForm(false)
  }

  const getTeacherName = (id) =>
    data.teachers.find((t) => t.id === id)?.name || '—'

  const selectedTeacherSchedule = selectedTeacher
    ? getTeacherSchedule(data.timetable, selectedTeacher.id)
    : []

  const filteredTeachers = data.teachers.filter((t) => {
    if (teacherClassFilter === 'all') return true
    if (t.class === teacherClassFilter) return true
    return data.timetable.some(
      (tt) => tt.teacherId === t.id && tt.class === teacherClassFilter
    )
  })

  const filteredStudents = data.students.filter(
    (s) => studentClassFilter === 'all' || s.class === studentClassFilter
  )

  const countTeachersForClass = (cls) => {
    if (cls === 'all') return data.teachers.length
    return data.teachers.filter(
      (t) =>
        t.class === cls ||
        data.timetable.some((tt) => tt.teacherId === t.id && tt.class === cls)
    ).length
  }

  const countStudentsForClass = (cls) => {
    if (cls === 'all') return data.students.length
    return data.students.filter((s) => s.class === cls).length
  }

  return (
    <DashboardLayout
      title="Principal Dashboard"
      activeNav={activeTab}
      onNavClick={handleNav}
    >
      {activeTab === 'dashboard' && (
        <>
          <div className="dash-stats dash-stats-pro">
            <div className="dash-stat-card accent-navy">
              <span className="dash-stat-value">{data.teachers.length}</span>
              <span className="dash-stat-label">Teachers</span>
            </div>
            <div className="dash-stat-card accent-gold">
              <span className="dash-stat-value">{data.students.length}</span>
              <span className="dash-stat-label">Students</span>
            </div>
            <div className="dash-stat-card accent-orange">
              <span className="dash-stat-value">{pendingLeaves.length}</span>
              <span className="dash-stat-label">Pending Leaves</span>
            </div>
            <div className="dash-stat-card accent-teal">
              <span className="dash-stat-value">{SCHOOL_CLASSES.length}</span>
              <span className="dash-stat-label">Classes (Nursery–10)</span>
            </div>
          </div>

          <section className="dash-section dashboard-analytics">
            <div className="dash-section-header">
              <h2>School Analytics</h2>
              <span className="dash-badge">Graphs & Reports</span>
            </div>
            <PrincipalAnalytics />
          </section>

          <div className="overview-cards">
            <button type="button" className="overview-card" onClick={() => handleNav('schedule')}>
              <span className="overview-card-label">Live Schedule</span>
              <span className="overview-card-action">View Now →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('staff')}>
              <span className="overview-card-label">Teacher Directory</span>
              <span className="overview-card-action">View All →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('leaves')}>
              <span className="overview-card-value">{pendingLeaves.length}</span>
              <span className="overview-card-label">Pending Leave Requests</span>
              <span className="overview-card-action">Review →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('students')}>
              <span className="overview-card-label">All Students</span>
              <span className="overview-card-action">View →</span>
            </button>
          </div>
        </>
      )}

      {activeTab === 'schedule' && (
        <>
          <section className="dash-section live-panel">
            <div className="dash-section-header">
              <div>
                <h2>Live — Right Now</h2>
                <p className="live-meta">
                  {getDayName(now)}, {now.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  {' · '}
                  <strong>{formatTime(now)}</strong>
                </p>
              </div>
              {todayHoliday && (
                <span className="holiday-today-badge">{todayHoliday.title} — Holiday</span>
              )}
            </div>

            {todayHoliday ? (
              <p className="empty-message">School is closed today — {todayHoliday.title}</p>
            ) : live.period ? (
              <>
                <div className="live-period-banner">
                  <span className="live-period-label">{live.period.label}</span>
                  <span className="live-period-time">
                    {live.period.start} – {live.period.end}
                  </span>
                </div>
                {live.sessions.length === 0 ? (
                  <p className="empty-message">No classes scheduled for this period.</p>
                ) : (
                  <div className="live-sessions-grid">
                    {live.sessions.map((session) => (
                      <article key={session.id} className="live-session-card">
                        <span className="live-class-badge">
                          {formatClassLabel(session.class)} — Section {session.section}
                        </span>
                        <h3>{session.subject}</h3>
                        <p className="live-teacher">
                          <strong>Teacher:</strong> {session.teacher?.name || '—'}
                        </p>
                        <p className="live-teacher-sub">{session.teacher?.subject}</p>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <p className="empty-message">
                {live.day === 'Sunday'
                  ? 'School is closed on Sundays.'
                  : 'No active period right now — outside school hours or break time.'}
              </p>
            )}
          </section>
        </>
      )}

      {/* TEACHERS DETAIL */}
      {activeTab === 'staff' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Teacher Directory</h2>
            <button
              type="button"
              className="btn btn-navy"
              onClick={() => setShowTeacherForm(!showTeacherForm)}
            >
              {showTeacherForm ? 'Cancel' : '+ Add Teacher'}
            </button>
          </div>

          <ClassFilterSelect
            id="teacher-class-filter"
            value={teacherClassFilter}
            onChange={setTeacherClassFilter}
            getCount={countTeachersForClass}
          />

          {showTeacherForm && (
            <form className="dash-form" onSubmit={handleAddTeacher}>
              <div className="form-grid">
                <label>Full Name<input value={teacherForm.name} onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })} required /></label>
                <label>Email<input type="email" value={teacherForm.email} onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })} required /></label>
                <label>Password<input type="password" value={teacherForm.password} onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })} required /></label>
                <label>Subject<input value={teacherForm.subject} onChange={(e) => setTeacherForm({ ...teacherForm, subject: e.target.value })} required /></label>
                <label>Class<input value={teacherForm.class} onChange={(e) => setTeacherForm({ ...teacherForm, class: e.target.value })} required /></label>
                <label>Section<input value={teacherForm.section} onChange={(e) => setTeacherForm({ ...teacherForm, section: e.target.value })} required /></label>
                <label className="full-width">Class Time<input value={teacherForm.classTime} onChange={(e) => setTeacherForm({ ...teacherForm, classTime: e.target.value })} placeholder="Mon–Fri, 9:00 – 9:45 AM" required /></label>
                <label>Phone<input value={teacherForm.phone} onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })} required /></label>
              </div>
              <button type="submit" className="btn btn-primary">Save Teacher</button>
            </form>
          )}

          <div className="admin-teacher-grid">
            {filteredTeachers.map((teacher) => {
              const schedule = getTeacherSchedule(data.timetable, teacher.id)
              return (
                <article key={teacher.id} className="admin-teacher-card">
                  <div className="admin-teacher-header">
                    <div>
                      <h3>{teacher.name}</h3>
                      <span className="teacher-subject-tag">{teacher.subject}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost-sm"
                      onClick={() =>
                        setSelectedTeacher(selectedTeacher?.id === teacher.id ? null : teacher)
                      }
                    >
                      {selectedTeacher?.id === teacher.id ? 'Hide' : 'Schedule'}
                    </button>
                  </div>
                  <dl className="admin-teacher-meta">
                    <div><dt>Class</dt><dd>{formatClassLabel(teacher.class)} — {teacher.section}</dd></div>
                    <div><dt>Class Time</dt><dd className="teacher-time">{teacher.classTime}</dd></div>
                    <div><dt>Email</dt><dd>{teacher.email}</dd></div>
                    <div><dt>Phone</dt><dd>{teacher.phone}</dd></div>
                    <div><dt>Weekly Periods</dt><dd>{schedule.length} classes/week</dd></div>
                  </dl>
                  {selectedTeacher?.id === teacher.id && (
                    <div className="teacher-weekly-schedule">
                      <h4>Weekly Schedule</h4>
                      {schedule.length === 0 ? (
                        <p className="form-note">No timetable entries yet.</p>
                      ) : (
                        <ul>
                          {schedule.map((slot) => {
                            const period = data.periods.find((p) => p.id === slot.periodId)
                            return (
                              <li key={slot.id}>
                                <strong>{slot.day}</strong> · {period?.label} ({period?.start}–{period?.end})
                                <span> — {slot.subject}, Class {slot.class}-{slot.section}</span>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn-danger"
                    style={{ marginTop: 12 }}
                    onClick={() => {
                      if (confirm(`Remove ${teacher.name}?`)) removeTeacher(teacher.id)
                    }}
                  >
                    Remove
                  </button>
                </article>
              )
            })}
            {filteredTeachers.length === 0 && (
              <p className="empty-message">No teachers found for this class.</p>
            )}
          </div>
        </section>
      )}

      {/* CLASS TIMETABLE */}
      {activeTab === 'timetable' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Class-wise Timetable</h2>
            <div className="header-controls">
              <select value={timetableClass} onChange={(e) => setTimetableClass(e.target.value)}>
                {SCHOOL_CLASSES.map((cls) => (
                  <option key={cls} value={cls}>
                    {formatClassLabel(cls)}
                  </option>
                ))}
              </select>
              <select value={timetableSection} onChange={(e) => setTimetableSection(e.target.value)}>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
              </select>
            </div>
          </div>

          {classSchedule.length === 0 ? (
            <p className="empty-message">
              No timetable for {formatClassLabel(timetableClass)}-{timetableSection} yet.
            </p>
          ) : (
            <div className="timetable-wrap">
              <table className="timetable-table">
                <thead>
                  <tr>
                    <th>Period</th>
                    {SCHOOL_DAYS.map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.periods.map((period) => (
                    <tr key={period.id}>
                      <td className="period-cell">
                        <strong>{period.label}</strong>
                        <span>{period.start}–{period.end}</span>
                      </td>
                      {SCHOOL_DAYS.map((day) => {
                        const slot = groupedTimetable[day]?.find(
                          (s) => s.period?.id === period.id && !s.empty
                        )
                        const isNow =
                          live.period?.id === period.id &&
                          live.day === day &&
                          slot &&
                          !slot.empty &&
                          live.sessions.some(
                            (s) =>
                              s.class === timetableClass &&
                              s.section === timetableSection
                          )
                        return (
                          <td key={day} className={`timetable-slot ${isNow ? 'slot-now' : ''}`}>
                            {slot && !slot.empty ? (
                              <>
                                <strong>{slot.subject}</strong>
                                <span>{getTeacherName(slot.teacherId)}</span>
                                {isNow && <em className="now-tag">NOW</em>}
                              </>
                            ) : (
                              <span className="slot-empty">—</span>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* SPORTS */}
      {activeTab === 'sports' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Sports & Activities</h2>
            <button type="button" className="btn btn-navy" onClick={() => setShowSportForm(!showSportForm)}>
              {showSportForm ? 'Cancel' : '+ Add Sport'}
            </button>
          </div>

          {showSportForm && (
            <form className="dash-form" onSubmit={handleAddSport}>
              <div className="form-grid">
                <label>Sport Name<input value={sportForm.name} onChange={(e) => setSportForm({ ...sportForm, name: e.target.value })} required /></label>
                <label>Coach
                  <select value={sportForm.coachId} onChange={(e) => setSportForm({ ...sportForm, coachId: e.target.value })} required>
                    <option value="">Select</option>
                    {data.teachers.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </label>
                <label>Schedule<input value={sportForm.schedule} onChange={(e) => setSportForm({ ...sportForm, schedule: e.target.value })} placeholder="Mon & Wed, 3:45 PM" required /></label>
                <label>Venue<input value={sportForm.venue} onChange={(e) => setSportForm({ ...sportForm, venue: e.target.value })} required /></label>
                <label>Classes<input value={sportForm.classes} onChange={(e) => setSportForm({ ...sportForm, classes: e.target.value })} placeholder="Class 8–10" required /></label>
                <label className="full-width">Description<textarea value={sportForm.description} onChange={(e) => setSportForm({ ...sportForm, description: e.target.value })} rows={3} /></label>
              </div>
              <button type="submit" className="btn btn-primary">Add Sport</button>
            </form>
          )}

          <div className="sports-grid">
            {data.sports.map((sport) => (
              <article key={sport.id} className="sport-card">
                <div className="sport-card-header">
                  <h3>{sport.name}</h3>
                  <button type="button" className="btn-danger" onClick={() => { if (confirm('Remove?')) removeSport(sport.id) }}>Delete</button>
                </div>
                <dl>
                  <div><dt>Coach</dt><dd>{getTeacherName(sport.coachId)}</dd></div>
                  <div><dt>Schedule</dt><dd className="teacher-time">{sport.schedule}</dd></div>
                  <div><dt>Venue</dt><dd>{sport.venue}</dd></div>
                  <div><dt>Classes</dt><dd>{sport.classes}</dd></div>
                </dl>
                {sport.description && <p>{sport.description}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* HOLIDAYS */}
      {activeTab === 'holidays' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Holiday Calendar</h2>
            <button type="button" className="btn btn-navy" onClick={() => setShowHolidayForm(!showHolidayForm)}>
              {showHolidayForm ? 'Cancel' : '+ Add Holiday'}
            </button>
          </div>

          {showHolidayForm && (
            <form className="dash-form" onSubmit={handleAddHoliday}>
              <div className="form-grid">
                <label className="full-width">Title<input value={holidayForm.title} onChange={(e) => setHolidayForm({ ...holidayForm, title: e.target.value })} required /></label>
                <label>Start Date<input type="date" value={holidayForm.date} onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })} required /></label>
                <label>End Date (optional)<input type="date" value={holidayForm.endDate} onChange={(e) => setHolidayForm({ ...holidayForm, endDate: e.target.value })} /></label>
                <label>Type
                  <select value={holidayForm.type} onChange={(e) => setHolidayForm({ ...holidayForm, type: e.target.value })}>
                    <option>Public Holiday</option>
                    <option>School Holiday</option>
                    <option>Exam Holiday</option>
                  </select>
                </label>
                <label className="full-width">Description<textarea value={holidayForm.description} onChange={(e) => setHolidayForm({ ...holidayForm, description: e.target.value })} rows={2} /></label>
              </div>
              <button type="submit" className="btn btn-primary">Add Holiday</button>
            </form>
          )}

          <div className="holidays-list">
            {data.holidays
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((holiday) => (
                <article key={holiday.id} className="holiday-card">
                  <div className="holiday-card-header">
                    <div>
                      <h3>{holiday.title}</h3>
                      <span className={`holiday-type-badge type-${holiday.type.toLowerCase().replace(/\s+/g, '-')}`}>
                        {holiday.type}
                      </span>
                    </div>
                    <button type="button" className="btn-danger" onClick={() => { if (confirm('Remove?')) removeHoliday(holiday.id) }}>Delete</button>
                  </div>
                  <p className="holiday-dates">
                    {holiday.endDate
                      ? `${holiday.date} → ${holiday.endDate}`
                      : holiday.date}
                  </p>
                  {holiday.description && <p>{holiday.description}</p>}
                </article>
              ))}
          </div>
        </section>
      )}

      {/* LEAVE APPROVALS */}
      {activeTab === 'leaves' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Teacher Leave Approvals</h2>
            <span className="dash-badge">{pendingLeaves.length} pending</span>
          </div>

          <div className="leaves-list">
            {data.teacherLeaves
              .sort((a, b) => b.appliedAt.localeCompare(a.appliedAt))
              .map((leave) => {
                const teacher = data.teachers.find((t) => t.id === leave.teacherId)
                const status = LEAVE_STATUS[leave.status]
                return (
                  <article key={leave.id} className={`leave-card ${status.className}`}>
                    <div className="leave-card-header">
                      <div>
                        <h3>{teacher?.name || 'Unknown'}</h3>
                        <span className="teacher-subject-tag">{teacher?.subject}</span>
                      </div>
                      <span className={`leave-status ${status.className}`}>{status.label}</span>
                    </div>
                    <dl className="leave-meta">
                      <div><dt>From</dt><dd>{leave.fromDate}</dd></div>
                      <div><dt>To</dt><dd>{leave.toDate}</dd></div>
                      <div><dt>Applied</dt><dd>{leave.appliedAt}</dd></div>
                    </dl>
                    <p><strong>Reason:</strong> {leave.reason}</p>
                    {leave.reviewNote && (
                      <p className="review-note"><strong>Note:</strong> {leave.reviewNote}</p>
                    )}
                    {leave.status === 'pending' && (
                      <div className="leave-actions">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => updateLeaveStatus(leave.id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => {
                            const note = prompt('Rejection reason (optional):')
                            updateLeaveStatus(leave.id, 'rejected', note || '')
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </article>
                )
              })}
            {data.teacherLeaves.length === 0 && (
              <p className="empty-message">No leave requests yet.</p>
            )}
          </div>
        </section>
      )}

      {/* ALL STUDENTS */}
      {activeTab === 'students' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>All Students</h2>
            <span className="dash-badge">
              {filteredStudents.length}
              {studentClassFilter !== 'all'
                ? ` in ${formatClassLabel(studentClassFilter)}`
                : ' enrolled'}
            </span>
          </div>

          <ClassFilterSelect
            id="student-class-filter"
            value={studentClassFilter}
            onChange={setStudentClassFilter}
            getCount={countStudentsForClass}
          />

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Parent</th>
                  <th>Class Teacher</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td><strong>{student.rollNo}</strong></td>
                    <td>{student.name}</td>
                    <td>{formatClassLabel(student.class)}</td>
                    <td>{student.section}</td>
                    <td>{student.parentName}</td>
                    <td>{getTeacherName(student.teacherId)}</td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No students in this class.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </DashboardLayout>
  )
}
