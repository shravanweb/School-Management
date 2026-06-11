import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useSchool } from '../../context/SchoolContext'
import './Dashboard.css'

export default function ParentDashboard() {
  const { user } = useAuth()
  const { data, getTeacherById } = useSchool()
  const student = data.students.find((s) => s.id === user.studentId)
  const teacher = student ? getTeacherById(student.teacherId) : null

  if (!student) {
    return (
      <DashboardLayout title="Parent Dashboard">
        <p className="empty-message">Student record not found.</p>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Parent Dashboard">
      <div className="profile-banner">
        <div>
          <span className="profile-roll">{student.rollNo}</span>
          <h2>{student.name}</h2>
          <p>
            Class {student.class} — Section {student.section}
          </p>
        </div>
        <div className="profile-parent-tag">
          Parent: <strong>{user.parentName}</strong>
        </div>
      </div>

      <div className="bio-grid">
        <section className="bio-card">
          <h3>Student Information</h3>
          <dl>
            <div>
              <dt>Roll Number</dt>
              <dd>{student.rollNo}</dd>
            </div>
            <div>
              <dt>Full Name</dt>
              <dd>{student.name}</dd>
            </div>
            <div>
              <dt>Date of Birth</dt>
              <dd>{student.dob}</dd>
            </div>
            <div>
              <dt>Gender</dt>
              <dd>{student.gender}</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>{student.address || '—'}</dd>
            </div>
          </dl>
        </section>

        <section className="bio-card">
          <h3>Parent / Guardian</h3>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>{student.parentName}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{student.parentPhone}</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd>{student.parentEmail || '—'}</dd>
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
              <dt>Contact</dt>
              <dd>{teacher?.phone || '—'}</dd>
            </div>
          </dl>
        </section>
      </div>
    </DashboardLayout>
  )
}
