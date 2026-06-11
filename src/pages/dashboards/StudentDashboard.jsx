import DashboardLayout from '../../components/DashboardLayout'
import { useAuth } from '../../context/AuthContext'
import { useSchool } from '../../context/SchoolContext'
import './Dashboard.css'

export default function StudentDashboard() {
  const { user } = useAuth()
  const { getTeacherById } = useSchool()
  const teacher = getTeacherById(user.teacherId)

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="profile-banner student-banner">
        <div>
          <span className="profile-roll">{user.rollNo}</span>
          <h2>Welcome, {user.name}</h2>
          <p>
            Class {user.class} — Section {user.section}
          </p>
        </div>
      </div>

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
          <h3>My Teacher</h3>
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
