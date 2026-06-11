import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/seed'
import './LoginPage.css'

const roles = [
  {
    id: ROLES.PRINCIPAL,
    label: 'Principal',
    desc: 'Admin access',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: ROLES.TEACHER,
    label: 'Teacher',
    desc: 'Faculty portal',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
  },
  {
    id: ROLES.PARENT,
    label: 'Parent',
    desc: 'Roll no. login',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    id: ROLES.STUDENT,
    label: 'Student',
    desc: 'Roll no. login',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
      </svg>
    ),
  },
]

function PasswordToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      className="input-toggle"
      onClick={onToggle}
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  )
}

const demoCredentials = {
  [ROLES.PRINCIPAL]: { user: 'principal', pass: 'admin123' },
  [ROLES.TEACHER]: { user: 'priya@masterminds.edu', pass: 'teacher123' },
  [ROLES.STUDENT]: { user: 'MM2024001', pass: 'student123' },
  [ROLES.PARENT]: { user: 'MM2024001', pass: 'parent123' },
}

export default function LoginPage() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState(ROLES.PRINCIPAL)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const [principalForm, setPrincipalForm] = useState({ username: '', password: '' })
  const [teacherForm, setTeacherForm] = useState({ email: '', password: '' })
  const [rollForm, setRollForm] = useState({ rollNo: '', password: '' })

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/dashboard/${user.role}`, { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    let credentials
    if (selectedRole === ROLES.PRINCIPAL) credentials = principalForm
    else if (selectedRole === ROLES.TEACHER) credentials = teacherForm
    else credentials = rollForm

    const result = login(selectedRole, credentials)
    setLoading(false)

    if (result.ok) {
      navigate(`/dashboard/${result.role}`)
    } else {
      setError(result.error)
    }
  }

  const fillDemo = () => {
    const demo = demoCredentials[selectedRole]
    if (selectedRole === ROLES.PRINCIPAL) {
      setPrincipalForm({ username: demo.user, password: demo.pass })
    } else if (selectedRole === ROLES.TEACHER) {
      setTeacherForm({ email: demo.user, password: demo.pass })
    } else {
      setRollForm({ rollNo: demo.user, password: demo.pass })
    }
    setError('')
  }

  const selectedRoleData = roles.find((r) => r.id === selectedRole)
  const demo = demoCredentials[selectedRole]

  return (
    <div className="login-page">
      <aside className="login-brand-panel">
        <div className="login-brand-bg" />
        <div className="login-brand-overlay" />
        <div className="login-brand-content">
          <Link to="/" className="logo login-brand-logo">
            <span className="logo-icon">M</span>
            <span className="logo-brand">
              <span className="logo-text">
                Master <em>Minds</em>
              </span>
              <span className="logo-tagline">School of Excellence</span>
            </span>
          </Link>

          <div className="login-brand-message">
            <h2>School Management Portal</h2>
            <p>
              Secure access for principals, teachers, parents, and students.
              Manage records, track progress, and stay connected.
            </p>
          </div>

          <ul className="login-brand-features">
            <li>
              <span className="feature-icon">✓</span>
              Role-based secure login
            </li>
            <li>
              <span className="feature-icon">✓</span>
              Student biodata management
            </li>
            <li>
              <span className="feature-icon">✓</span>
              Parent & student access
            </li>
          </ul>

          <Link to="/" className="login-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Website
          </Link>
        </div>
      </aside>

      <main className="login-form-panel">
        <div className="login-form-wrap">
          <div className="login-form-header">
            <p className="login-eyebrow">Welcome back</p>
            <h1>Sign in to your account</h1>
            <p className="login-subtitle">
              Choose your role and enter your credentials to continue.
            </p>
          </div>

          <div className="role-tabs" role="tablist" aria-label="Login role">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                role="tab"
                aria-selected={selectedRole === role.id}
                className={`role-tab ${selectedRole === role.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedRole(role.id)
                  setError('')
                  setShowPassword(false)
                }}
              >
                <span className="role-tab-icon">{role.icon}</span>
                <span className="role-tab-text">
                  <strong>{role.label}</strong>
                  <small>{role.desc}</small>
                </span>
              </button>
            ))}
          </div>

          <div className="login-role-banner">
            <span className="login-role-banner-icon">{selectedRoleData?.icon}</span>
            <div>
              <strong>{selectedRoleData?.label} Login</strong>
              <span>
                {selectedRole === ROLES.PARENT
                  ? 'Use your child\'s roll number and parent password'
                  : selectedRole === ROLES.STUDENT
                    ? 'Use your roll number and student password'
                    : `Enter your ${selectedRoleData?.label.toLowerCase()} credentials`}
              </span>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {selectedRole === ROLES.PRINCIPAL && (
              <>
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input
                      id="username"
                      type="text"
                      value={principalForm.username}
                      onChange={(e) =>
                        setPrincipalForm({ ...principalForm, username: e.target.value })
                      }
                      placeholder="Enter username"
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="principal-password">Password</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <input
                      id="principal-password"
                      type={showPassword ? 'text' : 'password'}
                      value={principalForm.password}
                      onChange={(e) =>
                        setPrincipalForm({ ...principalForm, password: e.target.value })
                      }
                      placeholder="Enter password"
                      required
                      autoComplete="current-password"
                    />
                    <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                  </div>
                </div>
              </>
            )}

            {selectedRole === ROLES.TEACHER && (
              <>
                <div className="input-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <input
                      id="email"
                      type="email"
                      value={teacherForm.email}
                      onChange={(e) =>
                        setTeacherForm({ ...teacherForm, email: e.target.value })
                      }
                      placeholder="teacher@masterminds.edu"
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="teacher-password">Password</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <input
                      id="teacher-password"
                      type={showPassword ? 'text' : 'password'}
                      value={teacherForm.password}
                      onChange={(e) =>
                        setTeacherForm({ ...teacherForm, password: e.target.value })
                      }
                      placeholder="Enter password"
                      required
                      autoComplete="current-password"
                    />
                    <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                  </div>
                </div>
              </>
            )}

            {(selectedRole === ROLES.PARENT || selectedRole === ROLES.STUDENT) && (
              <>
                <div className="input-group">
                  <label htmlFor="rollNo">Student Roll Number</label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                    </svg>
                    <input
                      id="rollNo"
                      type="text"
                      value={rollForm.rollNo}
                      onChange={(e) =>
                        setRollForm({ ...rollForm, rollNo: e.target.value })
                      }
                      placeholder="e.g. MM2024001"
                      required
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="roll-password">
                    {selectedRole === ROLES.PARENT ? 'Parent Password' : 'Student Password'}
                  </label>
                  <div className="input-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <input
                      id="roll-password"
                      type={showPassword ? 'text' : 'password'}
                      value={rollForm.password}
                      onChange={(e) =>
                        setRollForm({ ...rollForm, password: e.target.value })
                      }
                      placeholder="Enter password"
                      required
                    />
                    <PasswordToggle show={showPassword} onToggle={() => setShowPassword(!showPassword)} />
                  </div>
                </div>
              </>
            )}

            {error && (
              <div className="login-error" role="alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
              {loading ? (
                <>
                  <span className="login-spinner" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-demo-box">
            <div className="login-demo-header">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
              <span>Demo credentials for <strong>{selectedRoleData?.label}</strong></span>
            </div>
            <div className="login-demo-creds">
              <div>
                <small>{selectedRole === ROLES.TEACHER ? 'Email' : selectedRole === ROLES.PRINCIPAL ? 'Username' : 'Roll No'}</small>
                <code>{demo.user}</code>
              </div>
              <div>
                <small>Password</small>
                <code>{demo.pass}</code>
              </div>
            </div>
            <button type="button" className="login-demo-fill" onClick={fillDemo}>
              Auto-fill credentials
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
