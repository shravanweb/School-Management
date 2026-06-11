import { useState } from 'react'
import DashboardLayout from '../../components/DashboardLayout'
import { useSchool } from '../../context/SchoolContext'
import './Dashboard.css'

const emptyTeacher = {
  name: '',
  email: '',
  password: '',
  subject: '',
  phone: '',
}

export default function PrincipalDashboard() {
  const { data, addTeacher, removeTeacher } = useSchool()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyTeacher)
  const [activeTab, setActiveTab] = useState('overview')

  const handleNav = (id) => {
    if (id === 'overview') setActiveTab('overview')
    else if (id === 'staff') setActiveTab('staff')
    else if (id === 'students') setActiveTab('students')
  }

  const activeNav =
    activeTab === 'staff' ? 'staff' : activeTab === 'students' ? 'students' : 'overview'

  const handleAddTeacher = (e) => {
    e.preventDefault()
    const exists = data.teachers.some(
      (t) => t.email.toLowerCase() === form.email.trim().toLowerCase()
    )
    if (exists) {
      alert('A teacher with this email already exists.')
      return
    }
    addTeacher(form)
    setForm(emptyTeacher)
    setShowForm(false)
  }

  const getTeacherName = (teacherId) =>
    data.teachers.find((t) => t.id === teacherId)?.name || '—'

  return (
    <DashboardLayout
      title="Principal Dashboard"
      activeNav={activeNav}
      onNavClick={handleNav}
    >
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="dash-stat-value">{data.teachers.length}</span>
          <span className="dash-stat-label">Total Teachers</span>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-value">{data.students.length}</span>
          <span className="dash-stat-label">Total Students</span>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-value">
            {new Set(data.students.map((s) => s.class)).size}
          </span>
          <span className="dash-stat-label">Classes</span>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="overview-cards">
          <button type="button" className="overview-card" onClick={() => handleNav('staff')}>
            <span className="overview-card-value">{data.teachers.length}</span>
            <span className="overview-card-label">Manage Teachers</span>
            <span className="overview-card-action">Open Staff →</span>
          </button>
          <button type="button" className="overview-card" onClick={() => handleNav('students')}>
            <span className="overview-card-value">{data.students.length}</span>
            <span className="overview-card-label">Track Students</span>
            <span className="overview-card-action">View All →</span>
          </button>
        </div>
      )}

      {activeTab === 'staff' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>Teachers</h2>
            <button
              type="button"
              className="btn btn-navy"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Create Teacher'}
            </button>
          </div>

          {showForm && (
            <form className="dash-form" onSubmit={handleAddTeacher}>
              <div className="form-grid">
                <label>
                  Full Name
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Email (Login ID)
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Subject
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Phone
                  <input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </label>
              </div>
              <button type="submit" className="btn btn-primary">
                Save Teacher
              </button>
            </form>
          )}

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Phone</th>
                  <th>Students</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.teachers.map((teacher) => (
                  <tr key={teacher.id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.phone}</td>
                    <td>
                      {data.students.filter((s) => s.teacherId === teacher.id).length}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => {
                          if (
                            confirm(
                              `Remove ${teacher.name}? Their students will also be removed.`
                            )
                          ) {
                            removeTeacher(teacher.id)
                          }
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {data.teachers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No teachers yet. Create your first teacher account.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {activeTab === 'students' && (
        <section className="dash-section">
          <div className="dash-section-header">
            <h2>All Students</h2>
            <span className="dash-badge">{data.students.length} enrolled</span>
          </div>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Parent</th>
                  <th>Teacher</th>
                </tr>
              </thead>
              <tbody>
                {data.students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      <strong>{student.rollNo}</strong>
                    </td>
                    <td>{student.name}</td>
                    <td>{student.class}</td>
                    <td>{student.section}</td>
                    <td>{student.parentName}</td>
                    <td>{getTeacherName(student.teacherId)}</td>
                  </tr>
                ))}
                {data.students.length === 0 && (
                  <tr>
                    <td colSpan="6" className="empty-row">
                      No students registered yet.
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
