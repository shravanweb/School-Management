import { SCHOOL_CLASSES, formatClassLabel } from '../data/seed'

export function getStudentsPerClass(students) {
  return SCHOOL_CLASSES.map((cls) => ({
    label: formatClassLabel(cls),
    value: students.filter((s) => s.class === cls).length,
  }))
}

export function getAttendanceOverview(attendance) {
  let present = 0
  let absent = 0
  let late = 0
  attendance.forEach((a) => {
    Object.values(a.records || {}).forEach((status) => {
      if (status === 'present') present += 1
      else if (status === 'absent') absent += 1
      else if (status === 'late') late += 1
    })
  })
  return [
    { label: 'Present', value: present, color: '#22c55e' },
    { label: 'Absent', value: absent, color: '#ef4444' },
    { label: 'Late', value: late, color: '#f59e0b' },
  ]
}

export function getLeaveOverview(leaves) {
  return [
    { label: 'Pending', value: leaves.filter((l) => l.status === 'pending').length, color: '#f59e0b' },
    { label: 'Approved', value: leaves.filter((l) => l.status === 'approved').length, color: '#22c55e' },
    { label: 'Rejected', value: leaves.filter((l) => l.status === 'rejected').length, color: '#ef4444' },
  ]
}

export function getExamResultsTable(examResults, students) {
  return examResults.map((exam) => {
    const student = students.find((s) => s.id === exam.studentId)
    const totalMarks = exam.subjects.reduce((sum, s) => sum + s.marks, 0)
    const maxMarks = exam.subjects.reduce((sum, s) => sum + s.maxMarks, 0)
    const avg = maxMarks ? Math.round((totalMarks / maxMarks) * 100) : 0
    return {
      id: exam.id,
      student: student?.name || '—',
      class: student ? formatClassLabel(student.class) : '—',
      exam: exam.examName,
      term: exam.term,
      average: `${avg}%`,
      subjects: exam.subjects.length,
      date: exam.publishedAt,
    }
  })
}

export function getStudentExamChart(examResults) {
  return examResults.map((exam) => {
    const totalMarks = exam.subjects.reduce((sum, s) => sum + s.marks, 0)
    const maxMarks = exam.subjects.reduce((sum, s) => sum + s.maxMarks, 0)
    return {
      label: exam.examName,
      value: maxMarks ? Math.round((totalMarks / maxMarks) * 100) : 0,
    }
  })
}

export function getSubjectMarksChart(exam) {
  if (!exam) return []
  return exam.subjects.map((s) => ({
    label: s.name,
    value: s.marks,
    max: s.maxMarks,
  }))
}

export function getTeacherStudentAttendance(attendance, students, month) {
  return students.map((student) => {
    const record = attendance.find(
      (a) => a.studentId === student.id && a.month === month
    )
    const summary = { present: 0, absent: 0, late: 0 }
    Object.values(record?.records || {}).forEach((status) => {
      if (summary[status] !== undefined) summary[status] += 1
    })
    const total = summary.present + summary.absent + summary.late
    const pct = total ? Math.round((summary.present / total) * 100) : 0
    return {
      label: student.name.split(' ')[0],
      value: pct,
      student: student.name,
    }
  })
}
