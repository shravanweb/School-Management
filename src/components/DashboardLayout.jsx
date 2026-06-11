import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/seed'

const roleLabels = {
  [ROLES.PRINCIPAL]: 'Principal',
  [ROLES.TEACHER]: 'Teacher',
  [ROLES.PARENT]: 'Parent',
  [ROLES.STUDENT]: 'Student',
}

const roleBadges = {
  [ROLES.PRINCIPAL]: 'Administrator',
  [ROLES.TEACHER]: 'Faculty',
  [ROLES.PARENT]: 'Guardian',
  [ROLES.STUDENT]: 'Student',
}

const navConfig = {
  [ROLES.PRINCIPAL]: [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'staff', label: 'Staff Management', icon: 'users' },
  { id: 'students', label: 'All Students', icon: 'students' },
  ],
  [ROLES.TEACHER]: [
    { id: 'overview', label: 'Overview', icon: 'grid' },
    { id: 'students', label: 'My Students', icon: 'students' },
    { id: 'syllabus', label: 'Syllabus', icon: 'book' },
    { id: 'attendance', label: 'Attendance', icon: 'calendar' },
    { id: 'news', label: 'News Updates', icon: 'news' },
    { id: 'results', label: 'Exam Results', icon: 'chart' },
    { id: 'reports', label: 'Reports', icon: 'file' },
  ],
  [ROLES.PARENT]: [
    { id: 'overview', label: 'Dashboard', icon: 'grid' },
    { id: 'profile', label: 'Child Profile', icon: 'user' },
  ],
  [ROLES.STUDENT]: [
    { id: 'overview', label: 'Dashboard', icon: 'grid' },
    { id: 'profile', label: 'My Profile', icon: 'user' },
    { id: 'syllabus', label: 'Syllabus', icon: 'book' },
    { id: 'attendance', label: 'Attendance', icon: 'calendar' },
    { id: 'news', label: 'News Updates', icon: 'news' },
    { id: 'results', label: 'Exam Results', icon: 'chart' },
    { id: 'reports', label: 'Reports', icon: 'file' },
    { id: 'teachers', label: 'My Teachers', icon: 'users' },
  ],
}

function NavIcon({ name }) {
  const icons = {
    grid: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    students: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    book: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    news: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M18 10h-8M10 6h8" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    file: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
      </svg>
    ),
  }
  return <span className="nav-icon">{icons[name]}</span>
}

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function DashboardLayout({
  title,
  activeNav = 'overview',
  onNavClick,
  children,
}) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const displayName =
    user.name || user.parentName || user.email || user.rollNo || 'User'

  const navItems = navConfig[user.role] || []

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="dashboard">
      <button
        type="button"
        className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
        aria-label="Close sidebar"
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo dashboard-logo">
            <span className="logo-icon">M</span>
            <span className="logo-brand">
              <span className="logo-text">
                Master <em>Minds</em>
              </span>
              <span className="logo-tagline">School Portal</span>
            </span>
          </Link>
        </div>

        <div className="sidebar-user-card">
          <div className="sidebar-avatar">{getInitials(displayName)}</div>
          <div className="sidebar-user-info">
            <strong>{displayName}</strong>
            <span className="sidebar-role-badge">{roleBadges[user.role]}</span>
            <span className="sidebar-role-label">{roleLabels[user.role]}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-label">Main Menu</span>
          <ul className="sidebar-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`sidebar-menu-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => {
                    onNavClick?.(item.id)
                    setSidebarOpen(false)
                  }}
                >
                  <NavIcon name={item.icon} />
                  <span>{item.label}</span>
                  {activeNav === item.id && <span className="menu-active-dot" />}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <Link to="/" className="sidebar-footer-link">
            <NavIcon name="home" />
            <span>Back to Website</span>
          </Link>
          <button type="button" className="sidebar-footer-link logout" onClick={handleLogout}>
            <NavIcon name="logout" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="dashboard-main">
        <header className="dashboard-header">
          <div className="dashboard-header-left">
            <button
              type="button"
              className="sidebar-toggle"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
            <div className="dashboard-breadcrumb">
              <span>Portal</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
              <strong>{title}</strong>
            </div>
          </div>
          <div className="dashboard-header-right">
            <div className="header-user-chip">
              <span className="header-user-avatar">{getInitials(displayName)}</span>
              <div>
                <strong>{displayName}</strong>
                <span>{roleLabels[user.role]}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-page-title">
            <h1>{title}</h1>
            <p>Welcome back, {displayName.split(' ')[0]}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
