import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { SchoolProvider } from './context/SchoolContext'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './data/seed'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PrincipalDashboard from './pages/dashboards/PrincipalDashboard'
import TeacherDashboard from './pages/dashboards/TeacherDashboard'
import ParentDashboard from './pages/dashboards/ParentDashboard'
import StudentDashboard from './pages/dashboards/StudentDashboard'

function App() {
  return (
    <SchoolProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/dashboard/principal"
              element={
                <ProtectedRoute role={ROLES.PRINCIPAL}>
                  <PrincipalDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/teacher"
              element={
                <ProtectedRoute role={ROLES.TEACHER}>
                  <TeacherDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/parent"
              element={
                <ProtectedRoute role={ROLES.PARENT}>
                  <ParentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/student"
              element={
                <ProtectedRoute role={ROLES.STUDENT}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </SchoolProvider>
  )
}

export default App
