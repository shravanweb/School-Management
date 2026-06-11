import { useSchool } from '../context/SchoolContext'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/seed'
import {
  getAttendanceOverview,
  getExamResultsTable,
  getLeaveOverview,
  getStudentExamChart,
  getStudentsPerClass,
  getSubjectMarksChart,
  getTeacherStudentAttendance,
} from '../utils/dashboardAnalytics'
import { BarChart, ColumnChart, AnalyticsTable } from './DashboardCharts'

function currentMonth() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function PrincipalAnalytics() {
  const { data } = useSchool()
  const studentsPerClass = getStudentsPerClass(data.students)
  const attendanceData = getAttendanceOverview(data.attendance)
  const leaveData = getLeaveOverview(data.teacherLeaves)
  const examTable = getExamResultsTable(data.examResults, data.students)

  return (
    <div className="analytics-grid">
      <BarChart title="Students per Class" data={studentsPerClass} />
      <ColumnChart title="Attendance Overview" data={attendanceData} />
      <ColumnChart title="Teacher Leave Status" data={leaveData} />
      <AnalyticsTable
        title="Exam Results Summary"
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'class', label: 'Class' },
          { key: 'exam', label: 'Exam' },
          { key: 'average', label: 'Average' },
          { key: 'date', label: 'Published' },
        ]}
        rows={examTable}
      />
      <AnalyticsTable
        title="Class-wise Student Count"
        columns={[
          { key: 'class', label: 'Class' },
          { key: 'count', label: 'Students' },
        ]}
        rows={studentsPerClass.map((item, i) => ({
          id: `cls-${i}`,
          class: item.label,
          count: item.value,
        }))}
      />
    </div>
  )
}

export function TeacherAnalytics() {
  const { user } = useAuth()
  const { data, getStudentsByTeacher } = useSchool()
  const students = getStudentsByTeacher(user.id)
  const month = currentMonth()
  const attendanceChart = getTeacherStudentAttendance(data.attendance, students, month)
  const myExams = data.examResults.filter((e) => e.teacherId === user.id)
  const examTable = getExamResultsTable(myExams, students)

  return (
    <div className="analytics-grid">
      <BarChart
        title="Student Attendance % (This Month)"
        data={attendanceChart}
        suffix="%"
        maxValue={100}
      />
      <ColumnChart
        title="My Students"
        data={students.map((s, i) => ({
          label: s.name.split(' ')[0],
          value: 1,
          color: i % 2 === 0 ? 'var(--navy)' : 'var(--gold)',
        }))}
      />
      <AnalyticsTable
        title="Published Exam Results"
        columns={[
          { key: 'student', label: 'Student' },
          { key: 'exam', label: 'Exam' },
          { key: 'average', label: 'Average' },
          { key: 'date', label: 'Date' },
        ]}
        rows={examTable}
      />
    </div>
  )
}

export function StudentAnalytics() {
  const { user } = useAuth()
  const { getAttendanceForStudent, getExamResultsForStudent } = useSchool()
  const month = currentMonth()
  const attendance = getAttendanceForStudent(user.id, month)
  const examResults = getExamResultsForStudent(user.id)
  const examChart = getStudentExamChart(examResults)
  const latestExam = examResults[0]
  const subjectChart = getSubjectMarksChart(latestExam)

  const attValues = Object.values(attendance?.records || {})
  const attendanceSummary = [
    { label: 'Present', value: attValues.filter((v) => v === 'present').length, color: '#22c55e' },
    { label: 'Absent', value: attValues.filter((v) => v === 'absent').length, color: '#ef4444' },
    { label: 'Late', value: attValues.filter((v) => v === 'late').length, color: '#f59e0b' },
  ]

  return (
    <div className="analytics-grid">
      <ColumnChart title={`My Attendance — ${month}`} data={attendanceSummary} />
      <BarChart title="Exam Performance (%)" data={examChart} suffix="%" maxValue={100} />
      {subjectChart.length > 0 && (
        <BarChart
          title={`Subject Marks — ${latestExam.examName}`}
          data={subjectChart.map((s) => ({ label: s.label, value: s.value }))}
          maxValue={100}
        />
      )}
      <AnalyticsTable
        title="My Exam Results"
        columns={[
          { key: 'exam', label: 'Exam' },
          { key: 'term', label: 'Term' },
          { key: 'average', label: 'Average' },
          { key: 'date', label: 'Date' },
        ]}
        rows={examResults.map((exam) => {
          const total = exam.subjects.reduce((s, x) => s + x.marks, 0)
          const max = exam.subjects.reduce((s, x) => s + x.maxMarks, 0)
          return {
            id: exam.id,
            exam: exam.examName,
            term: exam.term,
            average: max ? `${Math.round((total / max) * 100)}%` : '—',
            date: exam.publishedAt,
          }
        })}
      />
    </div>
  )
}

export default function DashboardAnalytics() {
  const { user } = useAuth()
  if (user.role === ROLES.PRINCIPAL) return <PrincipalAnalytics />
  if (user.role === ROLES.TEACHER) return <TeacherAnalytics />
  if (user.role === ROLES.STUDENT) return <StudentAnalytics />
  return null
}
