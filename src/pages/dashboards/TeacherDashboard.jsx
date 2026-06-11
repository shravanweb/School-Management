import { useEffect, useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useSchool } from '../../context/SchoolContext'
import './Dashboard.css'

const emptyStudent = {
  rollNo: '',
  name: '',
  class: '',
  section: '',
  dob: '',
  gender: 'Male',
  address: '',
  parentName: '',
  parentPhone: '',
  parentEmail: '',
  studentPassword: '',
  parentPassword: '',
}

const emptyUnit = { title: '', topics: '', weeks: 1 }

const ATTENDANCE_CYCLE = ['', 'present', 'absent', 'late']

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

function getDaysInMonth(month) {
  const [year, mon] = month.split('-').map(Number)
  return new Date(year, mon, 0).getDate()
}

export default function TeacherDashboard() {
  const { user } = useAuth()
  const {
    data,
    getStudentsByTeacher,
    addStudent,
    removeStudent,
    upsertSyllabus,
    getSyllabusByTeacher,
    setAttendanceRecord,
    getAttendanceForStudent,
    addNews,
    removeNews,
    getNewsByTeacher,
    addExamResult,
    removeExamResult,
    getExamResultsByTeacher,
    addReport,
    removeReport,
    getReportsByTeacher,
  } = useSchool()

  const students = getStudentsByTeacher(user.id)
  const [activeTab, setActiveTab] = useState('overview')
  const [showStudentForm, setShowStudentForm] = useState(false)
  const [studentForm, setStudentForm] = useState(emptyStudent)

  const [syllabusClass, setSyllabusClass] = useState(students[0]?.class || '')
  const [syllabusSection, setSyllabusSection] = useState(students[0]?.section || '')
  const [syllabusUnits, setSyllabusUnits] = useState([{ ...emptyUnit }])

  const [attendanceMonth, setAttendanceMonth] = useState(currentMonth())
  const [attendanceStudentId, setAttendanceStudentId] = useState(students[0]?.id || '')
  const [attendanceRecords, setAttendanceRecords] = useState({})

  const [newsForm, setNewsForm] = useState({
    title: '',
    body: '',
    targetClass: students[0]?.class || '10',
    targetSection: 'all',
  })

  const [examForm, setExamForm] = useState({
    studentId: students[0]?.id || '',
    examName: '',
    term: 'Term 1',
    subjects: [{ name: user.subject, marks: '', maxMarks: 100, grade: '' }],
  })

  const [reportForm, setReportForm] = useState({
    studentId: students[0]?.id || '',
    term: 'Term 1',
    type: 'progress',
    remarks: '',
    rating: 'Good',
  })

  const handleNav = (id) => setActiveTab(id)

  useEffect(() => {
    if (students.length > 0 && !attendanceStudentId) {
      setAttendanceStudentId(students[0].id)
    }
  }, [students, attendanceStudentId])

  useEffect(() => {
    if (activeTab === 'attendance' && attendanceStudentId) {
      const record = getAttendanceForStudent(attendanceStudentId, attendanceMonth)
      setAttendanceRecords(record?.records || {})
    }
  }, [activeTab, attendanceStudentId, attendanceMonth, getAttendanceForStudent])

  const handleAddStudent = (e) => {
    e.preventDefault()
    const exists = data.students.some(
      (s) => s.rollNo.toLowerCase() === studentForm.rollNo.trim().toLowerCase()
    )
    if (exists) {
      alert('This roll number already exists.')
      return
    }
    addStudent({ ...studentForm, teacherId: user.id })
    setStudentForm(emptyStudent)
    setShowStudentForm(false)
  }

  const loadAttendanceForStudent = (studentId, month) => {
    const record = getAttendanceForStudent(studentId, month)
    setAttendanceRecords(record?.records || {})
  }

  const handleAttendanceStudentChange = (studentId) => {
    setAttendanceStudentId(studentId)
    loadAttendanceForStudent(studentId, attendanceMonth)
  }

  const handleAttendanceMonthChange = (month) => {
    setAttendanceMonth(month)
    if (attendanceStudentId) {
      loadAttendanceForStudent(attendanceStudentId, month)
    }
  }

  const cycleAttendance = (day) => {
    const current = attendanceRecords[day] || ''
    const idx = ATTENDANCE_CYCLE.indexOf(current)
    const next = ATTENDANCE_CYCLE[(idx + 1) % ATTENDANCE_CYCLE.length]
    const updated = { ...attendanceRecords }
    if (next) updated[day] = next
    else delete updated[day]
    setAttendanceRecords(updated)
  }

  const saveAttendance = () => {
    if (!attendanceStudentId) return
    setAttendanceRecord(attendanceStudentId, user.id, attendanceMonth, attendanceRecords)
    alert('Attendance saved successfully.')
  }

  const handleSaveSyllabus = (e) => {
    e.preventDefault()
    if (!syllabusClass || !syllabusSection) {
      alert('Please set class and section.')
      return
    }
    upsertSyllabus({
      teacherId: user.id,
      class: syllabusClass,
      section: syllabusSection,
      subject: user.subject,
      units: syllabusUnits
        .filter((u) => u.title.trim())
        .map((u) => ({
          title: u.title,
          topics: u.topics.split(',').map((t) => t.trim()).filter(Boolean),
          weeks: Number(u.weeks) || 1,
        })),
    })
    alert('Syllabus saved successfully.')
  }

  const loadExistingSyllabus = () => {
    const existing = getSyllabusByTeacher(user.id).find(
      (s) => s.class === syllabusClass && s.section === syllabusSection
    )
    if (existing) {
      setSyllabusUnits(
        existing.units.map((u) => ({
          title: u.title,
          topics: u.topics.join(', '),
          weeks: u.weeks,
        }))
      )
    } else {
      setSyllabusUnits([{ ...emptyUnit }])
    }
  }

  const handleAddNews = (e) => {
    e.preventDefault()
    addNews({ ...newsForm, teacherId: user.id })
    setNewsForm({
      title: '',
      body: '',
      targetClass: students[0]?.class || '10',
      targetSection: 'all',
    })
  }

  const handleAddExamResult = (e) => {
    e.preventDefault()
    if (!examForm.studentId) return
    addExamResult({
      studentId: examForm.studentId,
      teacherId: user.id,
      examName: examForm.examName,
      term: examForm.term,
      subjects: examForm.subjects
        .filter((s) => s.name && s.marks !== '')
        .map((s) => ({
          name: s.name,
          marks: Number(s.marks),
          maxMarks: Number(s.maxMarks),
          grade: s.grade,
        })),
    })
    setExamForm({
      studentId: students[0]?.id || '',
      examName: '',
      term: 'Term 1',
      subjects: [{ name: user.subject, marks: '', maxMarks: 100, grade: '' }],
    })
  }

  const handleAddReport = (e) => {
    e.preventDefault()
    if (!reportForm.studentId) return
    addReport({ ...reportForm, teacherId: user.id })
    setReportForm({
      studentId: students[0]?.id || '',
      term: 'Term 1',
      type: 'progress',
      remarks: '',
      rating: 'Good',
    })
  }

  const teacherNews = getNewsByTeacher(user.id)
  const teacherExams = getExamResultsByTeacher(user.id)
  const teacherReports = getReportsByTeacher(user.id)
  const daysInMonth = getDaysInMonth(attendanceMonth)

  return (
    <DashboardLayout
      title="Teacher Dashboard"
      activeNav={activeTab}
      onNavClick={handleNav}
    >
      {activeTab === 'overview' && (
        <>
          <div className="dash-stats">
            <div className="dash-stat-card">
              <span className="dash-stat-value">{students.length}</span>
              <span className="dash-stat-label">My Students</span>
            </div>
            <div className="dash-stat-card">
              <span className="dash-stat-value">{user.subject}</span>
              <span className="dash-stat-label">Subject</span>
            </div>
            <div className="dash-stat-card">
              <span className="dash-stat-value">{teacherNews.length}</span>
              <span className="dash-stat-label">News Posted</span>
            </div>
            <div className="dash-stat-card">
              <span className="dash-stat-value">{teacherExams.length}</span>
              <span className="dash-stat-label">Results Published</span>
            </div>
          </div>

          <div className="overview-cards">
            <button type="button" className="overview-card" onClick={() => handleNav('syllabus')}>
              <span className="overview-card-label">Update Syllabus</span>
              <span className="overview-card-action">Open →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('attendance')}>
              <span className="overview-card-label">Mark Attendance</span>
              <span className="overview-card-action">Open →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('news')}>
              <span className="overview-card-label">Post News</span>
              <span className="overview-card-action">Open →</span>
            </button>
            <button type="button" className="overview-card" onClick={() => handleNav('results')}>
              <span className="overview-card-label">Publish Results</span>
              <span className="overview-card-action">Open →</span>
            </button>
          </div>
        </>
      )}

      {activeTab === 'students' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Student Biodata</h2>
            <button
              type="button"
              className="btn btn-navy"
              onClick={() => setShowStudentForm(!showStudentForm)}
            >
              {showStudentForm ? 'Cancel' : '+ Add Student'}
            </button>
          </div>

          {showStudentForm && (
            <form className="dash-form" onSubmit={handleAddStudent}>
              <h3>New Student Registration</h3>
              <div className="form-grid">
                <label>
                  Roll Number *
                  <input
                    value={studentForm.rollNo}
                    onChange={(e) => setStudentForm({ ...studentForm, rollNo: e.target.value })}
                    placeholder="MM2024002"
                    required
                  />
                </label>
                <label>
                  Student Name *
                  <input
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Class *
                  <input
                    value={studentForm.class}
                    onChange={(e) => setStudentForm({ ...studentForm, class: e.target.value })}
                    placeholder="10"
                    required
                  />
                </label>
                <label>
                  Section *
                  <input
                    value={studentForm.section}
                    onChange={(e) => setStudentForm({ ...studentForm, section: e.target.value })}
                    placeholder="A"
                    required
                  />
                </label>
                <label>
                  Date of Birth *
                  <input
                    type="date"
                    value={studentForm.dob}
                    onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Gender
                  <select
                    value={studentForm.gender}
                    onChange={(e) => setStudentForm({ ...studentForm, gender: e.target.value })}
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </label>
                <label className="full-width">
                  Address
                  <input
                    value={studentForm.address}
                    onChange={(e) => setStudentForm({ ...studentForm, address: e.target.value })}
                  />
                </label>
                <label>
                  Parent Name *
                  <input
                    value={studentForm.parentName}
                    onChange={(e) => setStudentForm({ ...studentForm, parentName: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Parent Phone *
                  <input
                    value={studentForm.parentPhone}
                    onChange={(e) => setStudentForm({ ...studentForm, parentPhone: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Parent Email
                  <input
                    type="email"
                    value={studentForm.parentEmail}
                    onChange={(e) => setStudentForm({ ...studentForm, parentEmail: e.target.value })}
                  />
                </label>
                <label>
                  Student Login Password *
                  <input
                    type="password"
                    value={studentForm.studentPassword}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, studentPassword: e.target.value })
                    }
                    required
                  />
                </label>
                <label>
                  Parent Login Password *
                  <input
                    type="password"
                    value={studentForm.parentPassword}
                    onChange={(e) =>
                      setStudentForm({ ...studentForm, parentPassword: e.target.value })
                    }
                    required
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Register Student
              </button>
            </form>
          )}

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Parent</th>
                  <th>Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td><strong>{student.rollNo}</strong></td>
                    <td>{student.name}</td>
                    <td>{student.class}-{student.section}</td>
                    <td>{student.parentName}</td>
                    <td>{student.parentPhone}</td>
                    <td>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => {
                          if (confirm(`Remove student ${student.name}?`)) {
                            removeStudent(student.id)
                          }
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No students yet. Add student biodata to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'syllabus' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Update Syllabus — {user.subject}</h2>
          </div>
          <form className="dash-form" onSubmit={handleSaveSyllabus}>
            <div className="form-grid">
              <label>
                Class
                <input
                  value={syllabusClass}
                  onChange={(e) => setSyllabusClass(e.target.value)}
                  placeholder="10"
                  required
                />
              </label>
              <label>
                Section
                <input
                  value={syllabusSection}
                  onChange={(e) => setSyllabusSection(e.target.value)}
                  placeholder="A"
                  required
                />
              </label>
            </div>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={loadExistingSyllabus}
              style={{ marginBottom: 16 }}
            >
              Load Existing Syllabus
            </button>

            {syllabusUnits.map((unit, idx) => (
              <div key={idx} className="unit-form-row">
                <label>
                  Unit {idx + 1} Title
                  <input
                    value={unit.title}
                    onChange={(e) => {
                      const updated = [...syllabusUnits]
                      updated[idx] = { ...unit, title: e.target.value }
                      setSyllabusUnits(updated)
                    }}
                    required
                  />
                </label>
                <label>
                  Topics (comma-separated)
                  <input
                    value={unit.topics}
                    onChange={(e) => {
                      const updated = [...syllabusUnits]
                      updated[idx] = { ...unit, topics: e.target.value }
                      setSyllabusUnits(updated)
                    }}
                    placeholder="Topic 1, Topic 2"
                    required
                  />
                </label>
                <label>
                  Weeks
                  <input
                    type="number"
                    min="1"
                    value={unit.weeks}
                    onChange={(e) => {
                      const updated = [...syllabusUnits]
                      updated[idx] = { ...unit, weeks: e.target.value }
                      setSyllabusUnits(updated)
                    }}
                  />
                </label>
                {syllabusUnits.length > 1 && (
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() =>
                      setSyllabusUnits(syllabusUnits.filter((_, i) => i !== idx))
                    }
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setSyllabusUnits([...syllabusUnits, { ...emptyUnit }])}
              >
                + Add Unit
              </button>
              <button type="submit" className="btn btn-primary">
                Save Syllabus
              </button>
            </div>
          </form>
        </section>
      )}

      {activeTab === 'attendance' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Monthly Attendance</h2>
            <div className="header-controls">
              <select
                value={attendanceStudentId}
                onChange={(e) => handleAttendanceStudentChange(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.rollNo})
                  </option>
                ))}
              </select>
              <input
                type="month"
                value={attendanceMonth}
                onChange={(e) => handleAttendanceMonthChange(e.target.value)}
                className="month-picker"
              />
            </div>
          </div>

          {attendanceStudentId ? (
            <>
              <p className="form-note">Click each day to cycle: — → Present → Absent → Late</p>
              <div className="attendance-calendar editable">
                {Array.from({ length: daysInMonth }, (_, i) => {
                  const day = String(i + 1)
                  const status = attendanceRecords[day]
                  return (
                    <button
                      key={day}
                      type="button"
                      className={`att-day ${status || 'unmarked'}`}
                      onClick={() => cycleAttendance(day)}
                    >
                      <span className="att-day-num">{day}</span>
                      <span className="att-day-status">
                        {status === 'present' ? 'P' : status === 'absent' ? 'A' : status === 'late' ? 'L' : '—'}
                      </span>
                    </button>
                  )
                })}
              </div>
              <button type="button" className="btn btn-primary" onClick={saveAttendance}>
                Save Attendance
              </button>
            </>
          ) : (
            <p className="empty-message">Select a student to mark attendance.</p>
          )}
        </section>
      )}

      {activeTab === 'news' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>News & Announcements</h2>
          </div>
          <form className="dash-form" onSubmit={handleAddNews}>
            <div className="form-grid">
              <label className="full-width">
                Title
                <input
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  required
                />
              </label>
              <label className="full-width">
                Message
                <textarea
                  value={newsForm.body}
                  onChange={(e) => setNewsForm({ ...newsForm, body: e.target.value })}
                  rows={4}
                  required
                />
              </label>
              <label>
                Target Class
                <input
                  value={newsForm.targetClass}
                  onChange={(e) => setNewsForm({ ...newsForm, targetClass: e.target.value })}
                  placeholder="10 or all"
                  required
                />
              </label>
              <label>
                Target Section
                <select
                  value={newsForm.targetSection}
                  onChange={(e) => setNewsForm({ ...newsForm, targetSection: e.target.value })}
                >
                  <option value="all">All Sections</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Post News
            </button>
          </form>

          <div className="news-list">
            {teacherNews.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-card-header">
                  <h3>{item.title}</h3>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => {
                      if (confirm('Delete this news post?')) removeNews(item.id)
                    }}
                  >
                    Delete
                  </button>
                </div>
                <p>{item.body}</p>
                <span className="news-target">
                  Class {item.targetClass}
                  {item.targetSection !== 'all' ? `-${item.targetSection}` : ' (All Sections)'}
                  · {item.createdAt}
                </span>
              </article>
            ))}
            {teacherNews.length === 0 && (
              <p className="empty-message">No news posted yet.</p>
            )}
          </div>
        </section>
      )}

      {activeTab === 'results' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Exam Results</h2>
          </div>
          <form className="dash-form" onSubmit={handleAddExamResult}>
            <div className="form-grid">
              <label>
                Student
                <select
                  value={examForm.studentId}
                  onChange={(e) => setExamForm({ ...examForm, studentId: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Exam Name
                <input
                  value={examForm.examName}
                  onChange={(e) => setExamForm({ ...examForm, examName: e.target.value })}
                  placeholder="Unit Test 1"
                  required
                />
              </label>
              <label>
                Term
                <select
                  value={examForm.term}
                  onChange={(e) => setExamForm({ ...examForm, term: e.target.value })}
                >
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Annual</option>
                </select>
              </label>
            </div>
            {examForm.subjects.map((sub, idx) => (
              <div key={idx} className="subject-form-row">
                <label>
                  Subject
                  <input
                    value={sub.name}
                    onChange={(e) => {
                      const updated = [...examForm.subjects]
                      updated[idx] = { ...sub, name: e.target.value }
                      setExamForm({ ...examForm, subjects: updated })
                    }}
                  />
                </label>
                <label>
                  Marks
                  <input
                    type="number"
                    value={sub.marks}
                    onChange={(e) => {
                      const updated = [...examForm.subjects]
                      updated[idx] = { ...sub, marks: e.target.value }
                      setExamForm({ ...examForm, subjects: updated })
                    }}
                  />
                </label>
                <label>
                  Max
                  <input
                    type="number"
                    value={sub.maxMarks}
                    onChange={(e) => {
                      const updated = [...examForm.subjects]
                      updated[idx] = { ...sub, maxMarks: e.target.value }
                      setExamForm({ ...examForm, subjects: updated })
                    }}
                  />
                </label>
                <label>
                  Grade
                  <input
                    value={sub.grade}
                    onChange={(e) => {
                      const updated = [...examForm.subjects]
                      updated[idx] = { ...sub, grade: e.target.value }
                      setExamForm({ ...examForm, subjects: updated })
                    }}
                    placeholder="A"
                  />
                </label>
              </div>
            ))}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  setExamForm({
                    ...examForm,
                    subjects: [...examForm.subjects, { name: '', marks: '', maxMarks: 100, grade: '' }],
                  })
                }
              >
                + Add Subject
              </button>
              <button type="submit" className="btn btn-primary">
                Publish Result
              </button>
            </div>
          </form>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Exam</th>
                  <th>Term</th>
                  <th>Subjects</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teacherExams.map((exam) => {
                  const student = students.find((s) => s.id === exam.studentId)
                  return (
                    <tr key={exam.id}>
                      <td>{student?.name || '—'}</td>
                      <td>{exam.examName}</td>
                      <td>{exam.term}</td>
                      <td>{exam.subjects.map((s) => s.name).join(', ')}</td>
                      <td>{exam.publishedAt}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-danger"
                          onClick={() => {
                            if (confirm('Delete this result?')) removeExamResult(exam.id)
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {teacherExams.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">No results published yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Student Reports</h2>
          </div>
          <form className="dash-form" onSubmit={handleAddReport}>
            <div className="form-grid">
              <label>
                Student
                <select
                  value={reportForm.studentId}
                  onChange={(e) => setReportForm({ ...reportForm, studentId: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Term
                <select
                  value={reportForm.term}
                  onChange={(e) => setReportForm({ ...reportForm, term: e.target.value })}
                >
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Annual</option>
                </select>
              </label>
              <label>
                Report Type
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                >
                  <option value="progress">Progress</option>
                  <option value="behavior">Behavior</option>
                </select>
              </label>
              <label>
                Rating
                <select
                  value={reportForm.rating}
                  onChange={(e) => setReportForm({ ...reportForm, rating: e.target.value })}
                >
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Needs Improvement</option>
                </select>
              </label>
              <label className="full-width">
                Remarks
                <textarea
                  value={reportForm.remarks}
                  onChange={(e) => setReportForm({ ...reportForm, remarks: e.target.value })}
                  rows={4}
                  required
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Save Report
            </button>
          </form>

          <div className="reports-list">
            {teacherReports.map((report) => {
              const student = students.find((s) => s.id === report.studentId)
              return (
                <article key={report.id} className="report-card">
                  <div className="report-card-header">
                    <div>
                      <h3>{student?.name} — {report.term}</h3>
                      <span className={`rating-badge rating-${report.rating.toLowerCase().replace(' ', '-')}`}>
                        {report.rating}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="btn-danger"
                      onClick={() => {
                        if (confirm('Delete this report?')) removeReport(report.id)
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <p>{report.remarks}</p>
                  <span className="news-target">{report.type} · {report.createdAt}</span>
                </article>
              )
            })}
            {teacherReports.length === 0 && (
              <p className="empty-message">No reports created yet.</p>
            )}
          </div>
        </section>
      )}
    </DashboardLayout>
  )
}
