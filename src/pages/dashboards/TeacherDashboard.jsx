import { useState } from 'react'
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

export default function TeacherDashboard() {
  const { user } = useAuth()
  const { data, getStudentsByTeacher, addStudent, removeStudent } = useSchool()
  const students = getStudentsByTeacher(user.id)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyStudent)

  const handleAddStudent = (e) => {
    e.preventDefault()
    const exists = data.students.some(
      (s) => s.rollNo.toLowerCase() === form.rollNo.trim().toLowerCase()
    )
    if (exists) {
      alert('This roll number already exists.')
      return
    }
    addStudent({ ...form, teacherId: user.id })
    setForm(emptyStudent)
    setShowForm(false)
  }

  return (
    <DashboardLayout title="Teacher Dashboard">
      <div className="dash-stats">
        <div className="dash-stat-card">
          <span className="dash-stat-value">{students.length}</span>
          <span className="dash-stat-label">My Students</span>
        </div>
        <div className="dash-stat-card">
          <span className="dash-stat-value">{user.subject}</span>
          <span className="dash-stat-label">Subject</span>
        </div>
      </div>

      <section className="dash-section">
        <div className="dash-section-header">
          <h2>Student Biodata</h2>
          <button
            type="button"
            className="btn btn-navy"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Add Student'}
          </button>
        </div>

        {showForm && (
          <form className="dash-form" onSubmit={handleAddStudent}>
            <h3>New Student Registration</h3>
            <div className="form-grid">
              <label>
                Roll Number *
                <input
                  value={form.rollNo}
                  onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
                  placeholder="MM2024002"
                  required
                />
              </label>
              <label>
                Student Name *
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Class *
                <input
                  value={form.class}
                  onChange={(e) => setForm({ ...form, class: e.target.value })}
                  placeholder="10"
                  required
                />
              </label>
              <label>
                Section *
                <input
                  value={form.section}
                  onChange={(e) => setForm({ ...form, section: e.target.value })}
                  placeholder="A"
                  required
                />
              </label>
              <label>
                Date of Birth *
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  required
                />
              </label>
              <label>
                Gender
                <select
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="full-width">
                Address
                <input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </label>
              <label>
                Parent Name *
                <input
                  value={form.parentName}
                  onChange={(e) => setForm({ ...form, parentName: e.target.value })}
                  required
                />
              </label>
              <label>
                Parent Phone *
                <input
                  value={form.parentPhone}
                  onChange={(e) => setForm({ ...form, parentPhone: e.target.value })}
                  required
                />
              </label>
              <label>
                Parent Email
                <input
                  type="email"
                  value={form.parentEmail}
                  onChange={(e) => setForm({ ...form, parentEmail: e.target.value })}
                />
              </label>
              <label>
                Student Login Password *
                <input
                  type="password"
                  value={form.studentPassword}
                  onChange={(e) =>
                    setForm({ ...form, studentPassword: e.target.value })
                  }
                  required
                />
              </label>
              <label>
                Parent Login Password *
                <input
                  type="password"
                  value={form.parentPassword}
                  onChange={(e) =>
                    setForm({ ...form, parentPassword: e.target.value })
                  }
                  required
                />
              </label>
            </div>
            <p className="form-note">
              Parents will login using the roll number and parent password above.
            </p>
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
                  <td>
                    <strong>{student.rollNo}</strong>
                  </td>
                  <td>{student.name}</td>
                  <td>
                    {student.class}-{student.section}
                  </td>
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
    </DashboardLayout>
  )
}
