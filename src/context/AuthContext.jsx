import { createContext, useContext, useState } from 'react'
import { ROLES } from '../data/seed'
import { useSchool } from './SchoolContext'

const AuthContext = createContext(null)
const SESSION_KEY = 'masterminds_session'

function loadSession() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const { data, getStudentByRollNo } = useSchool()
  const [user, setUser] = useState(loadSession)

  const persist = (session) => {
    if (session) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } else {
      sessionStorage.removeItem(SESSION_KEY)
    }
    setUser(session)
  }

  const login = (role, credentials) => {
    if (role === ROLES.PRINCIPAL) {
      const { username, password } = credentials
      if (
        data.principal.username === username &&
        data.principal.password === password
      ) {
        const session = { ...data.principal, role: ROLES.PRINCIPAL }
        persist(session)
        return { ok: true, role: ROLES.PRINCIPAL }
      }
      return { ok: false, error: 'Invalid principal credentials' }
    }

    if (role === ROLES.TEACHER) {
      const { email, password } = credentials
      const teacher = data.teachers.find(
        (t) =>
          t.email.toLowerCase() === email.trim().toLowerCase() &&
          t.password === password
      )
      if (teacher) {
        const session = { ...teacher, role: ROLES.TEACHER }
        persist(session)
        return { ok: true, role: ROLES.TEACHER }
      }
      return { ok: false, error: 'Invalid teacher email or password' }
    }

    if (role === ROLES.STUDENT) {
      const { rollNo, password } = credentials
      const student = getStudentByRollNo(rollNo)
      if (student && student.studentPassword === password) {
        const session = { ...student, role: ROLES.STUDENT }
        persist(session)
        return { ok: true, role: ROLES.STUDENT }
      }
      return { ok: false, error: 'Invalid roll number or student password' }
    }

    if (role === ROLES.PARENT) {
      const { rollNo, password } = credentials
      const student = getStudentByRollNo(rollNo)
      if (student && student.parentPassword === password) {
        const session = {
          id: `parent-${student.id}`,
          role: ROLES.PARENT,
          studentId: student.id,
          rollNo: student.rollNo,
          parentName: student.parentName,
          childName: student.name,
        }
        persist(session)
        return { ok: true, role: ROLES.PARENT }
      }
      return {
        ok: false,
        error: 'Invalid roll number or parent password',
      }
    }

    return { ok: false, error: 'Unknown role' }
  }

  const logout = () => persist(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
